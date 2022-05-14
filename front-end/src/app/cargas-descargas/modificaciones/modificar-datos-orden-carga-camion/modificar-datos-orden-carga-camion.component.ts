import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { DetalleModificarDatosOrdenCargaCamionComponent } from './detalle-modificar-datos-orden-carga-camion/detalle-modificar-datos-orden-carga-camion.component';
import { MovimientoCargaCamionService } from '../../controlar-carga-camion/movimiento-carga-camion.service';
import { CircuitoService } from '../../shared/services/circuito.service';
import { PopupService } from '../../../core/services/popupService/popup.service';
import { NavigationService } from '../../../core/services/navigationService/navigation.service';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { AuthService } from '../../../core/services/session/auth.service';
import { ModificarDatosOrdenCargaCamionService } from './modificar-datos-orden-carga-camion.service';
import { Collection } from '../../../core/models/collection';
import { ModificarDatosOrdenCargaCamionCommand } from '../../../shared/data-models/commands/cargas-descargas/modificar-datos-orden-carga-camion-command';
import { ControlarCargaCamionComponent } from '../../controlar-carga-camion/controlar-carga-camion.component';
import { TipoDocumentoPorteService } from '../../shared/desplegable-tipo-documento-porte/tipo-documento-porte.service';

@Component({
  selector: 'yrd-modificar-datos-orden-carga-camion',
  templateUrl: './modificar-datos-orden-carga-camion.component.html',
  styleUrls: ['./../../controlar-carga-camion/controlar-carga-camion.component.css']
})
export class ModificarDatosOrdenCargaCamionComponent
extends ControlarCargaCamionComponent
implements AfterViewInit {

  @ViewChild('datosDocumento') datosDocumentoControlarCarga: DetalleModificarDatosOrdenCargaCamionComponent;

  constructor(protected readonly movimientoCargaCamionService: MovimientoCargaCamionService,
    protected readonly circuitoService: CircuitoService,
    protected readonly popupService: PopupService,
    protected readonly navigationService: NavigationService,
    protected readonly fcService: FormComponentService,
    protected readonly fb: FormBuilder,
    protected readonly authService: AuthService,
    protected readonly modificarDatosOrdenCargaCamionService: ModificarDatosOrdenCargaCamionService,
    protected readonly tipoDocumentoPorteService: TipoDocumentoPorteService) {
      super(movimientoCargaCamionService, circuitoService, popupService,
            navigationService, fcService, fb, authService, tipoDocumentoPorteService);
  }

  protected mapControlsToCommand(): ModificarDatosOrdenCargaCamionCommand {
    let command = new ModificarDatosOrdenCargaCamionCommand();
    const commandMovimiento = super.mapControlsToCommand();
    command = Object.assign(command, commandMovimiento);

    command.patenteCamion = this.fcService.getValue('datosDocumento.patentes.patenteCamion');
    command.patenteAcoplado = this.fcService.getValue('datosDocumento.patentes.patenteAcoplado');
    command.idTitular = this.fcService.getValue('datosDocumento.titular');
    command.idIntermediario = this.fcService.getValue('datosDocumento.intermediario');
    command.idRemitenteComercial = this.fcService.getValue('datosDocumento.remitenteComercial');
    command.idCorredorComprador = this.fcService.getValue('datosDocumento.corredorComprador');
    command.idEntregador = this.fcService.getValue('datosDocumento.entregador');
    command.idDestinatario = this.fcService.getValue('datosDocumento.destinatario');
    command.destino = this.fcService.getValue('datosDocumento.destino');
    command.idVendedor = this.fcService.getValue('datosDocumento.vendedor');
    const transportista = this.fcService.getControl('datosDocumento.transportista');
    if (transportista && transportista.value) {
      command.idTransportista = Number(transportista.value.id);
      command.codigoFiscalTransportista = transportista.value.codigoFiscal;
    }
    command.idChofer = this.fcService.getValue('datosDocumento.chofer');

    return command;
  }

  public onClickAceptar(): void {
    const errors = new Collection<string>();
    this.fcService.validateForm(this.form.controls, errors, '');
    this.fcService.showValidationError(errors);

    if (this.fcService.isValidForm()) {
      const command = this.mapControlsToCommand();
      this.saveEditItem(this.modificarDatosOrdenCargaCamionService.updateFueraDeCircuito(command));
    }
  }
}
