import { Component, ViewChild } from '@angular/core';
import { ControlarDescargaVagonCerealesService } from './controlar-descarga-vagon-cereales.service';
import { FormBuilder, Validators } from '@angular/forms';
import { CircuitoService } from '../shared/services/circuito.service';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { NavigationService } from '../../core/services/navigationService/navigation.service';
import { MovimientoService } from '../shared/services/movimiento.service';
import { MovimientoCerealGrano } from '../../shared/data-models/movimiento-cereal-grano';
import { AuthService } from '../../core/services/session/auth.service';
import { DescargaEventsNotifierService } from '../shared/services/descarga-events-notifier.service';
import { tiposProducto } from '../../shared/data-models/tipo-producto';
import { Actividades, ComportamientoAfip } from '../../shared/enums/enums';
import { EntitiesTiposTransporte } from '../../shared/data-models/tipo-transporte';
import { ControlarDescargaCerealesCommand } from '../../shared/data-models/commands/cargas-descargas/controlar-descarga-camion-cereales-command';
import { PopupService } from '../../core/services/popupService/popup.service';
import { ControlarDescargaVagonComponent } from '../shared/controlar-descargas-base/controlar-descargas-vagon.component';
import { DatosDocumentoControlarDescargaVagonCerealesComponent } from './datos-documento-controlar-descarga-vagon-cereales/datos-documento-controlar-descarga-vagon-cereales.component';
import { Resources } from '../../../locale/artifacts/resources';
import { CommandService } from '../../shared/command-service/command.service';
import { TipoDocumentoPorteService } from '../shared/desplegable-tipo-documento-porte/tipo-documento-porte.service';
import { ConsultarDatosAfipService } from '../../../app/gestion-afip/consultar-datos-afip/consultar-datos-afip-service';
import { DatosFerroviariosAfipDataView } from '../../../app/gestion-afip/consultar-datos-afip/datos-Cpe-Ferroviaria-Afip-Data-View';
import { HttpErrorResponse } from '@angular/common/http';
import * as HttpStatus from 'http-status-codes';

@Component({
  selector: 'yrd-controlar-descarga-vagon-cereales',
  templateUrl: './controlar-descarga-vagon-cereales.component.html',
  styleUrls: ['./controlar-descarga-vagon-cereales.component.css']
})
export class ControlarDescargaVagonCerealesComponent extends ControlarDescargaVagonComponent {

  @ViewChild('datosDocumento') datosDocumento: DatosDocumentoControlarDescargaVagonCerealesComponent;

  esCartaPorteElectronica = false;
  esAutomatica = false;
  falloAfip = false;
  confirmoCtg = false;
  confirmadoManualmente = false;
  aceptarSinConfirmarCtg = false;
  consultoAfip = false;
  esVagonCerealElectronica = false;

  constructor(popupService: PopupService,
    protected readonly controlarDescargaVagonCerealesService: ControlarDescargaVagonCerealesService,
    protected readonly fb: FormBuilder,
    circuitoService: CircuitoService,
    fcService: FormComponentService,
    navigationService: NavigationService,
    movimientoService: MovimientoService<MovimientoCerealGrano>,
    authService: AuthService,
    eventsNotifierService: DescargaEventsNotifierService,
    protected readonly commandService: CommandService,
    protected readonly tipoDocumentoPorteService: TipoDocumentoPorteService,
    private readonly servicioAfip: ConsultarDatosAfipService) {
    super(popupService,
      fb,
      circuitoService,
      fcService,
      navigationService,
      movimientoService,
      authService,
      eventsNotifierService,
      commandService);
    this.tipoProductoSeleccionada = tiposProducto[0];
    this.tipoTransporte = EntitiesTiposTransporte.Tren;
    this.idActividad = Actividades.ControlarDescargaVagonCereales;
    this.ControlPath = 'ControlarDescargaVagonCereales';
  }

  get esAlta(): boolean {
    return this.idActividad === Actividades.ControlarDescargaVagonCereales;
  }

  get esFueraCircuito(): boolean {
    return this.idActividad === Actividades.ModificarControlFueraCircuito;
  }

  protected Registrar(command: ControlarDescargaCerealesCommand) {
    if (this.idActividad === Actividades.ModificarControlFueraPuesto) {
      return this.controlarDescargaVagonCerealesService.ModificarFueraPuesto(command);
    } else if (this.idActividad === Actividades.ModificarControlFueraCircuito) {
      return this.controlarDescargaVagonCerealesService.ModificarFueraCircuito(command);
    } else if (this.idActividad === Actividades.ModificarDocPorteVagonesFueraDePuesto) {
      return this.controlarDescargaVagonCerealesService.ModificarDocPorteFueraDePuesto(command);
    } else {
      return this.controlarDescargaVagonCerealesService.RegistrarMovimiento(command);
    }
  }

