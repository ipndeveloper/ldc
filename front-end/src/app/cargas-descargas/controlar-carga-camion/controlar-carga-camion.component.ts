//#region Imports
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ControlarCargaBaseComponent } from '../shared/controlar-carga-base/controlar-carga-base.component';
import { MovimientoCargaCamion } from '../../shared/data-models/movimiento-carga';
import { PopupService } from '../../core/services/popupService/popup.service';
import { NavigationService } from '../../core/services/navigationService/navigation.service';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../core/services/session/auth.service';
import { DocumentoPorteComponent } from '../shared/documento-porte/documento-porte.component';
import { MovimientoCargaCamionService } from './movimiento-carga-camion.service';
import { CircuitoService } from '../shared/services/circuito.service';
import { ControlarCargaCamionCommand, ModificarCargaCamionCommand, CargaCamionCommand } from '../../shared/data-models/commands/cargas-descargas/controlar-carga-command';
import { Resources } from '../../../locale/artifacts/resources';
import { DatosDocumentoControlarCargaCamionComponent } from './datos-documento-controlar-carga-camion/datos-documento-controlar-carga-camion.component';
import { ComportamientoAfip, TiposProducto } from '../../shared/enums/enums';
import { TipoDocumentoPorteService } from '../shared/desplegable-tipo-documento-porte/tipo-documento-porte.service';
//#endregion

