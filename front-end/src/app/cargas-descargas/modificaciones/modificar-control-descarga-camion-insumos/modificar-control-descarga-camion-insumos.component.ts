import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';

import { DocumentoPorteComponent } from '../../shared/documento-porte/documento-porte.component';
import { CircuitoComponent } from '../../shared/circuito/circuito.component';
import { DatosDocumentoInsumosComponent } from '../../controlar-descarga-camion-insumos/datos-documento-insumos/datos-documento-insumos.component';
import { PopupService } from '../../../core/services/popupService/popup.service';
import { CircuitoService } from '../../shared/services/circuito.service';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { NavigationService } from '../../../core/services/navigationService/navigation.service';
import { MovimientoService } from '../../shared/services/movimiento.service';
import { AuthService } from '../../../core/services/session/auth.service';
import { DescargaEventsNotifierService } from '../../shared/services/descarga-events-notifier.service';
import { CommandService } from '../../../shared/command-service/command.service';
import { ModificarDescargasBaseComponent } from '../../shared/modificar-descargas-base/modificar-descargas-base.component';
import { EntitiesTiposProducto, tiposProducto } from '../../../shared/data-models/tipo-producto';
import { Actividades, TiposTransporte, TiposMovimiento, TiposProducto } from '../../../shared/enums/enums';
import { Collection } from '../../../core/models/collection';
import { tiposMovimientos } from '../../../shared/data-models/tipo-movimiento';
import { tiposTransportes } from '../../../shared/data-models/tipo-transporte';
import { Circuito } from '../../../shared/data-models/circuito/circuito';
import { Movimiento } from '../../../shared/data-models/movimiento';
import { ControlarDescargaCamionInsumosFueraDePuestoCommand } from '../../../shared/data-models/commands/cargas-descargas/controlar-descarga-camion-insumos-fuera-de-puesto-command';
import { ControlarDescargaCamionInsumosFueraDeCircuitoCommand } from '../../../shared/data-models/commands/cargas-descargas/controlar-descarga-camion-insumos-fuera-de-circuito-command';
import { ModificarControlDescargaCamionInsumosService } from './modificar-control-descarga-camion-insumos.service';
import { fechaDebeSerMenorIgualAFechaDelDia } from '../../shared/validators/fecha.validator';
import { ControlarDescargaCamionVarioFueraDePuestoCommand } from '../../../shared/data-models/commands/cargas-descargas/controlar-descarga-camion-vario-fuera-de-puesto-command';
import { DatosDocumentoTransportesVariosComponent } from '../../controlar-descarga-camion-insumos/datos-documento-transportes-varios/datos-documento-transportes-varios.component';
import { ModificarDescargaInsumosFueraPuestoBACommand } from './modificar-descarga-camion-insumos-fuera-puesto-ba-command';

@Component({
  selector: 'yrd-modificar-control-descarga-camion-insumos',
  templateUrl: './modificar-control-descarga-camion-insumos.component.html',
  styleUrls: ['./modificar-control-descarga-camion-insumos.component.css']
})
export class ModificarControlDescargaCamionInsumosComponent extends ModificarDescargasBaseComponent implements OnInit {

  @ViewChild('documentoPorte') documentoPorte: DocumentoPorteComponent;
  @ViewChild('circuito') circuitoComponent: CircuitoComponent;
  @ViewChild('datosDocumentoInsumos') datosDocumentoInsumos: DatosDocumentoInsumosComponent;
  @ViewChild('datosDocumentoVarios') datosDocumentoVarios: DatosDocumentoTransportesVariosComponent;

  get esVarios(): boolean {
    return this.tipoProductoSeleccionada.id === TiposProducto.Varios;
  }

  constructor(private readonly hotkeysService: HotkeysService,
              private readonly modificarControlDescargaCamionInsumosService: ModificarControlDescargaCamionInsumosService,
              popupService: PopupService,
              private readonly fb: FormBuilder,
              circuitoService: CircuitoService,
              fcService: FormComponentService,
              navigationService: NavigationService,
              movimientoService: MovimientoService,
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
    this.ControlPath = 'ModificarControlDescargaCamionInsumos';
    this.esModificacion = true;
    this.tipoProductoSeleccionada = EntitiesTiposProducto.Insumos;
    if (!this.esFueraCircuito) {
      this.idActividad = Actividades.ModificarControlFueraPuesto;
    } else {
      this.idActividad = Actividades.ModificarControlFueraCircuito;
    }
  }

  protected getCircuito() {
    const idTipoMovimiento = TiposMovimiento.Descarga;
    const idTipoTransporte = TiposTransporte.Camion;
    const idTipoProducto = this.tipoProductoSeleccionada.id;
    const idActividad = this.idActividad;

    this.circuitoService.getCircuito(idTipoMovimiento, idTipoTransporte, idTipoProducto, [idActividad])
      .pipe(takeUntil(this.onDestroy))
      .subscribe(datos => {
        this.circuito = new Circuito();
        Object.assign(this.circuito, datos);
    });
  }