  protected mapControlsToCommand(): ControlarDescargaCerealesCommand {

    const idCircuito = this.circuito.id;
    const idTipoDocumentoPorte = Number(this.fcService.getValue('documentoPorte.tipoDocumentoPorte'));
    let numeroDocumentoPorte = String(this.fcService.getValue('documentoPorte.numeroDocumentoPorte'));

    numeroDocumentoPorte = numeroDocumentoPorte.replace(/ /g, '');
    this.fcService.setValue('documentoPorte.numeroDocumentoPorte', numeroDocumentoPorte, { onlySelf: true });
    this.setMascara();

    const command = new ControlarDescargaCerealesCommand(idCircuito, idTipoDocumentoPorte, numeroDocumentoPorte);

    command.id = this.idMovimiento;
    command.esModificacion = this.esModificacion;
    command.esModificacionDocPorte = this.esModificacionDocPorte;
    command.esRegimenElectronico = this.esCartaPorteElectronica;

    if (this.esCartaPorteElectronica) {
      command.codigoTrazabilidadGrano = Number(this.fcService.getValue('documentoPorte.ctg'));
      command.confirmadoManualmente = this.fcService.getValue('datosDocumento.confirmacionArriboCtg.confirmadoManualmente');
      command.aceptarSinConfirmarCtg = this.fcService.getValue('datosDocumento.confirmacionArriboCtg.aceptarSinConfirmarCtg');
    }

    this.mapControlDatosDocumentoToCommand(command);

    return command;
  }

  protected resetDatosVagon() {
    super.resetDatosVagon();
    this.datosDocumento.resetDatosVagon();
    if (this.cargaNuevoVagon) {
      this.datosDocumento.focusVagon();
    }
  }

  onEsAfipAutomatico(esAutomatica: boolean): void {
    this.esAutomatica = esAutomatica;
  }

  protected resetForm() {
    super.resetForm();
    this.falloAfip = false;
    this.datosDocumento.resetForm();
  }

  protected getErroresOperadoresOncca() {
    this.datosDocumento.getErroresOperadoresOncca();
  }

  protected loadMovimiento(movimiento: MovimientoCerealGrano) {
    super.loadMovimiento(movimiento);
    this.confirmoCtg = movimiento.confirmoCtg;
    this.confirmadoManualmente = movimiento.confirmadoManualmente;
    this.aceptarSinConfirmarCtg = movimiento.sinConfirmarCtg;
    this.consultoAfip = movimiento.consultoAfip;
    if (this.esModificacionDocPorte) {
      this.controlarDescargaVagonCerealesService.TodosVagonesFactiblesModificarFueraPuesto(movimiento.nroDocumentoPorte)
        .subscribe((todosFactiblesModificar: boolean) => {
          if (!todosFactiblesModificar) {
            this.popupService.warning(Resources.Messages.ExistenVagonesDelDocumentoDePorteQueNoSePuedenModificarFueraDePuesto);
          }
        });
    }
  }

  protected comportamientoAfip() {
    this.tipoDocumentoPorteService.consultarComportamientoAfip(this.tipoDocumentoSeleccionado.id).subscribe(IdComportamientoAfip => {
      this.esCartaPorteElectronica = IdComportamientoAfip === ComportamientoAfip.RegimenElectronico;
      this.esVagonCerealElectronica = true;
      this.comportamientoNumeroCEE();
      this.comportamientoCTGElectronico();
      this.comportamientoNroVagon();
      this.comportamientoTitularyNroDocPorte();
      this.comportamientoConfirmacionArribo();
    });
  }

  comportamientoTitularyNroDocPorte() {
    const titular = this.fcService.getControl('datosDocumento.titularCartaPorte');
    const nroDocPorte = this.fcService.getControl('documentoPorte.numeroDocumentoPorte');

    if (titular && nroDocPorte) {
      this.esCartaPorteElectronica && (this.esAutomatica && !this.esModificacionDocPorte)
      || this.confirmadoManualmente
      || this.confirmoCtg
      || this.consultoAfip
      || this.esConsulta ?
        titular.disable() : titular.enable();
      (this.esCartaPorteElectronica && (this.esAutomatica && !this.esModificacionDocPorte))
      || (!this.esCartaPorteElectronica && !this.esModificacionDocPorte && !this.esAlta)
      || this.confirmadoManualmente
      || this.confirmoCtg
      || this.consultoAfip
      || this.esConsulta
      || this.recuperoDocumentoPorte ?
        nroDocPorte.disable() : nroDocPorte.enable();
      if (this.esAlta && this.esCartaPorteElectronica) {nroDocPorte.reset();  titular.reset(); }
    }
  }

  comportamientoNumeroCEE() {
    const numeroCEE = this.fcService.getControl('datosDocumento.numeroCEE');
    if (numeroCEE) {
      this.esCartaPorteElectronica || this.esConsulta || (!this.esCartaPorteElectronica && !this.esModificacionDocPorte && !this.esAlta) ||
      this.recuperoDocumentoPorte ?
      numeroCEE.disable() : numeroCEE.enable();
      if (this.esAlta && this.esCartaPorteElectronica) {
        numeroCEE.reset();
      }
    }
  }

