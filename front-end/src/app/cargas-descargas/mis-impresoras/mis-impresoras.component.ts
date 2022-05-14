import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { requiredIf } from '../shared/validators/requiredIf.validator';
import { MisImpresorasService } from './mis-impresoras.service';
import { takeUntil } from 'rxjs/operators';
import { DetalleMisImpresorasComponent } from './detalle-mis-impresoras/detalle-mis-impresoras.component';
import { MisImpresorasDataView } from '../../shared/data-models/mis-impresoras-data-view';
import { PopupService } from '../../core/services/popupService/popup.service';
import { Resources } from '../../../locale/artifacts/resources';

@Component({
  selector: 'yrd-mis-impresoras',
  templateUrl: './mis-impresoras.component.html',
  styleUrls: ['./mis-impresoras.component.css']
})
export class MisImpresorasComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('detalle') detalle: DetalleMisImpresorasComponent;

  form: FormGroup;
  esAdmin = false;

  private readonly onDestroy = new Subject();

  constructor(private readonly fb: FormBuilder,
              private readonly fcService: FormComponentService,
              private readonly activatedRoute: ActivatedRoute,
              private readonly service: MisImpresorasService,
              private readonly popupService: PopupService) { }

  ngOnInit() {
    this.determinarModoAccion();
    this.createForm();
  }

  ngAfterViewInit() {
    if (!this.esAdmin) {
      this.onBuscar();
    }
  }

  private determinarModoAccion() {
    this.esAdmin = this.activatedRoute.snapshot.url.toString().endsWith('admin');
  }

  private createForm() {
    this.form = this.fb.group({
      filtro: this.fb.group({
        usuario: [{ value: '', disabled: false}, requiredIf(this.esAdmin)]
      }),
      detalle: this.fb.group({
        impresoras: this.fb.array([])
      })
    });
    this.fcService.initialize(this.form);
  }

  onBuscar() {
    this.service.buscar(this.fcService.getValue('filtro.usuario'))
      .pipe(takeUntil(this.onDestroy))
      .subscribe((impresoras: MisImpresorasDataView[]) => {
        if (impresoras.length === 0) {
          this.popupService.error(Resources.Messages.NoSeEncontraronResultados);
        }
        this.detalle.setImpresoras(impresoras);
      });
  }

  onMarcarPorDefecto(impresora: MisImpresorasDataView) {
    this.service.marcarPorDefecto(impresora.id)
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.popupService.success(Resources.Messages.LaImpresoraHaSidoMarcadaPorDefectoConExito);
        this.onBuscar();
      });
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }

}
