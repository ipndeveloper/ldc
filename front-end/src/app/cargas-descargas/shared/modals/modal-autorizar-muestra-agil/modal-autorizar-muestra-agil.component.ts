import { Component, OnInit, ViewChild, Output, Input, EventEmitter } from '@angular/core';
import { ModalComponent } from '../../../../core/components/modal/modal.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Resources } from '../../../../../locale/artifacts/resources';
import { NumeroConEtiquetaComponent } from '../../../../core/controls/numero-con-etiqueta/numero-con-etiqueta.component';

@Component({
  selector: 'yrd-modal-autorizar-muestra-agil',
  templateUrl: './modal-autorizar-muestra-agil.component.html',
  styleUrls: ['./modal-autorizar-muestra-agil.component.css']
})
export class ModalAutorizarMuestraAgilComponent implements OnInit {

  @ViewChild('modalComponent') modal: ModalComponent;
  @ViewChild('codigoBarrasControl') codigoBarrasControl: NumeroConEtiquetaComponent;
  @Output() accepted: EventEmitter<string> = new EventEmitter();
  @Input() labelHeader = 'Autorizar muestra a Cámara';
  autorizarMuestraAgilForm: FormGroup;

  validationMessagesCodigoBarras = {
    required: Resources.Messages.CampoCodigoBarraCamaraRequerido,
    pattern: Resources.Messages.CampoAdmiteSoloNumeros
  };

  constructor(private readonly fb: FormBuilder) { }

  ngOnInit() {
    this.autorizarMuestraAgilForm = this.fb.group({
      codigoBarras: [{ value: '', disabled: false }, [Validators.required, Validators.pattern('^[0-9]*$')]]
    });
  }

  onAccept() {
    if (this.autorizarMuestraAgilForm.valid) {
      this.accepted.emit(this.autorizarMuestraAgilForm.controls.codigoBarras.value);
    }
  }

  open() {
    this.modal.open();
  }

  onClosing() {
    this.autorizarMuestraAgilForm.reset();
  }

  clear() {
    this.autorizarMuestraAgilForm.reset();
    this.codigoBarrasControl.setFocus();
  }

  onBlur() {
    this.onAccept();
  }
}
