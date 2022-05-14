import { Component, OnInit, ViewChild, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { ModalComponent } from '../../../../core/components/modal/modal.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MotivoEstadoMovimiento } from '../../../../shared/data-models/motivo-estado-movimiento';
import { Resources } from '../../../../../locale/artifacts/resources';
import { TextAreaConEtiquetaComponent } from '../../../../core/controls/text-area-con-etiqueta/text-area-con-etiqueta.component';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'yrd-modal-motivo',
  templateUrl: './modal-motivo.component.html',
  styleUrls: ['./modal-motivo.component.css']
})
export class ModalMotivoComponent implements OnInit, OnDestroy  {

  @ViewChild('modalComponent') modal: ModalComponent;
  @Output() accepted: EventEmitter<any> = new EventEmitter();
  @Input() labelHeader = 'Observaciones';
  @ViewChild('textoObservaciones') textoObservaciones: TextAreaConEtiquetaComponent;
  private readonly onDestroy = new Subject();

  modalMotivoForm: FormGroup;
  private motivoEstadoMovimientoSeleccionado: MotivoEstadoMovimiento;

  validationMessagesObservacion = {
    maxlength: Resources.Messages.DebeIngresarHasta250Caracteres
  };

  constructor(private readonly fb: FormBuilder) {
  }

  ngOnInit() {
    this.createForm();
    this.subscribeCambioMotivo();

  }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }

  private subscribeCambioMotivo(): void {
    const motivoCtrl = this.modalMotivoForm.get('motivoEstadoMovimiento');
    if (motivoCtrl) {
      motivoCtrl.valueChanges.pipe(distinctUntilChanged(), takeUntil(this.onDestroy))
        .subscribe((motivo: MotivoEstadoMovimiento) => {
          if (motivo) {
            this.motivoEstadoMovimientoSeleccionado = motivo;
          }
        });
    }
  }

  private createForm(): void {
    this.modalMotivoForm = this.fb.group({
      motivoEstadoMovimiento: { value: this.motivoEstadoMovimientoSeleccionado, disabled: false },
      observacion: [{ value: '', disabled: false }, Validators.maxLength(250)]
    });
  }

  accept() {
    if (this.modalMotivoForm.valid) {
      this.accepted.next();
      this.modal.close();
    }
  }

  open(motivoEstadoMovimientoSeleccionado: MotivoEstadoMovimiento, disableMotivoEstadoMovimiento: boolean) {
    disableMotivoEstadoMovimiento ? this.modalMotivoForm.controls.motivoEstadoMovimiento.disable() :
                                       this.modalMotivoForm.controls.motivoEstadoMovimiento.enable();
    this.modalMotivoForm.controls.observacion.setValue('');
    this.motivoEstadoMovimientoSeleccionado = motivoEstadoMovimientoSeleccionado;
    this.modalMotivoForm.controls.motivoEstadoMovimiento.setValue(this.motivoEstadoMovimientoSeleccionado);
    this.modal.open();
  }

  getMotivoEstadoMovimientoSeleccionado(): MotivoEstadoMovimiento {
    return this.motivoEstadoMovimientoSeleccionado;
  }

  getObservacion(): string {
    const observacion = this.modalMotivoForm.get('observacion');
    if (observacion) {
      return observacion.value;
    }
    return '';
  }

  cancelTabPressed(e: KeyboardEvent): void {
    this.modal.cancelTabPressed(e);
  }
 }
