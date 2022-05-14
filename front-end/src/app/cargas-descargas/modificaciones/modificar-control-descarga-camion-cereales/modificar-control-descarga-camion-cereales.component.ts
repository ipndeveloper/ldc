import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';

import { PopupService } from '../../../core/services/popupService/popup.service';
import { CircuitoService } from '../../shared/services/circuito.service';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { NavigationService } from '../../../core/services/navigationService/navigation.service';
import { MovimientoService } from '../../shared/services/movimiento.service';
import { AuthService } from '../../../core/services/session/auth.service';
import { DocumentoPorteComponent } from '../../shared/documento-porte/documento-porte.component';
import { Actividades, ComportamientoAfip, Productos } from '../../../shared/enums/enums';
import { tiposProducto } from '../../../shared/data-models/tipo-producto';
import { DatosDocumentoControlarDescargaCerealesComponent } from '../../controlar-descarga-camion-cereales/datos-documento-controlar-descarga-cereales/datos-documento-controlar-descarga-cereales.component';
import { ConsultarDatosAfipComponent } from '../../../gestion-afip/consultar-datos-afip/consultar-datos-afip.component';
import { MovimientoCerealGrano } from '../../../shared/data-models/movimiento-cereal-grano';
import { Collection } from '../../../core/models/collection';
import { ModificarDescargaCerealesFueraPuestoCommand } from './modificar-descarga-camion-cereales-fuera-puesto-command';
import { ModificarDescargaCamionCerealesFueraCircuitoCommand } from './modificar-descarga-camion-cereales-fuera-circuito-command';
import { ControlarDescargaCamionCerealesService } from '../../controlar-descarga-camion-cereales/controlar-descarga-camion-cereales.service';
import { ModificarDescargasBaseComponent } from '../../shared/modificar-descargas-base/modificar-descargas-base.component';
import { DescargaEventsNotifierService } from '../../shared/services/descarga-events-notifier.service';
import { ControlarDescargaCerealesCommand } from '../../../shared/data-models/commands/cargas-descargas/controlar-descarga-camion-cereales-command';
import { fechaDebeSerMenorIgualAFechaDelDia } from '../../shared/validators/fecha.validator';
import { CommandService, Command } from '../../../shared/command-service/command.service';
import { ModificarDescargaCerealesFueraPuestoBACommand } from './modificar-descarga-camion-cereales-fuera-puesto-ba-command';
import { TipoDocumentoPorteService } from '../../shared/desplegable-tipo-documento-porte/tipo-documento-porte.service';
import { Resources } from '../../../../locale/artifacts/resources';

@Component({
  selector: 'yrd-modificar-control-descarga-camion-cereales',
  templateUrl: './modificar-control-descarga-camion-cereales.component.html',
  styleUrls: ['./modificar-control-descarga-camion-cereales.component.css']
})
export class ModificarControlDescargaCamionCerealesComponent extends ModificarDescargasBaseComponent implements AfterViewInit {
  @ViewChild('documentoPorte') documentoPorte: DocumentoPorteComponent;
  @ViewChild('datosDocumento') datosDocumento: DatosDocumentoControlarDescargaCerealesComponent;
  @ViewChild('consultarDatosAfip') consultarDatosAfip: ConsultarDatosAfipComponent;
  showCTGData = false;
  fillCampoEpa = false;
  confirmoCtg = false;
  debeDeshabilitarControlesPorMovimientoAplicadoEnSan: boolean;
  habilitaGrillaMermasEspeciales: boolean;
  esCartaPorteElectronica = true;
  esModificacionFueraDePuesto = true;
  movimiento: MovimientoCerealGrano;
  esAutomatica = false;
  falloAfip = false;

  constructor(popupService: PopupService,
    private readonly fb: FormBuilder,
    circuitoService: CircuitoService,
    fcService: FormComponentService,
    navigationService: NavigationService,
    movimientoService: MovimientoService<MovimientoCerealGrano>,
    private readonly modificarDescargaCamionCerealesService: ControlarDescargaCamionCerealesService,
    authService: AuthService,
    eventsNotifierService: DescargaEventsNotifierService,
    private readonly tipoDocumentoPorteService: TipoDocumentoPorteService,
    protected readonly commandService: CommandService) {
    super(popupService,
      navigationService,
      movimientoService,
      circuitoService,
      fcService,
      authService,
      eventsNotifierService,
      commandService);
    this.ControlPath = 'ModificarControlDescargaCamionCereales';
    this.tipoProductoSeleccionada = tiposProducto[0];
    this.esModificacion = true;
  }

