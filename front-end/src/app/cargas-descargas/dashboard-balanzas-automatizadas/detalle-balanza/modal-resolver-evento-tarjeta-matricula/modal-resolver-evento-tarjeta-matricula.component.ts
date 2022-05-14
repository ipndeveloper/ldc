import { Component, OnInit, ViewChild } from '@angular/core';
import { ResolverEventoCommand, ResolverEventoParametro } from '../../../../shared/data-models/commands/cargas-descargas/resolver-evento-command';
import { ModalComponent } from '../../../../core/components/modal/modal.component';
import { ResolverEventoComponent } from '../../../resolver-evento/resolver-evento.component';
import { ParametrosAccion } from '../../../../shared/data-models/parametros-accion';

@Component({
  selector: 'yrd-modal-resolver-evento-tarjeta-matricula',
  templateUrl: './modal-resolver-evento-tarjeta-matricula.component.html',
  styleUrls: ['./modal-resolver-evento-tarjeta-matricula.component.css']
})
export class ModalResolverEventoTarjetaMatriculaComponent implements OnInit {
  command: ResolverEventoCommand;
  labelHeader = 'Modificar Matrícula';
  @ViewChild('modalComponent') modal: ModalComponent;
  @ViewChild('resolverEventoTarjetaMatricula') resolverEventoTarjetaMatricula: ResolverEventoComponent;

  constructor() { }

  ngOnInit() {
  }

  onAceptar() {
    this.resolverEventoTarjetaMatricula.aceptarClick();
  }

  onNoDescargar() {
    this.resolverEventoTarjetaMatricula.noDescargarClick();
  }

  onCerrarPopUp() {
    this.modal.close();
  }

  open(parametrosAccion: ParametrosAccion) {
    this.command = {
      idBitacora: parametrosAccion.idBitacora,
      pathArchestra: parametrosAccion.pathArchestra,
      idEvento: 0,
      decision: 0,
      parametros: ResolverEventoParametro[''],
      idDispositivo: parametrosAccion.idDispositivo
    };
    this.modal.open();
  }

}
