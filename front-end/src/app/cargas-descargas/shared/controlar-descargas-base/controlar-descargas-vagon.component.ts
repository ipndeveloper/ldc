import { ControlarDescargasBaseComponent } from './controlar-descargas-base.component';
import { ViewChild } from '@angular/core';
import { DocumentoPorteComponent } from '../documento-porte/documento-porte.component';
import { ModalAutorizacionComponent } from '../modals/modal-autorizacion/modal-autorizacion.component';
import { ModalAsignarTarjetaComponent } from '../modals/modal-asignar-tarjeta/modal-asignar-tarjeta.component';
import { Terminal } from '../../../shared/data-models/terminal';
import { Autorizacion } from '../autorizacion/autorizacion';
import { EntityWithDescription } from '../../../core/models/entity-with-description';
import { FormBuilder, Validators } from '@angular/forms';
import { CircuitoService } from '../services/circuito.service';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { NavigationService } from '../../../core/services/navigationService/navigation.service';
import { MovimientoService } from '../services/movimiento.service';
import { MovimientoCerealGrano } from '../../../shared/data-models/movimiento-cereal-grano';
import { AuthService } from '../../../core/services/session/auth.service';
import { DescargaEventsNotifierService } from '../services/descarga-events-notifier.service';
import { Caracteristicas, TiposProducto } from '../../../shared/enums/enums';
import { tiposMovimientos } from '../../../shared/data-models/tipo-movimiento';
import { Circuito } from '../../../shared/data-models/circuito/circuito';
import { Resources } from '../../../../locale/artifacts/resources';
import { HttpErrorResponse } from '@angular/common/http';
import { Collection } from '../../../core/models/collection';
import { PopupService } from '../../../core/services/popupService/popup.service';
import { CommandService } from '../../../shared/command-service/command.service';
import * as HttpStatus from 'http-status-codes';

export abstract class ControlarDescargaVagonComponent extends ControlarDescargasBaseComponent {

  @ViewChild('documentoPorte') documentoPorte: DocumentoPorteComponent;
  @ViewChild('modalAutorizacion') modalAutorizacion: ModalAutorizacionComponent;
  @ViewChild('modalAsignarTarjeta') modalAsignarTarjeta: ModalAsignarTarjetaComponent;
  terminal: Terminal;
  nroDocModificado = '';
  recuperoDocumentoPorte = false;
  completarTipoProducto = true;
  protected fillCampoEpa = false;
  botonesDeshabilitados = false;
  cargaNuevoVagon = false;
  autorizaciones: Autorizacion[];
  rolesAAutorizar: EntityWithDescription[][];
  mensaje: string;

  get verBotonAceptarModificacion(): boolean {
    return this.esNavegacion && !this.esConsulta;
  }

  get esModificacionVagon(): boolean {
    return this.esModificacionDocPorte || this.esModificarControlFueraPuesto;
  }


  constructor(popupService: PopupService,
    protected readonly fb: FormBuilder,
    circuitoService: CircuitoService,
    fcService: FormComponentService,
    navigationService: NavigationService,
    movimientoService: MovimientoService<MovimientoCerealGrano>,
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
  }