  get botonesDeshabilitadosPorCupoInvalido(): boolean {
    return this.datosDocumento && this.datosDocumento.deshabilitarBotonAceptarPorCupoInvalido;
  }

  handleCommand(command: Command) {
    super.handleCommand(command);
    switch (command.name) {
      case 'ConsultarDatosAFIP':
        this.openConsultarDatosAfip();
        break;
    }
  }

  ngAfterViewInit() {
    if (this.datosDocumento) {
      this.datosDocumento.setFocusSinDocumentoPorte();
    }
  }

  protected createForm() {
    this.form = this.fb.group({
      circuito: this.fb.group({
        terminal: { value: this.terminal.descripcion, disabled: true },
        tipoMovimiento: { value: 'Descarga', disabled: true },
        tipoTransporte: { value: 'Camión', disabled: true },
        tipoProducto: { value: this.tipoProductoSeleccionada.descripcion, disabled: true }
      }),
      fechaPeriodoStockSan: this.fb.group({
        fechaStock: [{ value: undefined, disabled: true }, [Validators.required, fechaDebeSerMenorIgualAFechaDelDia()]]
      }),
      documentoPorte: this.fb.group({
        tipoDocumentoPorte: { value: '', disabled: true },
        numeroDocumentoPorte: [{ value: this.nroDocModificado, disabled: true }, {
          validators: [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(12),
            Validators.pattern(/^\d+$/)
          ],
          updateOn: 'blur'
        }],
        numeroDocumentoPorteInf: [{ value: this.nroDocModificado }, {
          validators: [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(12),
            Validators.pattern(/^\d+$/)
          ],
          updateOn: 'blur'
        }],
        fechaEntrada: { value: undefined, disabled: true },
        fechaSalida: { value: undefined, disabled: true },
        fechaOperacion: { value: undefined, disabled: true }
      })
    });
  }

  protected subscribeToControlChanges() {
    super.subscribeToControlChanges();
  }

  protected subscribeNavigation() {
    this.navigationService.requestExtras()
      .pipe(
        takeUntil(this.onDestroy)
      )
      .subscribe((params) => {
        if (params['idMovimiento']) {
          this.esFueraCircuito = params['esFueraCircuito'] === 'true';
          this.idMovimiento = params['idMovimiento'];
          this.debeDeshabilitarControlesPorMovimientoAplicadoEnSan =
            params['debeDeshabilitarControlesPorMovimientoAplicadoEnSan'] === 'true';

          if (!this.esFueraCircuito) {
            this.idActividad = Actividades.ModificarControlFueraPuesto;
            this.datosDocumento.focusPatente();
          } else {
            this.idActividad = Actividades.ModificarControlFueraCircuito;
            this.activarParaFueraCircuito();
          }
          this.buscarMovimiento();
        }
      });
  }

  private activarParaFueraCircuito() {
    const fechaStock = this.form.get('fechaPeriodoStockSan.fechaStock');
    const tipoDocumentoPorte = this.form.get('documentoPorte.tipoDocumentoPorte');
    const numeroDocumentoPorte = this.form.get('documentoPorte.numeroDocumentoPorteInf');
    this.activarCtg();

    if (fechaStock && tipoDocumentoPorte && numeroDocumentoPorte) {
      tipoDocumentoPorte.enable();
      numeroDocumentoPorte.enable();
      fechaStock.enable();
    }

    this.documentoPorte.setFocus();
  }

  private activarCtg() {
    const transportista = this.form.get('datosDocumento.confirmacionArriboCtg.transportista');
    const chofer = this.form.get('datosDocumento.confirmacionArriboCtg.chofer');
    const ctg = this.form.get('datosDocumento.confirmacionArriboCtg.ctg');
    if (ctg && transportista && chofer) {
      ctg.enable();
      transportista.enable();
      chofer.enable();
    }
  }

