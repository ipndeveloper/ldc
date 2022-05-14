//#region Imports
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';
import { takeUntil, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { ControlarSalidaService } from '../controlar-salida.service';
import { MovimientoControlSalida } from '../../../shared/data-models/movimiento-control-salida';
import { Resources } from '../../../../locale/artifacts/resources';
import { TiposTransporte } from '../../../shared/enums/enums';
import { TipoTransporte } from '../../../shared/data-models/tipo-transporte';
import { AuthService } from '../../../../app/core/services/session/auth.service';
import { LecturaTarjetaComponent } from '../../shared/lectura-tarjeta/lectura-tarjeta.component';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { ModalSeleccionarRemitoComponent } from '../../shared/modal-seleccionar-remito/modal-seleccionar-remito.component';
import { ModalSeleccionarRemitoDataView } from '../../../shared/data-models/modal-seleccionar-remito-data-view';
import { PopupService } from '../../../core/services/popupService/popup.service';
//#endregion

@Component({
  selector: 'yrd-busqueda-movimiento-control-salida',
  templateUrl: './busqueda-movimiento-control-salida.component.html',
  styleUrls: ['./busqueda-movimiento-control-salida.component.css'],
  providers: [ ControlarSalidaService ]
})
export class BusquedaMovimientoControlSalidaComponent implements OnInit, OnDestroy {

  @Input() busquedaMovimientoControlSalidaForm: FormGroup;
  @Input() disableButtons: boolean;
  @Output() movimientoRecuperado = new EventEmitter<MovimientoControlSalida>();
  @ViewChild('tarjeta') tarjeta: LecturaTarjetaComponent;
  @ViewChild('seleccionarRemito') modalSeleccionarRemito: ModalSeleccionarRemitoComponent;
  @ViewChild('btnBuscar') botonBuscar: ElementRef;
  botonesDeshabilitados: boolean;
  private readonly fcService: FormComponentService;
  private readonly onDestroy = new Subject();
  private readonly terminalUtilizaTarjeta: boolean;

  //#region Validaciones
  validationMessagesTarjeta = {
    required: Resources.Messages.ElCampoXEsRequeridoParaBuscar.format(Resources.Labels.Tarjeta)
  };

  validationMessagesPatenteCamion = {
    required: Resources.Messages.ElCampoXEsRequeridoParaBuscar.format(Resources.Labels.PatenteCamion)
  };

  validationMessagesNumeroVagon = {
    required: Resources.Messages.ElCampoXEsRequeridoParaBuscar.format(Resources.Labels.NumeroDeVagon)
  };

  validationMessagesEstadoMovimiento = {
    required: Resources.Messages.ElCampoXEsRequeridoParaBuscar.format(Resources.Labels.Estado)
  };
  //#endregion

  constructor(private readonly controlarSalidaService: ControlarSalidaService,
              private readonly popupService: PopupService,
              private readonly authService: AuthService) {
    const userContext = this.authService.getUserContext();
    if (userContext) {
      this.terminalUtilizaTarjeta = userContext.terminal.utilizaTarjeta;
    }
    this.fcService = new FormComponentService(this.popupService);
  }

  //#region  Ciclo de vida
  ngOnInit() {
    this.fcService.initialize(this.busquedaMovimientoControlSalidaForm);
    this.suscribirseCambiosControlBusqueda();
    this.suscribirseCambioTipoTransporte();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
  //#endregion
  limpiar() {
    this.busquedaMovimientoControlSalidaForm.reset();
    if (!this.terminalUtilizaTarjeta) { this.tarjeta.control.disable(); }
  }

  onTarjetaLeida() {
    if (this.terminalUtilizaTarjeta) {
      const tarjetaValue = this.fcService.getValue('tarjeta');
      if (tarjetaValue) {
        const patenteValue = this.fcService.getValue('patenteCamion');
        const nroVagonValue = this.fcService.getValue('numeroVagon');
        if (!patenteValue && !nroVagonValue) {
          this.fcService.setValue('tarjeta', '');
        } else {
          this.getMovimientoControlSalida();
        }
      } else {
        this.tarjeta.setFocus();
      }
    } else {
      this.getMovimientoControlSalida();
    }
  }

  get botonBuscarDeshabilitado(): boolean {
    const sinTarjetaCtrl = this.fcService.getControl('sinTarjeta');
    const sinTarjeta = sinTarjetaCtrl && sinTarjetaCtrl.value;

    return ((this.botonesDeshabilitados || this.terminalUtilizaTarjeta) && !sinTarjeta) || this.disableButtons;
  }

  private suscribirseCambiosControlBusqueda(): void {
    const tarjetaCtrl = this.fcService.getControl('tarjeta');
    const sinTarjetaCtrl = this.fcService.getControl('sinTarjeta');
    if (!this.terminalUtilizaTarjeta && sinTarjetaCtrl != null) {
      sinTarjetaCtrl.disable();
    }
    if (sinTarjetaCtrl && tarjetaCtrl) {
      sinTarjetaCtrl.valueChanges.subscribe((sinTarjeta: boolean) => {

        if (sinTarjeta || this.busquedaMovimientoControlSalidaForm.disabled) {
          tarjetaCtrl.disable();
        } else {
          tarjetaCtrl.enable();
        }

        if (sinTarjeta) {
          tarjetaCtrl.setValue('');
        }
        this.botonesDeshabilitados = this.busquedaMovimientoControlSalidaForm.disabled;

      });
    }
  }

  private suscribirseCambioTipoTransporte(): void {
    const tipoTransporteCtrl = this.fcService.getControl('tipoTransporte');
    if (tipoTransporteCtrl) {
      tipoTransporteCtrl.valueChanges
        .pipe(
          takeUntil(this.onDestroy),
          distinctUntilChanged()
        )
        .subscribe((value: TipoTransporte) => {
          const patenteCamionCtrl = this.fcService.getControl('patenteCamion');
          const numeroVagonCtrl = this.fcService.getControl('numeroVagon');
          if (!this.botonesDeshabilitados && patenteCamionCtrl && numeroVagonCtrl) {
            if (value && value.id === TiposTransporte.Tren) {
              patenteCamionCtrl.reset();
              patenteCamionCtrl.disable();
              patenteCamionCtrl.setValue('');
              numeroVagonCtrl.enable();
            } else {
              numeroVagonCtrl.reset();
              numeroVagonCtrl.disable();
              numeroVagonCtrl.setValue('');
              patenteCamionCtrl.enable();
            }
          }
        });
    }
  }

  getMovimientoControlSalida() {
    const patenteCamionControl = this.fcService.getControl('patenteCamion');
    const tarjetaControl = this.fcService.getControl('tarjeta');
    const numeroVagonControl = this.fcService.getControl('numeroVagon');

    if (patenteCamionControl && tarjetaControl && numeroVagonControl) {
      this.setValidators(patenteCamionControl, numeroVagonControl);
      this.validate(patenteCamionControl, numeroVagonControl);
      if (this.terminalUtilizaTarjeta) {
        this.setValidators(tarjetaControl);
        this.validate(tarjetaControl);
      }

      if ((numeroVagonControl.disabled || numeroVagonControl.valid) &&
          (patenteCamionControl.disabled || patenteCamionControl.valid) &&
          (tarjetaControl.disabled || tarjetaControl.valid)) {

        const idTipoTransporte = this.fcService.getValue('tipoTransporte');
        const sinTarjeta = this.fcService.getValue('sinTarjeta');
        if (idTipoTransporte !== TiposTransporte.Camion) {
          if (sinTarjeta) {
            this.controlarSalidaService.getRemitosByNroVagon(+numeroVagonControl.value).pipe(
              takeUntil(this.onDestroy)
            ).subscribe((remitos: ModalSeleccionarRemitoDataView[]) => {
              if (remitos && remitos.length !== 0) {
                if (remitos.length === 1) {
                  this.onRemitoSeleccionado(remitos[0]);
                } else {
                  this.modalSeleccionarRemito.open(remitos);
                }
              } else {
                this.movimientoRecuperado.emit();
              }
            });
          } else {
            this.obtenerMovimiento(undefined);
          }
        } else {
          this.obtenerMovimiento(undefined);
        }
      }

      this.clearValidators(patenteCamionControl as FormControl, tarjetaControl as FormControl);
    }
  }

  private setValidators(...controls: AbstractControl[]) {
    controls.forEach((item: AbstractControl) => {
      item.setValidators(Validators.required);
    });
  }

  private validate(...controls: AbstractControl[]) {
    controls.forEach((item: AbstractControl) => {
      item.markAsTouched();
      item.updateValueAndValidity();
    });
  }

  private clearValidators(patenteCamionControl: FormControl, tarjetaControl: FormControl) {
    patenteCamionControl.clearValidators();
    tarjetaControl.clearValidators();
  }

  onRemitoSeleccionado(remito: ModalSeleccionarRemitoDataView): void {
    this.obtenerMovimiento(remito);
  }

  private obtenerMovimiento(remitoSeleccionado: ModalSeleccionarRemitoDataView | undefined): void {
    const patenteCamionCtrl = this.fcService.getControl('patenteCamion');
    const numeroVagonValue = this.fcService.getValue('numeroVagon');
    const idVendedor = remitoSeleccionado ? +remitoSeleccionado.id : undefined;
    const numeroDocPorte = remitoSeleccionado ? +remitoSeleccionado.documentoPorte : undefined;
    const tarjetaControl = this.fcService.getControl('tarjeta');
    if (tarjetaControl && patenteCamionCtrl) {
      this.controlarSalidaService.getMovimientoControlSalida(patenteCamionCtrl.value,
                                                             tarjetaControl.value,
                                                             numeroVagonValue,
                                                             idVendedor,
                                                             numeroDocPorte)
        .pipe(takeUntil(this.onDestroy))
        .subscribe(datos => {
          if (!datos) {
            tarjetaControl.setValue('', { onlySelf: true });
            this.tarjeta.setFocus();
          }
          this.movimientoRecuperado.emit(datos);
        });
    }
  }
}