  protected createForm() {
    this.form = this.fb.group({
      circuito: this.fb.group({
        terminal: { value: this.terminal.descripcion, disabled: true },
        tipoMovimiento: { value: 'Descarga', disabled: true },
        tipoTransporte: { value: 'Vagón', disabled: true },
        tipoProducto: { value: this.tipoProductoSeleccionada.descripcion, disabled: true }
      }),

      documentoPorte: this.fb.group({
        tipoDocumentoPorte: ['', Validators.required],
        numeroDocumentoPorte: [{ value: this.nroDocModificado, disabled: this.esConsulta || this.esModificacionDocPorte }, {
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
      })
    });
    this.documentoPorte.setFocus();
    this.autorizaciones = [];
  }

  protected getCircuito() {
    const idTipoMovimiento = tiposMovimientos[1].id;
    const idTipoTransporte = this.tipoTransporte.id;
    const idTipoProducto = this.tipoProductoSeleccionada.id; // TODO: Llamar a los identifiers
    const idActividad = this.idActividad;

    this.circuitoService.getCircuito(idTipoMovimiento, idTipoTransporte, idTipoProducto, [idActividad])
      .subscribe(datos => {
        this.circuito = new Circuito();
        Object.assign(this.circuito, datos);
      }, (error: HttpErrorResponse) => {
        if (error.status === HttpStatus.NOT_FOUND) {
          this.popupService.error(Resources.Messages.ElCircuitoSeEncuentraDeshabilitadoONoExistePorFavorReviseLaParametrizacion,
                                  Resources.Labels.Error,
                                  {timeOut: 10000});
        }
      });
  }

  //#endregion

  //#region Busqueda Movimiento

  protected loadMovimiento(movimiento: MovimientoCerealGrano) {
    this.fcService.setValue(`documentoPorte.numeroDocumentoPorte`,  movimiento.nroDocumentoPorte, { onlySelf: true },
      this.esConsulta || !this.esModificacionDocPorte);
    this.fcService.setValue(`documentoPorte.tipoDocumentoPorte`, movimiento.tipoDocumentoPorte, { onlySelf: true }, true);

    if (movimiento.codigoTrazabilidadGrano && movimiento.codigoTrazabilidadGrano > 0) {
      this.fcService.setValue('documentoPorte.ctg', movimiento.codigoTrazabilidadGrano, { onlySelf: true},
      this.esConsulta || !this.esModificacionDocPorte);
    }
    this.eventsNotifierService.onMovimientoRetrieved(movimiento);
  }

  recuperarDocPorte() {
    const numeroDocumentoPorteCtrl = this.fcService.getControl('documentoPorte.numeroDocumentoPorte');
    if (numeroDocumentoPorteCtrl && numeroDocumentoPorteCtrl.valid && numeroDocumentoPorteCtrl.value) {
      this.recuperoDocumentoPorte = true;
      const numeroDocumentoPorte = numeroDocumentoPorteCtrl.value.replace(/[-]/, '');
      this.buscarMovimientoPorDocPorte(numeroDocumentoPorte);
    } else {
      const messageErrors = Resources.Messages.VerificarLosDatosIngresados;
      this.popupService.error(messageErrors, Resources.Messages.ErrorValidacion, { enableHtml: true });
    }
  }

  //#endregion

  protected abstract getErroresOperadoresOncca();

  private verificarOperadoresOncca(): Promise<boolean> {
    const mensajeError = this.getErroresOperadoresOncca();
    if (mensajeError) {
      return this.popupService.confirm(mensajeError);
    } else {
      return Promise.resolve(true);
    }
  }

  protected prepareForm() {
    this.resetDatosVagon();
  }

  protected resetDatosVagon() {
    const datosVagon = this.form.get('datosDocumento.datosVagon');
    const tarjeta = this.form.get('datosDocumento.datosVagon.tarjeta');
    const neto = this.form.get('datosDocumento.datosVagon.kilosNeto');
    if (datosVagon && tarjeta && neto) {
      datosVagon.enable();
      tarjeta.disable();
      neto.disable();
      datosVagon.reset();
    }
  }

  aceptarYNuevoVagon() {
    this.cargaNuevoVagon = true;
    this.abrirModalTarjeta();
  }

  aceptarYNuevoDocPorte() {
    this.cargaNuevoVagon = false;
    this.abrirModalTarjeta();
  }

  abrirModalTarjeta() {
    const numeroTarjeta = this.fcService.getValue('datosDocumento.datosVagon.tarjeta');
    if (this.circuito.debeActivarCaracteristica([Caracteristicas.AsignarTarjetaControlDescarga]) &&
      !numeroTarjeta &&
      this.terminal.utilizaTarjeta) {
      this.modalAsignarTarjeta.abrir();
    } else {
      this.aceptar();
    }
  }

  protected abstract mapControlsToCommand();
  protected abstract Registrar(command);

  private mensajePorTipoProducto() {
    if (this.tipoProductoSeleccionada.id === TiposProducto.Cereal) {
      this.mensaje = Resources.Messages.DescargaCerealesGuardada;
    } else if (this.tipoProductoSeleccionada.id === TiposProducto.NoGranos) {
      this.mensaje = Resources.Messages.DescargaNoGranoGuardada;
    } else {
      this.mensaje = Resources.Messages.DescargaSubproductosGuardada;
    }
    this.popupService.success(this.mensaje, Resources.Labels.Aceptar);
  }

  aceptar() {
    if (this.fcService.isValidForm() && this.verificarFechaVencimiento(this.esModificacionVagon)) {
      const command = this.mapControlsToCommand();
      this.verificarOperadoresOncca().then(confirmo => {
        if (confirmo) {
          this.botonesDeshabilitados = true;
          this.Registrar(command).subscribe(() => {
            this.botonesDeshabilitados = false;
            this.mensajePorTipoProducto();
            this.navigateToPathAnterior();
          },
            (error: HttpErrorResponse) => {
              this.verificarFinalizoCargaNuevoVagon();
              this.botonesDeshabilitados = false;
              if (error.error && error.error.data && error.error.data.validationData) {
                const numeroTarjeta = this.fcService.getValue('datosDocumento.datosVagon.tarjeta');
                if (numeroTarjeta && error.error.data.validationData[numeroTarjeta]) {
                  this.fcService.setValue(`datosDocumento.datosVagon.tarjeta`, '', { onlySelf: true });
                } else {
                  this.mapearRoles(error.error.data.validationData);
                  this.modalAutorizacion.autorizarRoles(this.rolesAAutorizar.slice());
                }
              }
              this.mensajesValidacionesHijo(error);
            });
        }
      });
    } else {
      this.verificarFinalizoCargaNuevoVagon();
      // Valido todos los controles que no cumplen con su validacion
      const errors = new Collection<string>();
      this.fcService.validateForm(this.form.controls, errors, '');
      this.fcService.showValidationError(errors);
    }
  }

  private verificarFinalizoCargaNuevoVagon(): void {
    if (this.form.controls.datosDocumento.enabled) {
      this.cargaNuevoVagon = false;
    }
  }

  private navigateToPathAnterior() {
    if (this.esNavegacion) {
      setTimeout(() => {
        this.navigationService.navigateBack();
      }, 1500);
    } else {
      if (this.cargaNuevoVagon) {
        this.fcService.disableControl('datosDocumento');
        this.fcService.disableControl('documentoPorte');
        this.resetDatosVagon();
      } else {
        this.recuperoDocumentoPorte = false;
        this.cargaNuevoVagon = false;
        this.resetForm();
      }
    }
  }

  protected resetForm() {
    setTimeout(() => {
      this.resetDatosVagon();
    }, 500);
    this.recuperoDocumentoPorte = false;
    this.cargaNuevoVagon = false;
    super.resetForm();
  }

  private mapearRoles(roles: any[]) {
    const rolesEntrada: EntityWithDescription[] = [];
    const rolesSalida: EntityWithDescription[] = [];

    for (const key in roles) {
      if (roles.hasOwnProperty(key)) {
        if (roles[key].orden === 1) {
          rolesEntrada.push(new EntityWithDescription(+key, roles[key].nombre));
        } else {
          rolesSalida.push(new EntityWithDescription(+key, roles[key].nombre));
        }
      }
    }

    this.rolesAAutorizar = [];
    if (rolesSalida.length) {
      this.rolesAAutorizar.push(rolesSalida);
    }
    if (rolesEntrada.length) {
      this.rolesAAutorizar.push(rolesEntrada);
    }
  }

  onAutorizacionCompletada(autorizaciones: Autorizacion[]) {
    this.autorizaciones = this.autorizaciones.concat(autorizaciones);
    if (this.autorizaciones && this.rolesAAutorizar.every(r => this.autorizaciones.some(a => r.some(rol => rol.id === a.idRol)))) {
      this.aceptar();
    }
  }

  onTarjetaAsignada() {
    this.fcService.setValue(`datosDocumento.datosVagon.tarjeta`,
      this.modalAsignarTarjeta.asignarTarjetaForm.controls.numeroTarjeta.value,
      { onlySelf: true });
    this.aceptar();
  }

  protected mensajesValidacionesHijo(_error: HttpErrorResponse): void {}

}