  protected loadMovimiento(movimiento: MovimientoCerealGrano) {
    this.movimiento = movimiento;
    this.confirmoCtg = movimiento.confirmoCtg;
    this.fcService.setValue(`documentoPorte.numeroDocumentoPorteInf`, movimiento.nroDocumentoPorte, { onlySelf: true });
    this.fcService.setValue(`documentoPorte.numeroDocumentoPorte`, movimiento.nroDocumentoPorte,
                            { onlySelf: true }, this.confirmoCtg || !this.esFueraCircuito);
    this.fcService.setValue(`documentoPorte.tipoDocumentoPorte`, movimiento.tipoDocumentoPorte, { onlySelf: true });
    this.datosDocumento.loadMovimiento(movimiento);
    const fecha = new Date(movimiento.fechaStockSan).toLocalISOString().substring(0, 10);
    this.fcService.setValue('datosDocumento.estadoMovimiento', movimiento.estado.descripcion, { onlySelf: true });
    if (this.esFueraCircuito) {
      this.fcService.setValue('fechaPeriodoStockSan.fechaStock', fecha, { onlySelf: true });
      this.fcService.setValue('documentoPorte.fechaEntrada', movimiento.fechaEntrada, { onlySelf: true });
      this.fcService.setValue('documentoPorte.fechaSalida', movimiento.fechaSalida, { onlySelf: true });
      this.fcService.setValue('documentoPorte.fechaOperacion', movimiento.fechaOperacion, { onlySelf: true });
      this.activarParaFueraCircuito();
    } else if (!movimiento.confirmoCtg) {
      this.activarCtg();
    }
    this.documentoPorte.setFocus();
    this.eventsNotifierService.onMovimientoRetrieved(movimiento);
    this.comportamientoAfip();
  }

  private mapControlsToCommand(): ModificarDescargaCerealesFueraPuestoCommand {
    const idCircuito = this.circuito.id;
    const idTipoDocumentoPorte = Number(this.fcService.getValue('documentoPorte.tipoDocumentoPorte'));
    let numeroDocumentoPorte = this.esFueraCircuito ?
      String(this.fcService.getValue('documentoPorte.numeroDocumentoPorte')) :
      String(this.fcService.getValue('documentoPorte.numeroDocumentoPorteInf'));

    numeroDocumentoPorte = numeroDocumentoPorte.replace(/ /g, '');
    this.fcService.setValue('documentoPorte.numeroDocumentoPorteInf', numeroDocumentoPorte, { onlySelf: true });
    this.fcService.setValue('documentoPorte.numeroDocumentoPorte', numeroDocumentoPorte, { onlySelf: true}, !this.esFueraCircuito);
    this.setMascara();

    const command = new ModificarDescargaCerealesFueraPuestoCommand(idCircuito, idTipoDocumentoPorte, numeroDocumentoPorte);

    command.id = this.idMovimiento;
    command.esModificacion = this.esModificacion;
    command.esFueraCircuito = this.esFueraCircuito;

    this.mapControlDatosDocumentoToCommand(command);

    return command;
  }

  private mapControlsToCommandBA(): ModificarDescargaCerealesFueraPuestoBACommand {
    const matriculaNueva = String(this.fcService.getValue('datosDocumento.patentes').patenteCamion);
    const matriculaOriginal = String(this.fcService.getValue('datosDocumento.patentes').patenteCamionOriginal);
    const tarjeta = String(this.fcService.getValue('datosDocumento.tarjeta'));

    const commandBA = new ModificarDescargaCerealesFueraPuestoBACommand();
    commandBA.matriculaNueva = matriculaNueva;
    commandBA.matriculaOriginal = matriculaOriginal;
    commandBA.tarjeta = tarjeta;

    return commandBA;
  }

