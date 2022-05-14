import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ResolverEventoPlataformaRequeridaCommand } from '../../../../shared/data-models/commands/cargas-descargas/resolver-evento-plataforma-requerida-command';
// import { ModalComponent } from '../../../../core/components/modal/modal.component';
import { ResolverEventoPlataformaRequeridaComponent } from '../../../../cargas-descargas/resolver-evento-plataforma-requerida/resolver-evento-plataforma-requerida.component';
import { ModalActionComponent } from '../../../../core/components/modal-action/modal-action.component';
import { ParametrosAccion } from '../../../../shared/data-models/parametros-accion';


@Component({
  selector: 'yrd-modal-resolver-evento-plataforma-requerida',
  templateUrl: './modal-resolver-evento-plataforma-requerida.component.html',
  styleUrls: ['./modal-resolver-evento-plataforma-requerida.component.css']
})
export class ModalResolverEventoplataformaRequeridaComponent implements OnInit {
  labelHeader = 'Seleccionar Plataforma';
  command: ResolverEventoPlataformaRequeridaCommand;

  @ViewChild('modalComponent') modal: ModalActionComponent;
  @ViewChild('content') content: ElementRef;
  @ViewChild('resolverEventoPlataformaRequerida') resolverEventoPlataformaRequerida: ResolverEventoPlataformaRequeridaComponent;

  constructor() { }

  ngOnInit() {
  }

  onAprobarRechazar(aprobar: boolean) {
    this.resolverEventoPlataformaRequerida.aprobarRechazar(aprobar);
  }

  open(parametrosAccion: ParametrosAccion) {
    this.command = {
      idBitacora: parametrosAccion.idBitacora,
      pathArchestra: parametrosAccion.pathArchestra,
      aprobar: false,
      idPlataforma: 0,
      idDispositivo: parametrosAccion.idDispositivo
    };
    this.modal.open();
  }

  onCerrarPopUp() {
    this.modal.close();
  }
}