  comportamientoCTGElectronico() {
    const numeroCTG = this.fcService.getControl('documentoPorte.ctg');
    if (numeroCTG) {
      if (this.esCartaPorteElectronica && this.esAlta) {
        numeroCTG.enable();
        numeroCTG.reset();
      }
      if (this.esCartaPorteElectronica
        && this.idMovimiento > 0
        && (this.consultoAfip || this.confirmoCtg || this.confirmadoManualmente)) {
        numeroCTG.disable();
      }
      if (!this.esCartaPorteElectronica && this.esAlta) {
        numeroCTG.reset();
        numeroCTG.disable();
      }
    }
  }

  comportamientoNroVagon() {
    const numeroVagon = this.fcService.getControl('datosDocumento.datosVagon.numeroVagon');
    if (numeroVagon && (this.esAlta || this.esModificacionDocPorte)) {
      if (this.esCartaPorteElectronica) {
        numeroVagon.clearValidators();
        numeroVagon.setValidators(Validators.compose([Validators.required, Validators.min(1), Validators.max(99999999)]));
      } else {
        numeroVagon.clearValidators();
        numeroVagon.setValidators(Validators.compose([Validators.required, Validators.min(1), Validators.max(9999999)]));
      }
    }
  }

  comportamientoConfirmacionArribo() {
    if (!this.esAutomatica) {
      if (this.esCartaPorteElectronica && !this.confirmoCtg) {
        this.fcService.enableControl('datosDocumento.confirmacionArriboCtg.aceptarSinConfirmarCtg');
        this.fcService.enableControl('datosDocumento.confirmacionArriboCtg.confirmadoManualmente');
      } else {
        this.fcService.disableControl('datosDocumento.confirmacionArriboCtg.aceptarSinConfirmarCtg');
        this.fcService.disableControl('datosDocumento.confirmacionArriboCtg.confirmadoManualmente');
      }
    } else if (this.falloAfip) {
      this.fcService.enableControl('datosDocumento.confirmacionArriboCtg.aceptarSinConfirmarCtg');
      this.fcService.enableControl('datosDocumento.confirmacionArriboCtg.confirmadoManualmente');
    }
  }

  mapControlDatosDocumentoToCommand(command: ControlarDescargaCerealesCommand): void {
    this.controlarDescargaVagonCerealesService.MapDatosDocumentoToCommand(this.fcService, command);
    command.numeroTarjeta = this.fcService.getValue('datosDocumento.datosVagon.tarjeta');
    command.autorizaciones = this.autorizaciones;
    if (this.datosDocumento.movimiento != null) {
      command.version = this.datosDocumento.movimiento.version;
    }
  }

  OnBlurRecuperarDatoCpe() {
    const ctg = this.fcService.getControl('documentoPorte.ctg');
    if (ctg
      && ctg.valid
      && this.esCartaPorteElectronica
      && this.esAutomatica) {
      this.servicioAfip.getDataCpeFerroviaria(ctg.value, this.tipoDocumentoSeleccionado.id).subscribe(datosCPE => {
        this.setDatosCpeAfip(datosCPE);
      });
    }
  }
  setDatosCpeAfip(datosCPE: DatosFerroviariosAfipDataView) {
    this.fcService.setValue('documentoPorte.numeroDocumentoPorte', datosCPE.cartaPorte, { onlySelf: true }, true);
    this.fcService.setValue('documentoPorte.ctg', datosCPE.ctg, { onlySelf: true }, true);
    this.fcService.setValue('datosDocumento.titularCartaPorte', datosCPE.titular, { onlySelf: true }, true);

  }

  aceptar(): void {
    if (!(this.fcService.getValue('datosDocumento.confirmacionArriboCtg.aceptarSinConfirmarCtg') ||
      this.fcService.getValue('datosDocumento.confirmacionArriboCtg.confirmadoManualmente'))
      && this.esCartaPorteElectronica
      && (this.falloAfip || !this.esAutomatica)
      && this.esAlta) {
      this.popupService.error(Resources.Messages.DebeSeleccionarAlMenosUnCheck);
      return;
    }
    super.aceptar();
  }
  protected mensajesValidacionesHijo(_error: HttpErrorResponse): void {
    if (_error.status === HttpStatus.BAD_GATEWAY) {
      this.popupService.warning(Resources.Messages.ElServicioAfipNoSeEncuentraDisponible, Resources.Labels.ErrorAfip);
      this.falloAfip = true;
      if (this.esCartaPorteElectronica && this.esAutomatica) {
        this.fcService.enableControl('datosDocumento.confirmacionArriboCtg.aceptarSinConfirmarCtg');
        this.fcService.enableControl('datosDocumento.confirmacionArriboCtg.confirmadoManualmente');
      }
    }
  }
}
