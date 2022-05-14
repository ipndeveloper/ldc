import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../../core/components/modal/modal.component';
import { BASeleccionarBalanzaSalidaCommand } from '../../../../shared/data-models/commands/cargas-descargas/seleccionar-balanza-salida-command';
import { SeleccionarBalanzaSalidaComponent } from '../../../../cargas-descargas/seleccionar-balanza-salida/seleccionar-balanza-salida.component';
import { ParametrosAccion } from '../../../../shared/data-models/parametros-accion';

@Component({
  selector: 'yrd-modal-seleccionar-balanza-salida',
  templateUrl: './modal-seleccionar-balanza-salida.component.html',
  styleUrls: ['./modal-seleccionar-balanza-salida.component.css']
})
export class ModalSeleccionarBalanzaSalidaComponent implements OnInit {
  labelHeader = 'Seleccionar Balanza de Salida';
  command: BASeleccionarBalanzaSalidaCommand;
  @ViewChild('modalComponent') modal: ModalComponent;
  @ViewChild('seleccionarBalanzaSalida') seleccionarBalanzaSalida: SeleccionarBalanzaSalidaComponent;

  constructor() { }

  ngOnInit() {
  }

  onAceptar() {
    this.seleccionarBalanzaSalida.onClickAceptar();
  }

  onCancelar() {
    this.modal.close();
  }

  open(parametrosAccion: ParametrosAccion) {
    this.command = {
      idBitacora: parametrosAccion.idBitacora,
      pathArchestra: parametrosAccion.pathArchestra,
      tarjeta: '',
      patente: '',
      idBalanzaSalida: 0,
      idDispositivo: parametrosAccion.idDispositivo
    };
    this.modal.open();
  }

}
