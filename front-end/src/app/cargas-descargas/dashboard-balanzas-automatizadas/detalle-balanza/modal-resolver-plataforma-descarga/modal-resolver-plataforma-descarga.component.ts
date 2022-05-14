import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../../core/components/modal/modal.component';
import { ResolverEventoPlataformaDescargaCommand } from '../../../../shared/data-models/commands/cargas-descargas/resolver-evento-plataforma-descarga-command';
import { ResolverPlataformaDescargaComponent } from '../../../../cargas-descargas/resolver-plataforma-descarga/resolver-plataforma-descarga.component';
import { ParametrosAccion } from '../../../../shared/data-models/parametros-accion';

@Component({
  selector: 'yrd-modal-resolver-plataforma-descarga',
  templateUrl: './modal-resolver-plataforma-descarga.component.html',
  styleUrls: ['./modal-resolver-plataforma-descarga.component.css']
})
export class ModalResolverPlataformaDescargaComponent implements OnInit {
  labelHeader = 'Resolver Plataforma de Descarga';
  command: ResolverEventoPlataformaDescargaCommand;
  @ViewChild('modalComponent') modal: ModalComponent;
  @ViewChild('resolverPlataformaDescarga') resolverPlataformaDescarga: ResolverPlataformaDescargaComponent;

  constructor() { }

  ngOnInit() {
  }

  onAprobarRechazar(aprobar: boolean) {
    this.resolverPlataformaDescarga.aprobarRechazar(aprobar);
  }

  onCerrarPopUp() {
    this.modal.close();
  }

  open(parametrosAccion: ParametrosAccion) {
    this.command = {
      idBitacora: parametrosAccion.idBitacora,
      pathArchestra: parametrosAccion.pathArchestra,
      idMovimiento: 0,
      aprobado: false,
      idDispositivo: parametrosAccion.idDispositivo
    };
    this.modal.open();
  }
}
