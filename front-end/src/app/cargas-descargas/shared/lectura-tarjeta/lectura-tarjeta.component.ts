import { Component, Input, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Observable, timer, Subscription } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { ModalLecturaTarjetaComponent } from './modal-lectura-tarjeta/modal-lectura-tarjeta.component';
import { NumeroConEtiquetaComponent } from '../../../core/controls/numero-con-etiqueta/numero-con-etiqueta.component';
import { Resources } from '../../../../locale/artifacts/resources';
import { PopupService } from '../../../core/services/popupService/popup.service';
import { LecturaTarjetaService } from '../services/lectura-tarjeta.service';
import { LecturaTarjetaEnAutomaticoDataView } from '../../../shared/data-models/lectura-tarjeta-en-automatico-data-view';
import { AuthService } from '../../../core/services/session/auth.service';

@Component({
  selector: 'yrd-lectura-tarjeta',
  templateUrl: './lectura-tarjeta.component.html',
  styleUrls: ['./lectura-tarjeta.component.css']
})
export class LecturaTarjetaComponent {

  @ViewChild('modalComponent') modalComponent: ModalLecturaTarjetaComponent;
  @ViewChild('numeroTarjeta') numeroTarjeta: NumeroConEtiquetaComponent;
  @ViewChild('botonLeerTarjeta') botonLeerTarjeta: ElementRef;
  @Input() form: FormGroup;
  @Input() cssClassBoton = 'col-sm-4';
  @Input() cssClassBotonInner = 'btn btn-default';
  @Input() cssClassRow = '';
  @Input() textoBoton = 'Leer Tarjeta';
  @Input() mostrarTarjeta = true;
  @Input() previousValidation: Observable<boolean>;
  @Output() tarjetaLeida = new EventEmitter<string>();
  @Input() cssClassEtiquetaManual = 'col-sm-3';
  @Input() cssClassControlManual = 'col-sm-9';

  get control(): AbstractControl {
    return this.form.controls.tarjeta;
  }

  get deshabilitarLecturaTarjeta(): boolean {
    return this.control ? this.control.status === 'DISABLED' || !this.terminalUtilizaTarjeta : false;
  }

  get mensajeTarjetaLeida(): string {
    return this.control && this.control.value ? this.control.value : 'Sin tarjeta';
  }

  timer$: Observable<number>;
  timerSuscription$: Subscription;
  contador: number;
  readonly terminalUtilizaTarjeta: boolean;

  lecturaEnModoAutomatico: boolean;
  segundos: number;
  sufijo: number;
  prefijoPrimerKeycode: number;
  prefijoSegundoKeycode: number;

  validationMessagesTarjeta = {
    required: Resources.Messages.ElCampoXEsRequeridoParaBuscar.format(Resources.Labels.Tarjeta)
  };

  constructor(private readonly lecturaTarjetaService: LecturaTarjetaService,
              private readonly popupService: PopupService,
              private readonly authService: AuthService) {
    const userContext = this.authService.getUserContext();
    if (userContext) {
      this.terminalUtilizaTarjeta = userContext.terminal.utilizaTarjeta;
    }
    this.lecturaTarjetaService.consultarModoLecturaTarjeta()
      .subscribe((lecturaTarjetaEnAutomatico: LecturaTarjetaEnAutomaticoDataView) => {
        this.lecturaEnModoAutomatico = lecturaTarjetaEnAutomatico.esAutomatico;
        this.segundos = lecturaTarjetaEnAutomatico.segundosAEsperar;
        this.sufijo = lecturaTarjetaEnAutomatico.sufijoKeycode;
        this.prefijoPrimerKeycode = lecturaTarjetaEnAutomatico.prefijoPrimerKeycode;
        this.prefijoSegundoKeycode = lecturaTarjetaEnAutomatico.prefijoSegundoKeycode;
      });
  }

  onLeerTarjeta() {
    if (this.previousValidation) {
      this.previousValidation.subscribe((leerTarjeta: boolean) => {
        if (leerTarjeta) {
          this.leerTarjeta();
        }
      });
    } else {
      this.leerTarjeta();
    }
  }

  private leerTarjeta() {
    this.contador = this.segundos;
    this.modalComponent.open();
    this.timer$ = timer(0, 1000).pipe(take(this.contador), map(() => --this.contador));
    this.timerSuscription$ = this.timer$.subscribe((val: number) => {
      if (val === 0) {
        this.modalComponent.close();
      }
    });
  }

  onTarjetaLeida(tarjeta: string) {
    this.timerSuscription$.unsubscribe();
    this.control.setValue(tarjeta);
    this.tarjetaLeida.emit();
    if (!tarjeta) {
      this.popupService.error(Resources.Messages.TarjetaInvalidaIntenteNuevamente);
    }
  }

  onBlurTarjeta() {
    if (this.control && this.control.value) {
      this.tarjetaLeida.emit();
    }
  }

  setFocus() {
    if (this.lecturaEnModoAutomatico && this.botonLeerTarjeta) {
      this.botonLeerTarjeta.nativeElement.focus();
    } else if (this.numeroTarjeta) {
      this.numeroTarjeta.setFocus();
    }
  }

}
