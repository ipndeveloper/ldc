import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ModalSeleccionarBalanzasComponent } from './modal-seleccionar-balanzas/modal-seleccionar-balanzas.component';
import { PopupService } from '../../core/services/popupService/popup.service';
import { AuthService } from '../../core/services/session/auth.service';
import { Resources } from '../../../locale/artifacts/resources';
import { Permission } from '../../shared/enums/enums';
import { DashboardService } from '../shared/services/dashboard.service';
import { BalanzaDashboard } from '../../shared/data-models/balanza-dashboard';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SignalrService } from '../shared/services/signalr/signalr.service';
import { environment } from '../../../../src/environments/environment';
import { BalanzaAutomatizadaLog } from '../../shared/data-models/balanza-automatizada-log';

@Component({
  selector: 'yrd-dashboard-balanzas-automatizadas',
  templateUrl: './dashboard-balanzas-automatizadas.component.html',
  styleUrls: ['./dashboard-balanzas-automatizadas.component.css']
})
export class DashboardBalanzasAutomatizadasComponent implements OnInit, OnDestroy {

  protected onDestroy: ReplaySubject<boolean> = new ReplaySubject(1);
  @ViewChild('modalSeleccionarBalanzas') ModalSeleccionarBalanzas: ModalSeleccionarBalanzasComponent;
  form: FormGroup;
  permisoSeleccionarBalanzas: Permission.DashboardBalanzasAutomatizadasSeleccionarBalanzas;
  logBalanzaAutomatizada: BalanzaAutomatizadaLog;

  constructor(
    private readonly dashboardService: DashboardService,
    private readonly fb: FormBuilder,
    private readonly popupService: PopupService,
    private readonly authService: AuthService,
    private signalrService: SignalrService) {
  }

  get idUsuario() {
    const userContext =  this.authService.getUserContext();
    if (userContext) {
      return userContext.idUsuario;
    }
    return 0;
  }

  get balanzas() {
    return this.form.get('balanzas') as FormArray;
  }

  private createForm() {
    this.form = this.fb.group({
      balanzas: this.fb.array([])
    });
  }

  ngOnInit() {
    this.initSignalR();
    this.createForm();
    this.dashboardService.obtenerBalanzasSeleccionadas(this.idUsuario)
    .pipe(takeUntil(this.onDestroy))
    .subscribe(data =>
      data.forEach(x => this.agregarBalanza(x)));
  }

  initSignalR() {
    const tokenYard = localStorage.getItem(environment.tokenKey) as string;
    this.signalrService.startConnection(tokenYard);

    // Nos suscribimos a los canales de sinalR
    this.signalrService.addBalanzaAutomatizadaMessageListener();

    // Nos suscribimos a los datos enviados
    this.signalrService.logBalanza.pipe(takeUntil(this.onDestroy)).subscribe((item: BalanzaAutomatizadaLog) => {
      this.logBalanzaAutomatizada = item;
    });
  }

  ngOnDestroy(): void {
    this.onDestroy.next(true);
    this.onDestroy.complete();
    this.signalrService.stopConnection();
  }

  crearBalanza(balanza: BalanzaDashboard): FormGroup {
    return this.fb.group({
      balanza: balanza
    });
  }

  agregarBalanza(balanza: BalanzaDashboard) {
    this.balanzas.push(this.crearBalanza(balanza));
  }

  openSeleccionarBalanzas() {
    this.dashboardService.obtenerBalanzasAutomatizadasDashboard(this.idUsuario)
      .pipe(takeUntil(this.onDestroy))
      .subscribe(datos => {
        if (!datos) {
          this.popupService.error(Resources.Messages.NoSeEncontraronBalanzasAutomatizadas);
        } else {
          this.ModalSeleccionarBalanzas.open(Array.from(datos));
        }
      });
  }

  seleccionarBalanzas() {
    const balanzasSeleccionadas = this.ModalSeleccionarBalanzas.checklistForm.value.filter(x => x.seleccionada);
    if (balanzasSeleccionadas.length > 4) {
      this.popupService.error(Resources.Messages.NoPuedeSeleccionarMasDe4Balanzas);
    } else {
      while (this.balanzas.length !== 0) {
        this.balanzas.removeAt(0);
      }
      balanzasSeleccionadas.forEach(e => {
          this.dashboardService.obtenerBalanzaDashboard(e.id)
          .pipe(takeUntil(this.onDestroy))
          .subscribe(
            data => this.agregarBalanza(data)
          );
      });
      this.dashboardService.guardarBalanzasSeleccionadas(
        this.idUsuario,
        balanzasSeleccionadas.map(function(a) { return a.id; }))
        .pipe(takeUntil(this.onDestroy))
        .subscribe();
      this.ModalSeleccionarBalanzas.close();
    }
  }
}
