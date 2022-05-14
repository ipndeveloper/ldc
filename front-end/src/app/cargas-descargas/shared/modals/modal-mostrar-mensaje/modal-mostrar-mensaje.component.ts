import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TextAreaConEtiquetaComponent } from '../../../../core/controls/text-area-con-etiqueta/text-area-con-etiqueta.component';
import { ModalComponent } from '../../../../core/components/modal/modal.component';

@Component({
  selector: 'yrd-modal-mostrar-mensaje',
  templateUrl: './modal-mostrar-mensaje.component.html',
  styleUrls: ['./modal-mostrar-mensaje.component.css']
})

export class ModalMostrarMensajeComponent implements OnInit  {

  @ViewChild('modalComponent') modal: ModalComponent;
  @Input() labelHeader = 'Detalle del Error';
  @ViewChild('textoMensaje') textoMensaje: TextAreaConEtiquetaComponent;

  modalMostrarMensajeForm: FormGroup;

  constructor(private readonly fb: FormBuilder) {
  }

  ngOnInit() {
    this.modalMostrarMensajeForm = this.fb.group({
      mensaje: { value: this.textoMensaje, disabled: true }
    });
  }

  open(mensaje: string) {
    this.modalMostrarMensajeForm.controls.mensaje.setValue(mensaje);
    this.modal.open();
  }

  cancelTabPressed(e: KeyboardEvent): void {
    this.modal.cancelTabPressed(e);
  }
 }
