import { ModificarDescargasBaseComponent } from './modificar-descargas-base.component';
import { ViewChild, AfterViewInit } from '@angular/core';
import { DocumentoPorteComponent } from '../documento-porte/documento-porte.component';
import { Circuito } from '../../../shared/data-models/circuito/circuito';
import { CircuitoService } from '../services/circuito.service';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { NavigationService } from '../../../core/services/navigationService/navigation.service';
import { MovimientoService } from '../services/movimiento.service';
import { AuthService } from '../../../core/services/session/auth.service';
import { DescargaEventsNotifierService } from '../services/descarga-events-notifier.service';
import { Actividades } from '../../../shared/enums/enums';
import { takeUntil } from 'rxjs/operators';
import { Collection } from '../../../core/models/collection';
import { PopupService } from '../../../core/services/popupService/popup.service';
import { Movimiento } from '../../../shared/data-models/movimiento';
import { ILoadMovimiento } from '../datos-documento-base/load-movimiento.interface';
import { IModificarFueraCircuito } from './modificar-fuera-circuito.interface';
import { ModificarDescargaCamionCerealesFueraCircuitoCommand } from '../../modificaciones/modificar-control-descarga-camion-cereales/modificar-descarga-camion-cereales-fuera-circuito-command';
import { ModificarDescargaCamionSubproductosFueraCircuitoCommand } from '../../modificaciones/modificar-control-descarga-camion-subproductos-nogranos/modificar-descarga-camion-subproductos-fuera-circuito-command';
import { Validators, FormBuilder } from '@angular/forms';
import { fechaDebeSerMenorIgualAFechaDelDia } from '../validators/fecha.validator';
import { IMapDatosDocumentoToCommand } from './map-datos-documento-to-command.interface';
import { CommandService } from '../../../shared/command-service/command.service';
import { tiposTransportes } from '../../../shared/data-models/tipo-transporte';

export abstract class ModificarDescargasVagonBaseComponent<TMovimiento extends Movimiento,
                                                           TService extends IModificarFueraCircuito<TCommand> &
                                                                            IMapDatosDocumentoToCommand<TCommand>,
                                                           TDatosComponent extends ILoadMovimiento<TMovimiento>,
                                                           TCommand extends ModificarDescargaCamionCerealesFueraCircuitoCommand |
                                                                            ModificarDescargaCamionSubproductosFueraCircuitoCommand>
  extends ModificarDescargasBaseComponent
  implements AfterViewInit {

  @ViewChild('documentoPorte') documentoPorte: DocumentoPorteComponent;
  @ViewChild('datosDocumento') datosDocumento: TDatosComponent;
  debeDeshabilitarControlesPorMovimientoAplicadoEnSan: boolean;
  circuito: Circuito;

  constructor(private readonly commandType: new (idCircuito: number,
                                                 idTipoDocumentoPorte: number,
                                                 numeroDocumentoPorte: string) => TCommand,
              popupService: PopupService,
              circuitoService: CircuitoService,
              fcService: FormComponentService,
              protected readonly service: TService,
              navigationService: NavigationService,
              movimientoService: MovimientoService<TMovimiento>,
              authService: AuthService,
              eventsNotifierService: DescargaEventsNotifierService,
              private readonly fb: FormBuilder,
              protected readonly commandService: CommandService) {
    super(popupService,
          navigationService,
          movimientoService,
          circuitoService,
          fcService,
          authService,
          eventsNotifierService,
          commandService);
    this.idActividad = Actividades.ModificarControlFueraCircuito;
    this.esModificacion = true;
    this.esFueraCircuito = true;
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
        tipoTransporte: { value: 'Vagón', disabled: true },
        tipoProducto: { value: this.tipoProductoSeleccionada.descripcion, disabled: true }
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
        ctg: [{ value: '', disabled: true},
        { validators: [ Validators.compose([Validators.required,
                                            Validators.minLength(11)])]}]
      }),
    });
  }

  protected loadMovimiento(movimiento: TMovimiento) {
    this.circuito = movimiento.circuito;

    this.fcService.setValue(`documentoPorte.numeroDocumentoPorte`, movimiento.nroDocumentoPorte, {onlySelf: true}, false);
    this.fcService.setValue(`documentoPorte.tipoDocumentoPorte`, movimiento.tipoDocumentoPorte, { onlySelf: true }, false);
    this.fcService.setValue('datosDocumento.estadoMovimiento', movimiento.estado.descripcion, {onlySelf: true});
    this.datosDocumento.loadMovimiento(movimiento);
    const fecha = new Date(movimiento.fechaStockSan).toLocalISOString().substring(0, 10);
    this.fcService.setValue('fechaPeriodoStockSan.fechaStock', fecha, {onlySelf: true}, false);
    this.inhabilitarControl('producto');
    this.eventsNotifierService.onMovimientoRetrieved(movimiento);
    setTimeout(() => {
      this.documentoPorte.setFocus();
    }, 0);
  }

  private mapControlsCircuitoToCommand(): TCommand {
    const idCircuito                = this.circuito.id;
    const idTipoDocumentoPorte      = Number(this.fcService.getValue('documentoPorte.tipoDocumentoPorte'));
    let numeroDocumentoPorte      = String(this.fcService.getValue('documentoPorte.numeroDocumentoPorte'));

    numeroDocumentoPorte = numeroDocumentoPorte.replace(/ /g, '');
    this.fcService.setValue('documentoPorte.numeroDocumentoPorte', numeroDocumentoPorte, {onlySelf: true});
    this.setMascara();

    const command = new this.commandType(idCircuito, idTipoDocumentoPorte, numeroDocumentoPorte);

    command.id                      = this.idMovimiento;
    command.esModificacion          = this.esModificacion;
    command.esFueraCircuito         = this.esFueraCircuito;
    return command;
  }

  protected mapControlDatosDocumentoToCommand(command: TCommand): void {
    this.service.MapDatosDocumentoToCommand(this.fcService, command);
  }

  private mapControlsToCommand(): TCommand {
    const command = this.mapControlsCircuitoToCommand();
    this.mapControlDatosDocumentoToCommand(command);
    command.fechaStockSan = String(this.fcService.getValue('fechaPeriodoStockSan.fechaStock'));
    return command;
  }

  protected subscribeNavigation() {
    this.navigationService.requestExtras()
      .pipe(takeUntil(this.onDestroy))
      .subscribe((params) => {
        this.idMovimiento = params['idMovimiento'];
        this.debeDeshabilitarControlesPorMovimientoAplicadoEnSan = params['debeDeshabilitarControlesPorMovimientoAplicadoEnSan'] === 'true';

        const tipoTransporteEnviadoPorNavegacion = tiposTransportes.find(t => t.id === +params['idTipoTransporte']);
        if (tipoTransporteEnviadoPorNavegacion) {
          this.tipoTransporte = tipoTransporteEnviadoPorNavegacion;
        }

        this.buscarMovimiento();
      });
  }

  aceptar() {
    if (this.fcService.isValidForm()) {
      const command = this.mapControlsToCommand();
       this.service.ModificarFueraCircuito(command).subscribe(() => {
        this.successfulResult();
      });
    } else {
      const errors = new Collection<string>();
      this.fcService.validateForm(this.form.controls, errors, '');
      this.fcService.showValidationError(errors);
    }
  }
}
