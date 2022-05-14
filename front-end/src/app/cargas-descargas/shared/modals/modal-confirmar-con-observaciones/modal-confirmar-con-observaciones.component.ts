import { Component, OnInit, ViewChild, Output, Input, EventEmitter } from '@angular/core';
import { ModalComponent } from '../../../../core/components/modal/modal.component';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Resources } from '../../../../../locale/artifacts/resources';

@Component({
  selector: 'yrd-modal-confirmar-con-observaciones',
  templateUrl: './modal-confirmar-con-observaciones.component.html',
  styleUrls: ['./modal-confirmar-con-observaciones.component.css']
})
export class ModalConfirmarConObservacionesComponent implements OnInit {

  @ViewChild('modalComponent') modal: ModalComponent;
  @Output() accepted = new EventEmitter();
  @Input() labelHeader = 'Observaciones';
  @Input() observacionesRequerido = true;
  @Input() muestraObservaciones = true;
  confirmarConObservacionesForm: FormGroup;

  validationMessagesObservaciones = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Observaciones),
    maxlength: Resources.Messages.DebeIngresarHasta250Caracteres
  };

  constructor(private readonly fb: FormBuilder) { }

  ngOnInit() {
    this.confirmarConObservacionesForm = this.fb.group({
      observaciones: [{ value: '', disabled: false }, [Validators.maxLength(250)]]
    });
    if (this.observacionesRequerido) {
      const observaciones = this.confirmarConObservacionesForm.get('observaciones');
      if (observaciones) {
        observaciones.setValidators(Validators.compose([Validators.maxLength(250), Validators.required]));
      }
    }
  }

  onAccept() {
    if (this.confirmarConObservacionesForm.valid) {
      this.accepted.emit(this.confirmarConObservacionesForm.controls.observaciones.value);
      this.modal.close();
    }
  }

  open() {
    this.modal.open();
  }

  onClosing() {
    this.confirmarConObservacionesForm.reset();
  }
}
