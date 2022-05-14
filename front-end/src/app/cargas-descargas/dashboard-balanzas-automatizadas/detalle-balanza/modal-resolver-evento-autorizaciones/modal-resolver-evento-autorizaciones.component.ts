import { Component, OnInit, ViewChild } from '@angular/core';
import { ResolverEventoAutorizacionesCommand } from '../../../../shared/data-models/commands/cargas-descargas/resolver-evento-autorizaciones-command';

import { ModalComponent } from '../../../../core/components/modal/modal.component';
import { ResolverEventoAutorizacionesComponent } from '../../../resolver-evento-autorizaciones/resolver-evento-autorizaciones.component';
import { ParametrosAccion } from '../../../../shared/data-models/parametros-accion';

@Component({
  selector: 'yrd-modal-resolver-evento-autorizaciones',
  templateUrl: './modal-resolver-evento-autorizaciones.component.html',
  styleUrls: ['./modal-resolver-evento-autorizaciones.component.css']
})
export class ModalResolverEventoAutorizacionesComponent implements OnInit {
  labelHeader = 'Autorizaciones';
  command: ResolverEventoAutorizacionesCommand;
  @ViewChild('modalComponent') modal: ModalComponent;
  @ViewChild('resolverEventoAutorizaciones') resolverEventoAutorizaciones: ResolverEventoAutorizacionesComponent;

  constructor() { }

  ngOnInit() {
  }

  onAprobar() {
    this.resolverEventoAutorizaciones.autorizarClick();
  }

  onRechazar() {
    this.resolverEventoAutorizaciones.rechazarClick();
  }

  onCerrarPopUp() {
    this.modal.close();
  }
  open(parametrosAccion: ParametrosAccion) {
    this.command = {
      idBitacora: parametrosAccion.idBitacora,
      pathArchestra: parametrosAccion.pathArchestra,
      idDispositivo: parametrosAccion.idDispositivo,
      decision: false,
      motivoNoDescargaId: 0
    };
    this.modal.open();
  }
}