  aceptar() {
    if (this.fcService.isValidForm()) {
      if (!this.esFueraCircuito) {
        const command = this.mapControlsToCommand();
        this.modificarControlDescargaCamionInsumosService.ModificarFueraDePuesto(command, this.esVarios).pipe(takeUntil(this.onDestroy))
        .subscribe(() => {
          this.successfulResult();
        });
        const commandBA = this.mapControlsToCommandBA();
        this.modificarControlDescargaCamionInsumosService.ModificarFueraDePuestoBA(commandBA).pipe(takeUntil(this.onDestroy))
        .subscribe(() => {
            this.successfulResult();
        });
      } else {
        const command = this.mapControlsToCommandFueraCircuito();
        this.modificarControlDescargaCamionInsumosService.ModificarFueraCircuito(command, this.esVarios).pipe(takeUntil(this.onDestroy))
        .subscribe(() => {
          this.successfulResult();
        });
      }
     } else {
       const errors = new Collection<string>();
       this.fcService.validateForm(this.form.controls, errors, '');
       this.fcService.showValidationError(errors);
    }
  }

  mapControlsToCommand(): ControlarDescargaCamionInsumosFueraDePuestoCommand {
      const idCircuito = this.circuito.id;
      const idTipoDocumentoPorte = Number(this.fcService.getValue('documentoPorte.tipoDocumentoPorte'));
      const numeroCartaPorte = this.fcService.getValue('documentoPorte.numeroDocumentoPorte').replace(/ /g, '');

      this.fcService.setValue('documentoPorte.numeroDocumentoPorte', numeroCartaPorte, {onlySelf: true});
      this.setMascara();

      const command = new ControlarDescargaCamionInsumosFueraDePuestoCommand(idCircuito, idTipoDocumentoPorte, numeroCartaPorte);

      command.id = this.idMovimiento;
      command.esModificacion = this.esModificacion;

      if (this.esVarios) {
        this.mapControlDatosDocumentoVariosToCommand(command);
      } else {
        this.mapControlDatosDocumentoInsumosToCommand(command);
      }

      return command;
    }

    private mapControlsToCommandBA(): ModificarDescargaInsumosFueraPuestoBACommand {
      const matriculaNueva = String(this.fcService.getValue('datosDocumento.patentes').patenteCamion);
      const matriculaOriginal = String(this.fcService.getValue('datosDocumento.patentes').patenteCamionOriginal);
      console.log(this.fcService.getValue('datosDocumento.patentes'));

      const tarjeta = String(this.fcService.getValue('datosDocumento.tarjeta'));

      const commandBA = new ModificarDescargaInsumosFueraPuestoBACommand();
      commandBA.matriculaNueva = matriculaNueva;
      commandBA.matriculaOriginal = matriculaOriginal;
      commandBA.tarjeta = tarjeta;

      return commandBA;
    }

  mapControlDatosDocumentoVariosToCommand(command: ControlarDescargaCamionVarioFueraDePuestoCommand): void {

    command.numeroTarjeta = this.fcService.getValue('datosDocumento.tarjeta');
    command.patenteCamion = this.fcService.getValue('datosDocumento.patentes.patenteCamion');
    command.idProducto = this.fcService.getValue('datosDocumento.producto');
    command.kgBruto = this.fcService.getValue('datosDocumento.kilosBrutosTaraGroup.kilosBruto');
    command.kgTara = this.fcService.getValue('datosDocumento.kilosBrutosTaraGroup.kilosTara');
    command.patenteAcoplado = this.fcService.getValue('datosDocumento.patentes.patenteAcoplado');
    command.observaciones = this.fcService.getValue('datosDocumento.observaciones');
    command.idVendedor = this.fcService.getValue('datosDocumento.vendedor');
    if (this.esVarios) {
      command.version = this.datosDocumentoVarios.movimiento.version;
    } else {
      command.version = this.datosDocumentoInsumos.movimiento.version;
    }
  }

  mapControlDatosDocumentoInsumosToCommand(command: ControlarDescargaCamionInsumosFueraDePuestoCommand): void {
    this.mapControlDatosDocumentoVariosToCommand(command);
    command.idDestinatario = this.fcService.getValue('datosDocumento.destinatario');
    command.idFinalidad = this.fcService.getValue('datosDocumento.finalidad');
    command.idSedeVendedor = this.fcService.getValue('datosDocumento.sedeVendedor');
    command.idSedeDestinatario = this.fcService.getValue('datosDocumento.sedeDestinatario');
    command.idProcedencia = this.fcService.getValue('datosDocumento.procedencia');

    const transportista = this.fcService.getControl('datosDocumento.transportista');
    if (transportista) {
      command.idTransportista = transportista.value.id;
      command.codigoFiscalTransportista = transportista.value.codigoFiscal;
    }
  }

