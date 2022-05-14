import { Component, OnInit, ViewChild, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';
import { FormComponentService } from '../../../../core/services/formComponent/formComponent.service';
import { ModalComponent } from '../../../../core/components/modal/modal.component';
import { TextoConEtiquetaComponent } from '../../../../core/controls/texto-con-etiqueta/texto-con-etiqueta.component';
import { Autorizacion } from '../../autorizacion/autorizacion';
import { EntityWithDescription } from '../../../../core/models/entity-with-description';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Resources } from '../../../../../locale/artifacts/resources';
import { Collection } from '../../../../core/models/collection';
import { AutorizarcionService } from './autorizacion.service';
import { requiredIf } from '../../validators/requiredIf.validator';
import { TextAreaConEtiquetaComponent } from '../../../../core/controls/text-area-con-etiqueta/text-area-con-etiqueta.component';
import { PopupService } from '../../../../core/services/popupService/popup.service';
import { LecturaTarjetaService } from '../../services/lectura-tarjeta.service';
import { LecturaTarjetaEnAutomaticoDataView } from '../../../../shared/data-models/lectura-tarjeta-en-automatico-data-view';

@Component({
  selector: 'yrd-modal-autorizacion',
  templateUrl: './modal-autorizacion.component.html',
  styleUrls: ['./modal-autorizacion.component.css'],
  providers: [ FormComponentService ]
})
export class ModalAutorizacionComponent implements OnInit {
  @ViewChild('modalComponent') modal: ModalComponent;
  @ViewChild('usuario') usuario: TextoConEtiquetaComponent;
  @ViewChild('tarjeta') tarjeta: TextoConEtiquetaComponent;
  @ViewChild('foco') focoLecturaAutomatica: ElementRef;
  @ViewChild('observaciones') observaciones: TextAreaConEtiquetaComponent;
  @Output() autorizacionCompletada = new EventEmitter<Autorizacion[]>();

  rolesAAutorizar: EntityWithDescription[][] = [];
  rolesActual: EntityWithDescription[] = [];
  autorizaciones: Autorizacion[];
  form: FormGroup;
  puestoTrabajoUtilizaTarjeta: boolean;

  lecturaEnModoAutomatico: boolean;
  sufijo: number;
  prefijoPrimerKeycode: number;
  prefijoSegundoKeycode: number;
  tarjetaEscrita = '';
  primerPrefijoLeido: boolean;
  segundoPrefijoLeido: boolean;
  DLE_KEYCODE = 16;
  private _mostrarObservaciones = false;

