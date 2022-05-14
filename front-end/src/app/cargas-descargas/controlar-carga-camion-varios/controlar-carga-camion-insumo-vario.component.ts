import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DocumentoPorteComponent } from '../shared/documento-porte/documento-porte.component';
import { AuthService } from '../../core/services/session/auth.service';
import { DatosDocumentoControlarCargaCamionInsumoVarioComponent } from './datos-documento-controlar-carga-camion-varios/datos-documento-controlar-carga-camion-Insumo-vario.component';
import { ControlarCargaBaseComponent } from '../shared/controlar-carga-base/controlar-carga-base.component';
import { PopupService } from '../../core/services/popupService/popup.service';
import { NavigationService } from '../../core/services/navigationService/navigation.service';
import { CircuitoService } from '../shared/services/circuito.service';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { MovimientoCargaCamionVarios } from '../../shared/data-models/movimiento-carga';
import { MovimientoCargaCamionInsumoVarioService } from './movimiento-carga-camion-insumo-vario.service';
import { ControlarCargaCamionVariosCommand, CrearCargaCamionVariosCommand, ModificarCargaCamionVariosCommand } from '../../shared/data-models/commands/cargas-descargas/controlar-carga-camion-varios-command';

@Component({
  selector: 'yrd-controlar-carga-camion-insumo-vario',
  templateUrl: './controlar-carga-camion-insumo-vario.component.html',
  styleUrls: ['./controlar-carga-camion-insumo-vario.component.css']
})
export class ControlarCargaCamionInsumoVarioComponent
  extends ControlarCargaBaseComponent<MovimientoCargaCamionVarios,
                                      ControlarCargaCamionVariosCommand,
                                      CrearCargaCamionVariosCommand,
                                      ModificarCargaCamionVariosCommand>
  implements AfterViewInit {

  @ViewChild('documentoPorte') documentoPorte: DocumentoPorteComponent;
  @ViewChild('datosDocumento') datosDocumento: DatosDocumentoControlarCargaCamionInsumoVarioComponent;
  completarTipoProducto = true;

  constructor(protected readonly movimientoCargaService: MovimientoCargaCamionInsumoVarioService,
              protected readonly popupService: PopupService,
              protected readonly navigationService: NavigationService,
              protected readonly fcService: FormComponentService,
              protected readonly fb: FormBuilder,
              protected readonly authService: AuthService,
              protected readonly circuitoService: CircuitoService) {
    super(movimientoCargaService, circuitoService, popupService, navigationService, fcService, fb, authService);
    this.CurrentPath = 'ControlarCargaCamionVarios';
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    this.deshabilitarControles();
  }

  protected setDatosDocumentoForm(): void {
    this.datosDocumentoCarga = this.datosDocumento.datosDocumentoForm;
  }

  private deshabilitarControles() {
    if (this.esConsulta) {
      this.fcService.disableControl('numeroCEE');
      this.fcService.disableControl('observaciones');

      const tipoDocumentoPorte = this.form.get('documentoPorte.tipoDocumentoPorte');
      const numeroDocumentoPorte = this.form.get('documentoPorte.numeroDocumentoPorte');
      if (tipoDocumentoPorte && numeroDocumentoPorte) {
        tipoDocumentoPorte.disable();
        numeroDocumentoPorte.disable();
      }
    }
  }

  mapControlsToCommand(): ControlarCargaCamionVariosCommand {
    const command = new ControlarCargaCamionVariosCommand();

    command.id = this.idMovimiento;
    command.idViaje = this.idViaje;
    if (this.circuito) {
      command.idCircuito = this.circuito.id;
    }
    command.numeroCEE = this.fcService.getValue('datosDocumento.numeroCEE');
    command.observaciones = this.fcService.getValue('datosDocumento.observaciones');
    command.idActividad = this.idActividad;
    command.version = this.movimientoCarga.version;
    command.numeroCOT = this.fcService.getValue('datosDocumento.numeroCOT');

    if (this.esFueraCircuito) {
      command.numeroTarjeta = this.fcService.getValue('datosDocumento.tarjeta');
      command.fechaStockSan = this.fcService.getValue('fechaPeriodoStockSan.fechaStock');
    }
    command.numeroTarjeta = this.fcService.getValue('datosDocumento.tarjeta');
    command.idDestinatario = this.fcService.getValue('datosDocumento.destinatario');
    command.idTransportista = this.fcService.getValue('datosDocumento.transportista');
    command.idSedeDestino = this.fcService.getValue('datosDocumento.sedeDestino');
    command.idSedeOrigen = this.fcService.getValue('datosDocumento.sedeOrigen');

    command.idActividad = this.idActividad;
    command.idCondicionManipuleo = Number(this.fcService.getValue('datosDocumento.lugarCarga'));

    this.mapControlsCartaPorte(command);

    return command;
  }

  private mapControlsCartaPorte(command: ControlarCargaCamionVariosCommand) {
    const tipoDocumentoPorte = this.form.get('documentoPorte.tipoDocumentoPorte');
    const numeroDocumentoPorte = this.form.get('documentoPorte.numeroDocumentoPorte');
    if (tipoDocumentoPorte && numeroDocumentoPorte) {
      command.idTipoDocumentoPorte = tipoDocumentoPorte.value.id;
      command.numeroDocumentoPorte = numeroDocumentoPorte.value;
    }
  }

  protected setFocus(): void {
    setTimeout(() => {
      this.documentoPorte.setFocus();
    }, 0);
  }
}