  mapControlDatosDocumentoToCommand(command: ControlarDescargaCerealesCommand): void {
    command.patenteCamion = String(this.fcService.getValue('datosDocumento.patentes').patenteCamion);
    command.patenteAcoplado = String(this.fcService.getValue('datosDocumento.patentes').patenteAcoplado);
    command.fechaCarga = String(this.fcService.getValue('datosDocumento.fechaCarga'));
    command.fechaVencimiento = String(this.fcService.getValue('datosDocumento.fechaVencimiento'));
    command.numeroCEE = Number(this.fcService.getValue('datosDocumento.numeroCEE'));
    command.idProducto = Number(this.fcService.getValue('datosDocumento.producto'));
    command.idTipoGrano = Number(this.fcService.getValue('datosDocumento.tipoGrano'));
    command.idTitularCartaPorte = Number(this.fcService.getValue('datosDocumento.titularCartaPorte'));
    command.idVendedor = Number(this.fcService.getValue('datosDocumento.vendedor'));
    command.numeroEstablecimiento = Number(this.fcService.getValue('datosDocumento.establecimiento.numeroEstablecimiento'));
    if (this.fcService.getValue('datosDocumento.sustentabilidad') || command.idProducto === Productos.SojaEPA) {
      command.idCampoEpaSustentable = Number(this.fcService.getValue('datosDocumento.campoEpa'));
    }
    command.idCosecha = Number(this.fcService.getValue('datosDocumento.cosecha'));
    command.idIntermediario = Number(this.fcService.getValue('datosDocumento.intermediario'));
    command.idRemitenteComercial = Number(this.fcService.getValue('datosDocumento.remitenteComercial'));
    command.idCorredorComprador = Number(this.fcService.getValue('datosDocumento.corredorComprador'));
    command.fleteCargoLdc = Number(this.fcService.getValue('datosDocumento.fleteCargoLdc'));
    command.idMercadoTermino = Number(this.fcService.getValue('datosDocumento.mercadoTermino'));
    command.idTipoPesada = Number(this.fcService.getValue('datosDocumento.tipoPesada'));
    command.idCorredorVendedor = Number(this.fcService.getValue('datosDocumento.corredorVendedor'));
    command.kilometrosRecorridos = Number(this.fcService.getValue('datosDocumento.kilometrosRecorridos'));
    command.idEntregador = Number(this.fcService.getValue('datosDocumento.entregador'));
    command.tarifaReferencia = Number(this.fcService.getValue('datosDocumento.tarifaReferencia'));
    command.idDestinatario = Number(this.fcService.getValue('datosDocumento.destinatario'));
    command.tarifaTN = Number(this.fcService.getValue('datosDocumento.tarifaTN'));
    command.idIntermediarioFlete = Number(this.fcService.getValue('datosDocumento.intermediarioFlete'));
    command.kgBruto = Number(this.fcService.getValue('datosDocumento.kilosBrutosTaraGroup.kilosBruto'));
    command.kgTara = Number(this.fcService.getValue('datosDocumento.kilosBrutosTaraGroup.kilosTara'));
    command.idTipoCartaPorte = Number(this.fcService.getValue('datosDocumento.tipoCartaPorte'));
    command.idFinalidad = Number(this.fcService.getValue('datosDocumento.finalidad'));
    command.idProcedencia = Number(this.fcService.getValue('datosDocumento.procedencia'));
    command.idSedeOrigen = Number(this.fcService.getValue('datosDocumento.sedeOrigen'));
    command.idSedeDestino = Number(this.fcService.getValue('datosDocumento.sedeDestino'));
    command.idCodigoCupo = Number(this.fcService.getValue('datosDocumento.idCodigoCupo'));
    command.sustentabilidad = Boolean(this.fcService.getValue('datosDocumento.sustentabilidad'));
    command.version = this.datosDocumento.movimiento.version;

    command.codigoCupo = this.fcService.getValue('datosDocumento.codigoCupo');
    command.idMotivoCupo = this.fcService.getValue('datosDocumento.motivoCupo');


    command.movimientoAplicadoEnSan = this.debeDeshabilitarControlesPorMovimientoAplicadoEnSan;

    if (this.datosDocumento &&
      this.datosDocumento.cupo &&
      this.datosDocumento.cupo.estadoInicial) {
      command.idEstadoInicialCupo = this.datosDocumento.cupo.estadoInicial.id;
    }

    const ctgValues = this.fcService.getValue('datosDocumento.confirmacionArriboCtg');

    if (ctgValues) {
      if (ctgValues.transportista) {
        command.idTransportista = Number(ctgValues.transportista.id);
        command.codigoFiscalTransportista = ctgValues.transportista.codigoFiscal;
      }

      if (ctgValues.chofer) {
        command.idChofer = Number(ctgValues.chofer.id);
      }

      if (ctgValues.ctg) {
        command.codigoTrazabilidadGrano = Number(ctgValues.ctg);
      }
      command.codigoCancelacionCtg = ctgValues.codigoCancelacionCtg;
      command.aceptarSinConfirmarCtg = Boolean(ctgValues.aceptarSinConfirmarCtg);
      command.confirmadoManualmente = Boolean(ctgValues.confirmadoManualmente);

      command.esFleteCorto = Boolean(ctgValues.fleteCorto);
    }

    command.observaciones = this.fcService.getValue('datosDocumento.observaciones');
  }

  private mapControlsToCommandFueraCircuito(): ModificarDescargaCamionCerealesFueraCircuitoCommand {
    const command = this.mapControlsToCommand() as ModificarDescargaCamionCerealesFueraCircuitoCommand;
    command.fechaStockSan = String(this.fcService.getValue('fechaPeriodoStockSan.fechaStock'));
    return command;
  }

