import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../core/components/modal/modal.component';

@Component({
  selector: 'yrd-modal-historial-sobre-transporte',
  templateUrl: './modal-historial-sobre-transporte.component.html',
  styleUrls: ['./modal-historial-sobre-transporte.component.css']
})
export class ModalHistorialSobreTransporteComponent implements OnInit {

  historial: any;
  @ViewChild('modalComponent') modalComponent: ModalComponent;

  columns: any;

  constructor() { }

  ngOnInit() {
    this.columns = [
      {
        name: 'Fecha',
        prop: 'fecha'
      },
      {
        name: 'Estado',
        prop: 'estado',
      },
      {
        name: 'Nombre Usuario',
        prop: 'nombreUsuario',
      },
    ];
  }

  open(historial: any[]) {
    if (this.modalComponent && historial) {
      this.historial = historial;
      this.modalComponent.open();
    }
  }
}
