import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { CircuitoService } from '../../shared/services/circuito.service';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { NavigationService } from '../../../core/services/navigationService/navigation.service';
import { MovimientoService } from '../../shared/services/movimiento.service';
import { AuthService } from '../../../core/services/session/auth.service';
import { DescargaEventsNotifierService } from '../../shared/services/descarga-events-notifier.service';
import { EntitiesTiposProducto } from '../../../shared/data-models/tipo-producto';
import { PopupService } from '../../../core/services/popupService/popup.service';
import { ModificarDescargaCamionCerealesFueraCircuitoCommand } from '../modificar-control-descarga-camion-cereales/modificar-descarga-camion-cereales-fuera-circuito-command';
import { MovimientoCerealGrano } from '../../../shared/data-models/movimiento-cereal-grano';
import { ControlarDescargaVagonCerealesService } from '../../controlar-descarga-vagon-cereales/controlar-descarga-vagon-cereales.service';
import { DatosDocumentoControlarDescargaVagonCerealesComponent } from '../../controlar-descarga-vagon-cereales/datos-documento-controlar-descarga-vagon-cereales/datos-documento-controlar-descarga-vagon-cereales.component';
import { ModificarDescargasVagonBaseComponent } from '../../shared/modificar-descargas-base/modificar-descargas-vagon-base.component';
import { CommandService } from '../../../shared/command-service/command.service';
import { TipoDocumentoPorteService } from '../../shared/desplegable-tipo-documento-porte/tipo-documento-porte.service';
import { ComportamientoAfip } from '../../../../app/shared/enums/enums';

@Component({
  selector: 'yrd-modificar-control-descarga-vagon-cereales',
  templateUrl: './modificar-control-descarga-vagon-cereales.component.html',
  styleUrls: ['./modificar-control-descarga-vagon-cereales.component.css']
})
export class ModificarControlDescargaVagonCerealesComponent
    extends ModificarDescargasVagonBaseComponent<MovimientoCerealGrano,
                                                 ControlarDescargaVagonCerealesService,
                                                 DatosDocumentoControlarDescargaVagonCerealesComponent,
                                                 ModificarDescargaCamionCerealesFueraCircuitoCommand> {
  esCartaPorteElectronica = false;
  confirmoCtg = false;
  confirmadoManualmente = false;
  constructor(popupService: PopupService,
              fb: FormBuilder,
              circuitoService: CircuitoService,
              fcService: FormComponentService,
              service: ControlarDescargaVagonCerealesService,
              navigationService: NavigationService,
              movimientoService: MovimientoService<MovimientoCerealGrano>,
              authService: AuthService,
              eventsNotifierService: DescargaEventsNotifierService,
              protected readonly tipoDocumentoPorteService: TipoDocumentoPorteService,
              protected readonly commandService: CommandService) {
    super(ModificarDescargaCamionCerealesFueraCircuitoCommand,
          popupService,
          circuitoService,
          fcService,
          service,
          navigationService,
          movimientoService,
          authService,
          eventsNotifierService,
          fb, commandService);
    this.tipoProductoSeleccionada = EntitiesTiposProducto.Cereal;
    this.ControlPath = 'ModificarControlDescargaVagonCereal';
  }

  protected mapControlDatosDocumentoToCommand(command: ModificarDescargaCamionCerealesFueraCircuitoCommand): void {
    command.version = this.datosDocumento.movimiento.version;

    super.mapControlDatosDocumentoToCommand(command);
  }

  protected loadMovimiento(movimiento: MovimientoCerealGrano) {
  super.loadMovimiento(movimiento);
  this.fcService.setValue('datosDocumento.confirmacionArriboCtg.confirmadoManualmente', movimiento.confirmadoManualmente);
  this.fcService.setValue('datosDocumento.confirmacionArriboCtg.aceptarSinConfirmarCtg', movimiento.sinConfirmarCtg);
  this.fcService.setValue('documentoPorte.ctg', movimiento.codigoTrazabilidadGrano);

  this.confirmoCtg = movimiento.confirmoCtg;
  this.confirmadoManualmente = movimiento.confirmadoManualmente;
  this.comportamientoAfip();
  }
  protected comportamientoAfip() {
    this.tipoDocumentoPorteService.consultarComportamientoAfip(this.tipoDocumentoSeleccionado.id).subscribe(IdComportamientoAfip => {
      this.esCartaPorteElectronica = IdComportamientoAfip === ComportamientoAfip.RegimenElectronico;
      this.comportamientoFueraDeCircuito();
    });
  }
  comportamientoFueraDeCircuito() {
    if (this.esFueraCircuito && this.esCartaPorteElectronica) {
      this.fcService.enableControl(`documentoPorte.ctg`);
      this.fcService.disableControl(`documentoPorte.tipoDocumentoPorte`);
      this.fcService.disableControl('datosDocumento.confirmacionArriboCtg.confirmadoManualmente');
      this.fcService.disableControl('datosDocumento.confirmacionArriboCtg.aceptarSinConfirmarCtg');
      this.fcService.disableControl('datosDocumento.numeroCEE');

    }

  }
}