  aceptar() {
    if (this.fcService.isValidForm()) {
      if (!(this.fcService.getValue('datosDocumento.confirmacionArriboCtg.aceptarSinConfirmarCtg') ||
      this.fcService.getValue('datosDocumento.confirmacionArriboCtg.confirmadoManualmente'))
      && this.esCartaPorteElectronica &&
      !this.esAutomatica && !this.confirmoCtg) {
      this.popupService.error(Resources.Messages.DebeSeleccionarAlMenosUnCheck);
      return;
    }
      if (!this.esFueraCircuito) {
        const command = this.mapControlsToCommand();
        this.modificarDescargaCamionCerealesService.modificarFueraPuesto(command).pipe(takeUntil(this.onDestroy))
          .subscribe(() => {
            this.successfulResult();
          });
        const commandBA = this.mapControlsToCommandBA();
        this.modificarDescargaCamionCerealesService.modificarFueraPuestoBA(commandBA).pipe(takeUntil(this.onDestroy))
          .subscribe(() => {
            this.successfulResult();
          });
      } else {
        const command = this.mapControlsToCommandFueraCircuito();
        this.modificarDescargaCamionCerealesService.modificarFueraCircuito(command).pipe(takeUntil(this.onDestroy))
          .subscribe(() => {
            this.successfulResult();
          });
      }
    } else {
      // Valido todos los controles que no cumplen con su validacion
      const errors = new Collection<string>();
      this.fcService.validateForm(this.form.controls, errors, '');
      this.fcService.showValidationError(errors);
    }
  }

  openConsultarDatosAfip(): void {
    const ctgCtrl = this.form.get('datosDocumento.confirmacionArriboCtg.ctg');
    if (ctgCtrl && ctgCtrl.value) {
      this.showCTGData = true;
      this.consultarDatosAfip.abrir(ctgCtrl.value);
    }
  }

  closeConsultarDatosAfip(): void {
    this.showCTGData = false;
  }

  protected comportamientoAfip() {
    const codigoCancelacionCtg = this.form.get('datosDocumento.confirmacionArriboCtg.codigoCancelacionCtg');
    const numeroCEE = this.fcService.getControl('datosDocumento.numeroCEE');
    this.tipoDocumentoPorteService.consultarComportamientoAfip(this.tipoDocumentoSeleccionado.id).subscribe(IdComportamientoAfip => {
      if (IdComportamientoAfip === ComportamientoAfip.RegimenElectronico) {
        if (codigoCancelacionCtg) {
          setTimeout(() => {
            codigoCancelacionCtg.disable();
          }, 500);
        }
        this.esCartaPorteElectronica = true;
        this.evaluarConfirmacion();
      } else {
        this.esCartaPorteElectronica = false;
      }
      if (numeroCEE) {
        if (this.esCartaPorteElectronica) {
          numeroCEE.disable();
        } else {
          numeroCEE.enable();
        }
        numeroCEE.updateValueAndValidity();
      }
    });
  }

  protected evaluarConfirmacion() {
    const ctg = this.form.get('datosDocumento.confirmacionArriboCtg.ctg');
    const aceptarSinConfirmarCtg = this.form.get('datosDocumento.confirmacionArriboCtg.aceptarSinConfirmarCtg');
    const confirmadoManualmente = this.form.get('datosDocumento.confirmacionArriboCtg.confirmadoManualmente');
    const titularCartaPorte = this.fcService.getControl('datosDocumento.titularCartaPorte');
    const numeroDocumentoPorte = this.form.get('documentoPorte.numeroDocumentoPorteInf');
    const numeroDocumentoPorteSup = this.form.get('documentoPorte.numeroDocumentoPorte');
    const tipoDocumentoPorte = this.form.get('documentoPorte.tipoDocumentoPorte');

    if (aceptarSinConfirmarCtg &&
      confirmadoManualmente &&
      ctg &&
      titularCartaPorte &&
      numeroDocumentoPorte &&
      tipoDocumentoPorte &&
      numeroDocumentoPorteSup) {

      if (this.esCartaPorteElectronica) {
        tipoDocumentoPorte.disable();
      }

      if (this.movimiento &&
          (this.movimiento.confirmoCtg || this.movimiento.confirmadoManualmente || this.movimiento.consultoAfip) ||
          this.circuitoContemplaCupo) {
        titularCartaPorte.disable();
        numeroDocumentoPorte.disable();
        ctg.disable();
        setTimeout(() => {
          aceptarSinConfirmarCtg.disable();
          confirmadoManualmente.disable();
        }, 500);
      } else {
        ctg.enable();
        titularCartaPorte.enable();
        numeroDocumentoPorte.enable();
      }
      if (this.movimiento && this.esFueraCircuito) {
        ctg.enable();
        titularCartaPorte.enable();
        numeroDocumentoPorte.enable();
        numeroDocumentoPorteSup.enable();
      }
    }
  }

  onEsAfipAutomatico(esAutomatica: boolean): void {
    this.esAutomatica = esAutomatica;
  }
}

