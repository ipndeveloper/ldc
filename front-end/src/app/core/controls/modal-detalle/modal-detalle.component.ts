import { Component, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'yrd-modal-detalle',
  templateUrl: './modal-detalle.component.html',
  styleUrls: ['./modal-detalle.component.css']
})
export class ModalDetalleComponent {

  @ViewChild('modalComponent') modal: ModalComponent;
  @Output() accepted: EventEmitter<string> = new EventEmitter();
  @Input() labelHeader = 'Detalle';
  detalle: string;

  constructor() { }

  accept() {
      this.close();
  }

  open(detalle: string) {
    this.detalle = detalle;
    this.modal.open();
  }

  close() {
    this.modal.close();
  }
}
