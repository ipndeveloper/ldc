import { Component, OnInit, ViewChild, Output, Input, EventEmitter } from '@angular/core';
import { Resources } from '../../../../../locale/artifacts/resources';
import { ModalComponent } from '../../../../core/components/modal/modal.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'yrd-modal-cambiar-codigo-barras',
  templateUrl: './modal-cambiar-codigo-barras.component.html',
  styleUrls: ['./modal-cambiar-codigo-barras.component.css']
})
export class ModalCambiarCodigoBarrasComponent implements OnInit {

  @ViewChild('modalComponent') modal: ModalComponent;
  @Output() accepted: EventEmitter<string> = new EventEmitter();
  @Input() labelHeader = 'Cambiar Código de Barra';
  cambiarCodigoBarrasForm: FormGroup;

  validationMessagesCodigoBarras = {
    required: Resources.Messages.CampoCodigoBarraCamaraRequerido,
    pattern: Resources.Messages.CampoAdmiteSoloNumeros
  };

  constructor(private readonly fb: FormBuilder) { }

  ngOnInit() {
    this.cambiarCodigoBarrasForm = this.fb.group({
      codigoBarras: [{ value: '', disabled: false }, [Validators.required]]
    });
  }

  onAccept() {
    if (this.cambiarCodigoBarrasForm.valid) {
      this.accepted.emit(this.cambiarCodigoBarrasForm.controls.codigoBarras.value);
    }
  }

  open() {
    this.modal.open();
  }

  close() {
    this.modal.close();
  }

  onClosing() {
    this.cambiarCodigoBarrasForm.reset();
  }
}
