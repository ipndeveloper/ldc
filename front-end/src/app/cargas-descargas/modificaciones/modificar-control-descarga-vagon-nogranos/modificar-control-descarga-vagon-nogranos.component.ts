import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { DatosDocumentoControlarDescargaSubproductosComponent } from '../../controlar-descarga-camion-subproductos/datos-documento-controlar-descarga-subproductos/datos-documento-controlar-descarga-subproductos.component';
import { CircuitoService } from '../../shared/services/circuito.service';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { NavigationService } from '../../../core/services/navigationService/navigation.service';
import { MovimientoService } from '../../shared/services/movimiento.service';
import { MovimientoCerealSubproducto } from '../../../shared/data-models/movimiento-cereal-subproducto';
import { AuthService } from '../../../core/services/session/auth.service';
import { DescargaEventsNotifierService } from '../../shared/services/descarga-events-notifier.service';
import { EntitiesTiposProducto } from '../../../shared/data-models/tipo-producto';
import { ModificarDescargaCamionSubproductosFueraCircuitoCommand } from '../modificar-control-descarga-camion-subproductos-nogranos/modificar-descarga-camion-subproductos-fuera-circuito-command';
import { PopupService } from '../../../core/services/popupService/popup.service';
import { ControlarDescargaVagonNoGranosService } from '../../controlar-descarga-vagon-no-granos/controlar-descarga-vagon-no-granos.service';
import { ModificarDescargasVagonBaseComponent } from '../../shared/modificar-descargas-base/modificar-descargas-vagon-base.component';
import { CommandService } from '../../../shared/command-service/command.service';

@Component({
  selector: 'yrd-modificar-control-descarga-vagon-nogranos',
  templateUrl: './modificar-control-descarga-vagon-nogranos.component.html',
  styleUrls: ['./modificar-control-descarga-vagon-nogranos.component.css']
})
export class ModificarControlDescargaVagonNogranosComponent
    extends ModificarDescargasVagonBaseComponent<MovimientoCerealSubproducto,
                                                 ControlarDescargaVagonNoGranosService,
                                                 DatosDocumentoControlarDescargaSubproductosComponent,
                                                 ModificarDescargaCamionSubproductosFueraCircuitoCommand> {

  constructor(popupService: PopupService,
              fb: FormBuilder,
              circuitoService: CircuitoService,
              fcService: FormComponentService,
              service: ControlarDescargaVagonNoGranosService,
              navigationService: NavigationService,
              movimientoService: MovimientoService<MovimientoCerealSubproducto>,
              authService: AuthService,
              eventsNotifierService: DescargaEventsNotifierService,
              protected readonly commandService: CommandService) {
    super(ModificarDescargaCamionSubproductosFueraCircuitoCommand,
          popupService,
          circuitoService,
          fcService,
          service,
          navigationService,
          movimientoService,
          authService,
          eventsNotifierService,
          fb,
          commandService);
    this.tipoProductoSeleccionada = EntitiesTiposProducto.NoGranos;
    this.ControlPath = 'ModificarControlDescargaVagonNoGranos';
  }

  protected mapControlDatosDocumentoToCommand(command: ModificarDescargaCamionSubproductosFueraCircuitoCommand): void {
    command.version = this.datosDocumento.movimiento.version;

    super.mapControlDatosDocumentoToCommand(command);
  }
}
