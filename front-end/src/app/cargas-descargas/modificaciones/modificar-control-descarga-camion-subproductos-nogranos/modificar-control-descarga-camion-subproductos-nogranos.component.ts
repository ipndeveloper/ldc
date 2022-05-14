import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';

import { PopupService } from '../../../core/services/popupService/popup.service';
import { CircuitoService } from '../../shared/services/circuito.service';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { NavigationService } from '../../../core/services/navigationService/navigation.service';
import { MovimientoService } from '../../shared/services/movimiento.service';
import { AuthService } from '../../../core/services/session/auth.service';
import { MovimientoCerealSubproducto } from '../../../shared/data-models/movimiento-cereal-subproducto';
import { DatosDocumentoControlarDescargaSubproductosComponent } from '../../controlar-descarga-camion-subproductos/datos-documento-controlar-descarga-subproductos/datos-documento-controlar-descarga-subproductos.component';
import { tiposProducto } from '../../../shared/data-models/tipo-producto';
import { Actividades } from '../../../shared/enums/enums';
import { Collection } from '../../../core/models/collection';
import { ModificarDescargaCamionSubproductosFueraCircuitoCommand } from './modificar-descarga-camion-subproductos-fuera-circuito-command';
import { ModificarDescargaCamionSubproductosFueraPuestoCommand } from './modificar-descarga-camion-subproductoss-fuera-puesto-command';
import { DocumentoPorteComponent } from '../../shared/documento-porte/documento-porte.component';
import { ControlarDescargaCamionSubproductosService } from '../../controlar-descarga-camion-subproductos/controlar-descarga-camion-subproductos.service';
import { ModificarDescargasBaseComponent } from '../../shared/modificar-descargas-base/modificar-descargas-base.component';
import { DescargaEventsNotifierService } from '../../shared/services/descarga-events-notifier.service';
import { ControlarDescargaCamionSubproductosCommand } from '../../../shared/data-models/commands/cargas-descargas/controlar-descarga-camion-subproductos-command';
import { Circuito } from '../../../shared/data-models/circuito/circuito';
import { fechaDebeSerMenorIgualAFechaDelDia } from '../../shared/validators/fecha.validator';
import { CommandService } from '../../../shared/command-service/command.service';