@Component({
  selector: 'yrd-controlar-carga-camion',
  templateUrl: './controlar-carga-camion.component.html',
  styleUrls: ['./controlar-carga-camion.component.css']
})
export class ControlarCargaCamionComponent
  extends ControlarCargaBaseComponent<MovimientoCargaCamion,
  CargaCamionCommand,
  ControlarCargaCamionCommand,
  ModificarCargaCamionCommand>
  implements AfterViewInit {

  @ViewChild('documentoPorte') documentoPorte: DocumentoPorteComponent;
  @ViewChild('datosDocumento') datosDocumentoControlarCarga: DatosDocumentoControlarCargaCamionComponent;

  esCartaPorteElectronica = false;

  constructor(protected readonly movimientoCargaCamionService: MovimientoCargaCamionService,
    protected readonly circuitoService: CircuitoService,
    protected readonly popupService: PopupService,
    protected readonly navigationService: NavigationService,
    protected readonly fcService: FormComponentService,
    protected readonly fb: FormBuilder,
    protected readonly authService: AuthService,
    protected readonly tipoDocumentoPorteService: TipoDocumentoPorteService) {
    super(movimientoCargaCamionService, circuitoService, popupService
      , navigationService, fcService, fb, authService);
    this.CurrentPath = 'ControlarCargaCamion';
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    this.deshabilitarControles();
  }
  //#region Deshabilita y Focus
  protected deshabilitarControles(): void {
    if (this.esConsulta) {
      this.fcService.disableControl('documentoPorte.tipoDocumentoPorte');
      this.fcService.disableControl('documentoPorte.numeroDocumentoPorte');
    }
  }

  protected setFocus(): void {
    setTimeout(() => this.documentoPorte.setFocus(), 0);
  }
  //#endregion

  //#region Seteo y Mapeo
  protected setDatosDocumentoForm(): void {
    this.datosDocumentoCarga = this.datosDocumentoControlarCarga.datosDocumentoForm;
  }

  protected mapControlsToCommand(): ControlarCargaCamionCommand {
    const command = new ControlarCargaCamionCommand();

    command.fechaVencimiento = this.fcService.getValue('datosDocumento.fechaVencimiento');
    command.numeroCEE = Number(this.fcService.getValue('datosDocumento.numeroCEE'));
    command.observaciones = this.fcService.getValue('datosDocumento.observaciones');
    command.idTipoCartaPorte = Number(this.fcService.getValue('datosDocumento.tipoCartaPorte'));
    command.idTipoPesada = Number(this.fcService.getValue('datosDocumento.tipoPesada'));
    command.idTipoDocumentoPorte = Number(this.fcService.getValue('documentoPorte.tipoDocumentoPorte'));
    command.numeroDocumentoPorte = this.fcService.getValue('documentoPorte.numeroDocumentoPorte');
    command.idSedeDestino = this.fcService.getValue('datosDocumento.sedeDestino');
    command.idSedeOrigen = this.fcService.getValue('datosDocumento.sedeOrigen');
    command.id = this.idMovimiento;
    command.idViaje = this.idViaje;
    command.idActividad = this.idActividad;
    command.idTipoProducto = this.tipoProductoSeleccionada.id;
    command.idCondicionManipuleo = Number(this.fcService.getValue('datosDocumento.lugarCarga'));
    command.version = this.movimientoCarga.version;
    command.numeroCOT = Number(this.fcService.getValue('datosDocumento.numeroCOT'));
    command.esVentaInterco = this.fcService.getValue('datosDocumento.esVentaInterco');
    command.tarifaFleteReferencia = this.fcService.getValue('datosDocumento.tarifaFleteReferencia');
    command.tarifaFletePorTn = this.fcService.getValue('datosDocumento.tarifaFletePorTn');
    command.kilometrosRecorridos = this.fcService.getValue('datosDocumento.kilometrosRecorridos');
    command.idTipoGrano = this.fcService.getValue('datosDocumento.tipoGrano');

    if (!this.esModificacionFueraDePuesto && !this.esFueraCircuito) {
      command.numeroTarjeta = this.fcService.getValue('datosDocumento.tarjeta');
    }

    if (this.esFueraCircuito) {
      command.fechaStockSan = this.fcService.getValue('fechaPeriodoStockSan.fechaStock');

      if (this.tipoProductoSeleccionada.id === TiposProducto.Cereal) {
        command.numeroCTG = Number(this.fcService.getValue('datosDocumento.numeroCTG'));
      }
    }

    if (this.circuito) {
      command.idCircuito = this.circuito.id;
    }
    return command;
  }

  consultaRegimen(): void {
    this.tipoDocumentoPorteService.consultarComportamientoAfip(this.tipoDocumentoSeleccionado.id)
    .subscribe(IdComportamientoAfip => {
      this.esCartaPorteElectronica = IdComportamientoAfip === ComportamientoAfip.RegimenElectronico;
      this.comportamientoNroDocumentoPorte();
      this.comportamientoNroCEE();
    });
  }

  comportamientoNroDocumentoPorte() {
    if (this.esConsulta) {
      this.fcService.disableControl('documentoPorte.numeroDocumentoPorte');
    } else if (this.esCartaPorteElectronica && !this.esFueraCircuito) {
      this.fcService.setValue('documentoPorte.numeroDocumentoPorte', '', {onlySelf: true}, true);
    } else {
      this.fcService.enableControl('documentoPorte.numeroDocumentoPorte');
    }
  }

  comportamientoNroCEE() {
    if (this.esCartaPorteElectronica) {
      this.fcService.disableControl('datosDocumento.numeroCEE');
    }
  }

  //#endregion

  //#region Disparadores y validaciones
  onClickAceptar(): void {
    if (this.verificarFechaVencimiento()) {
      super.onClickAceptar();
    } else {
      this.esConsulta = false;
    }
  }

  protected verificarFechaVencimiento(): boolean {
    const controlFechaVencimiento = this.fcService.getValue('datosDocumento.fechaVencimiento');
    if (!this.esConsulta && controlFechaVencimiento && !this.esModificacionMovimiento) {
      const fechaHoy = new Date();
      const fechaVencimiento = (new Date(controlFechaVencimiento + 'T23:59:59'));
      if (fechaVencimiento.getTime() < fechaHoy.getTime()) {
        this.popupService.error(Resources.Messages.FechaVencimientoMenorAHoy, Resources.Labels.Notificacion);
        return false;
      } else {
        return true;
      }
    }
    return true;
  }
  //#endregion
}

