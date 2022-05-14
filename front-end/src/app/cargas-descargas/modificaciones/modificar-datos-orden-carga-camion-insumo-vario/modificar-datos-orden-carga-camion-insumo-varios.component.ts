import { Component, ViewChild } from '@angular/core';
import { ControlarCargaCamionInsumoVarioComponent } from '../../controlar-carga-camion-varios/controlar-carga-camion-insumo-vario.component';
import { MovimientoCargaCamionInsumoVarioService } from '../../controlar-carga-camion-varios/movimiento-carga-camion-insumo-vario.service';
import { PopupService } from '../../../core/services/popupService/popup.service';
import { NavigationService } from '../../../core/services/navigationService/navigation.service';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../../core/services/session/auth.service';
import { CircuitoService } from '../../shared/services/circuito.service';
import { ModificarDatosOrdenCargaCamionInsumoVariosCommand } from '../../../shared/data-models/commands/cargas-descargas/modificar-datos-orden-carga-camion-insumo-varios-command';
import { Collection } from '../../../core/models/collection';
import { DetalleModificarDatosOrdenCargaCamionInsumoVariosComponent } from './detalle-modificar-datos-orden-carga-camion-insumo-vario/detalle-modificar-datos-orden-carga-camion-insumo-varios.component';

@Component({
  selector: 'yrd-modificar-datos-orden-carga-camion-insumo-varios',
  templateUrl: './modificar-datos-orden-carga-camion-insumo-varios.component.html',
  styleUrls: ['./../../controlar-carga-camion-varios/controlar-carga-camion-insumo-vario.component.css']
})
export class ModificarDatosOrdenCargaCamionInsumoVariosComponent extends ControlarCargaCamionInsumoVarioComponent {

  @ViewChild('datosDocumento') datosDocumento: DetalleModificarDatosOrdenCargaCamionInsumoVariosComponent;

  constructor(protected readonly movimientoCargaService: MovimientoCargaCamionInsumoVarioService,
              protected readonly popupService: PopupService, protected readonly navigationService: NavigationService,
              protected readonly fcService: FormComponentService, protected readonly fb: FormBuilder,
              protected readonly authService: AuthService, protected readonly circuitoService: CircuitoService) {
    super(movimientoCargaService, popupService, navigationService, fcService, fb, authService, circuitoService);
  }

  mapControlsToCommand(): ModificarDatosOrdenCargaCamionInsumoVariosCommand {
    let command = new ModificarDatosOrdenCargaCamionInsumoVariosCommand();
    const commandMovimiento = super.mapControlsToCommand();
    command = Object.assign(command, commandMovimiento);

    command.patenteCamion = this.fcService.getValue('datosDocumento.patenteCamion');
    command.patenteAcoplado = this.fcService.getValue('datosDocumento.patenteAcoplado');
    command.idIntermediario = this.fcService.getValue('datosDocumento.intermediario');
    command.idRemitenteComercial = this.fcService.getValue('datosDocumento.remitenteComercial');
    command.idcorredorVendedor = this.fcService.getValue('datosDocumento.corredor');
    command.idDestinatario = this.fcService.getValue('datosDocumento.destinatario');
    command.tarifaFleteReferencia = this.fcService.getValue('datosDocumento.tarifaFleteReferencia');
    command.tarifaFletePorTn = this.fcService.getValue('datosDocumento.tarifaFletePorTn');
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
      this.saveEditItem(this.movimientoCargaService.updateDatosOrdenCarga(command));
    }
  }
}