@Component({
  selector: 'yrd-modificar-control-descarga-camion-subproductos-nogranos',
  templateUrl: './modificar-control-descarga-camion-subproductos-nogranos.component.html',
  styleUrls: ['./modificar-control-descarga-camion-subproductos-nogranos.component.css']
})
export class ModificarControlDescargaCamionSubproductosNogranosComponent
    extends ModificarDescargasBaseComponent
    implements AfterViewInit {

  @ViewChild('documentoPorte') documentoPorte: DocumentoPorteComponent;
  @ViewChild('datosDocumento') datosDocumento: DatosDocumentoControlarDescargaSubproductosComponent;
  circuito: Circuito;
  debeDeshabilitarControlesPorMovimientoAplicadoEnSan: boolean;

  constructor(popupService: PopupService, private readonly fb: FormBuilder,
    circuitoService: CircuitoService, fcService: FormComponentService,
    private readonly modificarControlDescargaCamionSubproductosNogranosService: ControlarDescargaCamionSubproductosService,
    navigationService: NavigationService, movimientoService: MovimientoService<MovimientoCerealSubproducto>,
    authService: AuthService,
    eventsNotifierService: DescargaEventsNotifierService,
    protected readonly commandService: CommandService) {
    super(popupService,
          navigationService,
          movimientoService,
          circuitoService,
          fcService,
          authService,
          eventsNotifierService,
          commandService);
    this.tipoProductoSeleccionada = tiposProducto[2];
    this.ControlPath = 'ModificarControlDescargaCamionSubProductosNoGranos';
    this.esModificacion = true;
  }

  ngAfterViewInit() {
    if (this.documentoPorte) {
      this.documentoPorte.setFocus();
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
      cupo: this.fb.group({
        conCupo: { value: false, disabled: false },
        codigoCupo: { value: '', disabled: true }
      }),
      fechaPeriodoStockSan: this.fb.group({
        fechaStock: [{ value: undefined, disabled: true }, [Validators.required, fechaDebeSerMenorIgualAFechaDelDia()]]
      }),
      documentoPorte: this.fb.group({
        tipoDocumentoPorte: ['', Validators.required],
        numeroDocumentoPorte: [{ value: this.nroDocModificado, disabled: true }, {
          validators: [
            Validators.required,
            Validators.minLength(8), // VAL01
            Validators.maxLength(12),
            Validators.pattern(/^\d+$/)
          ],
          updateOn: 'blur'
        }],
        fechaEntrada: { value: undefined, disabled: true },
        fechaSalida: { value: undefined, disabled: true },
        fechaOperacion: { value: undefined, disabled: true }
      }),
    });
  }

  protected loadMovimiento(movimiento: MovimientoCerealSubproducto) {

    this.fcService.setValue(`documentoPorte.numeroDocumentoPorte`, movimiento.nroDocumentoPorte, {onlySelf: true}, false);
    this.fcService.setValue(`documentoPorte.tipoDocumentoPorte`, movimiento.tipoDocumentoPorte, { onlySelf: true }, false);
    this.fcService.setValue(`cupo.conCupo`, movimiento.codigoCupo !== null, { onlySelf: true });
    this.fcService.setValue(`cupo.codigoCupo`, movimiento.codigoCupo, { onlySelf: true });
    this.fcService.setValue(`datosDocumento.estado`, movimiento.estado.descripcion, { onlySelf: true }, true);
    this.circuito = movimiento.circuito;
    this.datosDocumento.loadMovimiento(movimiento);
    const fecha = new Date(movimiento.fechaStockSan).toLocalISOString().substring(0, 10);
    this.fcService.setValue('datosDocumento.estadoMovimiento', movimiento.estado.descripcion, {onlySelf: true});
    if (this.esFueraCircuito) {
      this.fcService.setValue('fechaPeriodoStockSan.fechaStock', fecha, {onlySelf: true});
      this.fcService.setValue('documentoPorte.fechaEntrada', movimiento.fechaEntrada, {onlySelf: true});
      this.fcService.setValue('documentoPorte.fechaSalida', movimiento.fechaSalida, {onlySelf: true});
      this.fcService.setValue('documentoPorte.fechaOperacion', movimiento.fechaOperacion, {onlySelf: true});
      this.activarParaFueraCircuito();
    }
    this.documentoPorte.setFocus();
    this.eventsNotifierService.onMovimientoRetrieved(movimiento);
  }

  private mapControlsToCommand(): ModificarDescargaCamionSubproductosFueraPuestoCommand {
    const idCircuito                = this.circuito.id;
    const idTipoDocumentoPorte      = Number(this.fcService.getValue('documentoPorte.tipoDocumentoPorte'));
    let numeroDocumentoPorte      = String(this.fcService.getValue('documentoPorte.numeroDocumentoPorte'));

    numeroDocumentoPorte = numeroDocumentoPorte.replace(/ /g, '');
    this.fcService.setValue('documentoPorte.numeroDocumentoPorte', numeroDocumentoPorte, {onlySelf: true});
    this.setMascara();

    const command = new ModificarDescargaCamionSubproductosFueraPuestoCommand(idCircuito, idTipoDocumentoPorte, numeroDocumentoPorte);

    command.id                      = this.idMovimiento;
    command.esModificacion          = this.esModificacion;
    command.esFueraCircuito         = this.esFueraCircuito;
    command.idTipoProducto          = Number(this.fcService.getValue('circuito.tipoProducto'));

    this.mapControlDatosDocumentoToCommand(command);

    return command;
  }

  private mapControlDatosDocumentoToCommand(command: ControlarDescargaCamionSubproductosCommand): void {
    command.patenteCamion           = String(this.fcService.getValue('datosDocumento.patentes').patenteCamion);
    command.patenteAcoplado         = String(this.fcService.getValue('datosDocumento.patentes').patenteAcoplado);
    command.fechaCarga              = String(this.fcService.getValue('datosDocumento.fechaCarga'));
    command.fechaVencimiento        = String(this.fcService.getValue('datosDocumento.fechaVencimiento'));
    if (!command.esModificacion) {
      command.numeroTarjeta         = this.fcService.getValue('datosDocumento.tarjeta');
    }
    command.idProducto              = Number(this.fcService.getValue('datosDocumento.producto'));
    command.idTitular               = Number(this.fcService.getValue('datosDocumento.titular'));
    command.idVendedor              = Number(this.fcService.getValue('datosDocumento.vendedor'));
    command.idIntermediario         = Number(this.fcService.getValue('datosDocumento.intermediario'));
    command.idRemitenteComercial    = Number(this.fcService.getValue('datosDocumento.remitenteComercial'));
    command.idCorredor              = Number(this.fcService.getValue('datosDocumento.corredor'));
    command.fleteCargoLdc           = Number(this.fcService.getValue('datosDocumento.fleteCargoLdc'));
    command.idTipoPesada            = Number(this.fcService.getValue('datosDocumento.tipoPesada'));
    command.idEntregador            = Number(this.fcService.getValue('datosDocumento.entregador'));
    command.idDestinatario          = Number(this.fcService.getValue('datosDocumento.destinatario'));
    command.kgBruto                 = Number(this.fcService.getValue('datosDocumento.kilosBrutosTaraGroup.kilosBruto'));
    command.kgTara                  = Number(this.fcService.getValue('datosDocumento.kilosBrutosTaraGroup.kilosTara'));
    command.idFinalidad             = Number(this.fcService.getValue('datosDocumento.finalidad'));
    command.idProcedencia           = Number(this.fcService.getValue('datosDocumento.procedencia'));
    command.idSedeOrigen            = Number(this.fcService.getValue('datosDocumento.sedeOrigen'));
    command.idDestino               = Number(this.fcService.getValue('datosDocumento.destino'));
    command.idSedeDestino           = Number(this.fcService.getValue('datosDocumento.sedeDestino'));
    command.idCosecha               = Number(this.fcService.getValue('datosDocumento.cosecha'));
    const transportista = this.form.get('datosDocumento.transportista');
    if (transportista && transportista.value) {
      command.idTransportista = transportista.value.id ? transportista.value.id : undefined;
      command.codigoFiscalTransportista = transportista.value.codigoFiscal;
    }
    command.idChofer                = Number(this.fcService.getValue('datosDocumento.chofer'));
    command.observaciones           = this.fcService.getValue('datosDocumento.observaciones');
    command.version = this.datosDocumento.movimiento.version;
  }

  private mapControlsToCommandFueraCircuito(): ModificarDescargaCamionSubproductosFueraCircuitoCommand {
    const command = this.mapControlsToCommand() as ModificarDescargaCamionSubproductosFueraCircuitoCommand;
    command.fechaStockSan = String(this.fcService.getValue('fechaPeriodoStockSan.fechaStock'));
    return command;
  }

  private activarParaFueraCircuito() {
    const fechaStock = this.form.get('fechaPeriodoStockSan.fechaStock');
    const tipoDocumentoPorte = this.form.get('documentoPorte.tipoDocumentoPorte');
    const numeroDocumentoPorte = this.form.get('documentoPorte.numeroDocumentoPorte');
    const transportista = this.form.get('datosDocumento.transportista');
    const chofer = this.form.get('datosDocumento.chofer');
    const cupo = this.form.get('cupo');

    if (fechaStock && tipoDocumentoPorte && numeroDocumentoPorte && transportista && chofer && cupo) {
      tipoDocumentoPorte.enable();
      numeroDocumentoPorte.enable();
      fechaStock.enable();
      transportista.enable();
      chofer.enable();
      cupo.disable();
    }
    this.inhabilitarControl('producto');
  }

  protected subscribeToControlChanges() {
    super.subscribeToControlChanges();
    this.subscribeCambioConCupo();
  }

  protected subscribeNavigation() {
    this.navigationService.requestExtras()
      .pipe(
        takeUntil(this.onDestroy)
      )
      .subscribe((params) => {
        if (params['idMovimiento']) {
          this.esNavegacion = true;
          this.esFueraCircuito = params['esFueraCircuito'] === 'true';
          if (+params['idTipoProducto'] === tiposProducto[2].id) {
            this.tipoProductoSeleccionada = tiposProducto[2];
          } else {
            this.tipoProductoSeleccionada = tiposProducto[4];
          }
          this.fcService.setValue('circuito.tipoProducto', this.tipoProductoSeleccionada.descripcion, { onlySelf: true}, true);

          this.debeDeshabilitarControlesPorMovimientoAplicadoEnSan =
            params['debeDeshabilitarControlesPorMovimientoAplicadoEnSan'] === 'true';

            this.idMovimiento = params['idMovimiento'];
          if (!this.esFueraCircuito) {
            this.idActividad = Actividades.ModificarControlFueraPuesto;
          } else {
            this.idActividad = Actividades.ModificarControlFueraCircuito;
            this.activarParaFueraCircuito();
          }
          this.buscarMovimiento();
        }
      });
  }

  private subscribeCambioConCupo() {
    const conCupo = this.form.get('cupo.conCupo');

    if (conCupo) {
      conCupo.valueChanges
        .pipe(
          takeUntil(this.onDestroy)
        )
        .subscribe((value: boolean) => {
          if (value === true) {
            this.fcService.enableControl('cupo.codigoCupo');
            this.inhabilitarControl('producto');
            this.inhabilitarControl('vendedor');
            this.inhabilitarControl('finalidad');
            this.inhabilitarControl('corredorComprador');
            this.inhabilitarControl('destinatario');
          } else {
            this.fcService.setValue('cupo.codigoCupo', undefined, {onlySelf: true, emitEvent: false}, true);
            if (!this.esFueraCircuito) {
              this.habilitarControl('producto');
            }
            this.habilitarControl('vendedor');
            this.habilitarControl('finalidad');
            this.habilitarControl('corredorComprador');
            this.habilitarControl('destinatario');
          }
        });
    }
  }

  aceptar() {
    if (this.fcService.isValidForm()) {
      if (!this.esFueraCircuito) {
        const command = this.mapControlsToCommand();
        this.modificarControlDescargaCamionSubproductosNogranosService.modificarFueraPuesto(command).pipe(takeUntil(this.onDestroy))
        .subscribe(() => {
          this.successfulResult();
        });
      } else {
        const command = this.mapControlsToCommandFueraCircuito();
        this.modificarControlDescargaCamionSubproductosNogranosService.modificarFueraCircuito(command).pipe(takeUntil(this.onDestroy))
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
}