  validationsUsuario = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Usuario),
  };
  validationsPassword = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Contraseña),
  };
  validationMessagesTarjeta = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Tarjeta)
  };

  get mostrarObservacionesPorLecturaAutomatica(): boolean {
    return this.puestoTrabajoUtilizaTarjeta && this.lecturaEnModoAutomatico && this._mostrarObservaciones;
  }

  set mostrarObservacionesPorLecturaAutomatica(mostrar: boolean) {
    this._mostrarObservaciones = mostrar;
  }

  get nombresRolesRequeridos(): string {
    return this.rolesActual.map(r => r.descripcion).join(' | ');
  }

  constructor(private readonly fb: FormBuilder,
              private readonly formService: FormComponentService,
              private readonly autorizarPesajeService: AutorizarcionService,
              private readonly lecturaTarjetaService: LecturaTarjetaService,
              private readonly popupService: PopupService) {
  }

  ngOnInit() {
    this.init();
    this.lecturaTarjetaService.consultarModoLecturaTarjeta()
      .subscribe((lecturaTarjetaEnAutomatico: LecturaTarjetaEnAutomaticoDataView) => {
        this.lecturaEnModoAutomatico = lecturaTarjetaEnAutomatico.esAutomatico;
        this.sufijo = lecturaTarjetaEnAutomatico.sufijoKeycode;
        this.prefijoPrimerKeycode = lecturaTarjetaEnAutomatico.prefijoPrimerKeycode;
        this.prefijoSegundoKeycode = lecturaTarjetaEnAutomatico.prefijoSegundoKeycode;
        this.puestoTrabajoUtilizaTarjeta = lecturaTarjetaEnAutomatico.puestoTrabajoUtilizaTarjeta;
      });
  }

  private init() {
    this.mostrarObservacionesPorLecturaAutomatica = false;
    this.form = this.fb.group({
      usuario: [{ value: null, disabled: false }, requiredIf(!this.puestoTrabajoUtilizaTarjeta)],
      password: [{ value: null, disabled: false }, requiredIf(!this.puestoTrabajoUtilizaTarjeta)],
      codigoTarjeta: [{ value: null, disabled: false }, requiredIf(this.puestoTrabajoUtilizaTarjeta)],
      observacion: ''
    });
    this.formService.initialize(this.form);
  }

  private autorizar(roles?: EntityWithDescription[]) {
    if (roles) {
      this.rolesActual = roles;
      this.form.reset();
      this.init();
      this.modal.open();
      this.setFocus();
    } else {
      this.devolverAutorizaciones();
    }
  }

  setFocus() {
    setTimeout(() => {
      if (this.puestoTrabajoUtilizaTarjeta) {
        if (this.lecturaEnModoAutomatico) {
          this.focoLecturaAutomatica.nativeElement.focus();
        } else {
          this.tarjeta.setFocus();
        }
      } else if (this.usuario) {
        this.usuario.setFocus();
      }
    }, 0);
  }

  aceptar() {
    if (this.formService.isValidForm()) {
      this.autorizarPesajeService.autorizar(this.form.value.usuario,
                                            this.form.value.password,
                                            this.form.value.codigoTarjeta,
                                            this.rolesActual.map(r => r.id))
      .subscribe((value: { idUsuario: number; idRol: number; }) => {
        const autorizacion = this.construirAutorizacion(value.idUsuario, value.idRol, this.form.value.observacion);
        this.autorizaciones.push(autorizacion);
        this.mostrarObservacionesPorLecturaAutomatica = false;
        this.limpiarTarjetaEscrita();
        this.autorizar(this.rolesAAutorizar.pop());
      }, () => {
        this.mostrarObservacionesPorLecturaAutomatica = false;
        this.limpiarTarjetaEscrita();
      });
    } else {
      const errors = new Collection<string>();
      this.formService.validateForm(this.form.controls, errors, '');
      this.formService.showValidationError(errors);
    }
  }

  private limpiarTarjetaEscrita() {
    this.tarjetaEscrita = '';
    this.primerPrefijoLeido = false;
    this.segundoPrefijoLeido = false;
  }

  private construirAutorizacion(idUsuario: number, idRol: number, observacion: string) {
    const autorizacion = new Autorizacion();
    autorizacion.idRol = idRol;
    autorizacion.idUsuario = idUsuario;
    autorizacion.observacion = observacion;
    return autorizacion;
  }

  cancelar() {
    this.devolverAutorizaciones();
  }

  private devolverAutorizaciones() {
    this.modal.close();
    this.autorizacionCompletada.emit(this.autorizaciones);
  }

  autorizarRoles(roles: EntityWithDescription[][]): void {
    this.autorizaciones = [];
    this.rolesAAutorizar = roles;
    if (this.rolesAAutorizar.length !== 0) {
      this.autorizar(this.rolesAAutorizar.pop());
    }
  }

  @HostListener(':keydown', ['$event'])
  onkeydown(event: KeyboardEvent) {
    if (this.puestoTrabajoUtilizaTarjeta && this.lecturaEnModoAutomatico && !this.mostrarObservacionesPorLecturaAutomatica) {
      // tslint:disable:deprecation
      const keycode = event.keyCode || event.which;

      if (keycode === 13) {
        event.preventDefault();
        event.stopPropagation();
        event.cancelBubble = true;
      } else {
        // Se ignora el Data Link Escape ya que LDC tiene dos DLE antes de cada prefijo
        if (keycode !== this.DLE_KEYCODE) {
          if (keycode === this.sufijo) {
            if (this.tarjetaEscrita) {
              this.formService.setValue('codigoTarjeta', this.tarjetaEscrita.replace('undefined', ''), {onlySelf: true}, false);
              this.mostrarObservacionesPorLecturaAutomatica = true;
              setTimeout(() => this.observaciones.setFocus(), 0);
            } else {
              this.popupService.error(Resources.Messages.TarjetaInvalidaIntenteNuevamente);
              this.limpiarTarjetaEscrita();
            }
          } else if (keycode === this.prefijoPrimerKeycode && !this.primerPrefijoLeido) {
            this.primerPrefijoLeido = true;
          } else if (keycode === this.prefijoSegundoKeycode && this.primerPrefijoLeido && !this.segundoPrefijoLeido) {
            this.segundoPrefijoLeido = true;
          } else if (this.primerPrefijoLeido && this.segundoPrefijoLeido) {
            this.tarjetaEscrita += event.key;
          }
        }
      }
    }
  }
}