  private mapControlsToCommandFueraCircuito(): ControlarDescargaCamionInsumosFueraDeCircuitoCommand {
    const command = this.mapControlsToCommand() as ControlarDescargaCamionInsumosFueraDeCircuitoCommand;
    command.fechaStockSan    = String(this.fcService.getValue('fechaPeriodoStockSan.fechaStock'));

    return command;
  }


  mapHotkeys() {
    const mapHotkey = (dropdown: string, callback: () => void) => {
      const hotkey = new Hotkey(dropdown, (): boolean => {
        callback();
        return false;
      });

      hotkey.allowIn = ['input', 'select'];

      this.hotkeysService.add(hotkey);
    };

    mapHotkey('ctrl+4', () => this.aceptarContinuar());
    mapHotkey('f8', () => this.aceptar());
    mapHotkey('f9', () => this.cancelar());
  }

  protected createForm() {
    this.form = this.fb.group({
      circuito: this.fb.group({
        terminal: { value: this.terminal.descripcion, disabled: true },
        tipoMovimiento: { value: tiposMovimientos[1].descripcion, disabled: true },
        tipoTransporte: { value: tiposTransportes[0].descripcion, disabled: true },
        tipoProducto: { value: this.tipoProductoSeleccionada.descripcion, disabled: true }
      }),
      fechaPeriodoStockSan: this.fb.group({
        fechaStock: { value: undefined, disabled: false }
      }),
      documentoPorte: this.fb.group({
        tipoDocumentoPorte: [{ value: '', disabled: false }, Validators.required],
        numeroDocumentoPorte: [{ value: this.nroDocModificado, disabled: false }, {
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

    const neto = this.form.get('datosDocumento.kilosNeto');
    if (neto) {
      neto.disable();
    }
    this.mapHotkeys();
    this.documentoPorte.setFocus();
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
          this.idMovimiento = params['idMovimiento'];

          const tipoTransporteEnviadoPorNavegacion = tiposTransportes.find(t => t.id === +params['idTipoTransporte']);
          if (tipoTransporteEnviadoPorNavegacion) {
            this.tipoTransporte = tipoTransporteEnviadoPorNavegacion;
          }

          if (params['idTipoProducto']) {
            const tipoProductoEnviadoPorNavegacion = tiposProducto.find(p => p.id === Number(params['idTipoProducto']));
            if (tipoProductoEnviadoPorNavegacion) {
              this.tipoProductoSeleccionada = tipoProductoEnviadoPorNavegacion;
            }
          }

          this.fcService.setValue('circuito.tipoProducto', this.tipoProductoSeleccionada.descripcion, { onlySelf: true }, true);

          if (!this.esFueraCircuito) {
            this.idActividad = Actividades.ModificarControlFueraPuesto;
          } else {
            this.idActividad = Actividades.ModificarControlFueraCircuito;
            const fechaStockSan = this.form.get('fechaPeriodoStockSan.fechaStock');
            if (fechaStockSan) {
              fechaStockSan.setValidators(Validators.required);
              fechaStockSan.setValidators( fechaDebeSerMenorIgualAFechaDelDia());
            }
          }
          this.buscarMovimiento();
        }
      });
  }

  protected loadMovimiento(movimiento: Movimiento) {

    this.fcService.setValue(`documentoPorte.numeroDocumentoPorte`, movimiento.nroDocumentoPorte, {onlySelf: true}, this.esConsulta);
    const fecha = movimiento.fechaStockSan ? new Date(movimiento.fechaStockSan).toLocalISOString().substring(0, 10) : '';
    this.fcService.setValue(`fechaPeriodoStockSan.fechaStock`, fecha, {onlySelf: true}, false);
    this.fcService.setValue(`datosDocumento.estado`, movimiento.estado.descripcion, {onlySelf: true}, true);
    this.fcService.setValue(`documentoPorte.tipoDocumentoPorte`, movimiento.tipoDocumentoPorte, {onlySelf: true}, !this.esFueraCircuito);
    this.fcService.setValue('documentoPorte.fechaEntrada', movimiento.fechaEntrada, {onlySelf: true});
    this.fcService.setValue('documentoPorte.fechaSalida', movimiento.fechaSalida, {onlySelf: true});
    this.fcService.setValue('documentoPorte.fechaOperacion', movimiento.fechaOperacion, {onlySelf: true});

    setTimeout(() => {
      this.eventsNotifierService.onMovimientoRetrieved(movimiento);
    }, 0);
  }

}
