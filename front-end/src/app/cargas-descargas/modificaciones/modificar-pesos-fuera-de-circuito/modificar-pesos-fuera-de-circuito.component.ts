import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { MovimientoPesaje } from '../../registrar-peso/movimiento-pesaje';
import { MovimientoPesajeFueraDeCircuitoService } from './movimiento-pesaje-fuera-de-circuito.service';
import { RegistrarPesajeFueraDeCircuitoCommand } from '../../../shared/data-models/commands/cargas-descargas/registrar-pesaje-fuera-de-circuito-command';
import { Collection } from '../../../core/models/collection';
import { Resources } from '../../../../locale/artifacts/resources';
import { PopupService } from '../../../core/services/popupService/popup.service';
import { NavigationService } from '../../../core/services/navigationService/navigation.service';
import { tiposMovimientos } from '../../../shared/data-models/tipo-movimiento';
import { tiposTransportes } from '../../../shared/data-models/tipo-transporte';
import { TipoProducto } from '../../../shared/data-models/tipo-producto';
import { Terminal } from '../../../shared/data-models/terminal';
import { AuthService } from '../../../core/services/session/auth.service';
import { TiposProducto, TiposTransporte, TiposMovimiento } from '../../../shared/enums/enums';
import { FechaPeriodoStockSanComponent } from '../fecha-periodo-stock-san/fecha-periodo-stock-san.component';
import { fechaDebeSerMenorIgualAFechaDelDia } from '../../shared/validators/fecha.validator';
import { DatosPesajeComponent } from '../../shared/datos-pesaje/datos-pesaje.component';

@Component({
  selector: 'yrd-modificar-pesos-fuera-de-circuito',
  templateUrl: './modificar-pesos-fuera-de-circuito.component.html',
  styleUrls: ['./modificar-pesos-fuera-de-circuito.component.css']
})
export class ModificarPesosFueraDeCircuitoComponent
  implements OnInit,
             OnDestroy {

  @ViewChild('fechaStock') fechaStockComponent: FechaPeriodoStockSanComponent;
  @ViewChild('datosPesaje') datosPesajeComponent: DatosPesajeComponent;
  registrarPesoForm: FormGroup;
  movimiento: MovimientoPesaje;
  gestionarMovimientosPath = 'GestionarMovimientos';
  modificarPesosFueraDeCircuitoPath = 'modificarPesosFueraDeCircuito';
  onDestroy = new Subject();
  terminal: Terminal;
  esTren: boolean;
  esCarga: boolean;
  productoImputaStock: boolean;

  constructor(private readonly fb: FormBuilder,
              protected readonly popupService: PopupService,
              private readonly formComponentService: FormComponentService,
              private readonly movimientoPesajeService: MovimientoPesajeFueraDeCircuitoService,
              protected readonly navigationService: NavigationService,
              protected readonly authService: AuthService) {
    const userContext = this.authService.getUserContext();
    if (userContext) {
      this.terminal = userContext.terminal;
    }
  }

  ngOnInit(): void {
    this.createForm();
    this.subscribeNavigation();
    setTimeout(() => {
      if (this.productoImputaStock) {
        this.datosPesajeComponent.setFocusPesaje();
      } else {
        this.fechaStockComponent.setFocus();
      }
    }, 0);
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  onClickAceptar(): void {
    if (this.verificarPesosBalanza()) {
      if (this.formComponentService.isValidForm()) {
        const comando = this.construirCommand();
        this.movimientoPesajeService.registrar(comando).pipe(takeUntil(this.onDestroy))
          .subscribe(_ => {
            this.successfulResult();
          });
      } else {
        const errors = new Collection<string>();
        this.formComponentService.validateForm(this.registrarPesoForm.controls, errors, '');
        this.formComponentService.showValidationError(errors);
      }
    }
  }

  onClickCancelar(): void {
    this.popupService.warning(Resources.Messages.SeCanceloElIngresoDelPesaje, Resources.Labels.Cancelar);
    this.navegarAGestionarMovimiento();
  }

  private createForm(): void {
    this.registrarPesoForm = this.fb.group({
      busquedaMovimiento: this.fb.group({
        patenteCamion: [{value: '', disabled: true}],
        numeroVagon: [{value: '', disabled: true}],
        tarjeta: [{value: '', disabled: true}]
      }),
      circuito: this.fb.group({
        terminal: { value: '', disabled: true },
        tipoMovimiento: { value: '', disabled: true },
        tipoTransporte: { value: '', disabled: true },
        tipoProducto: { value: '', disabled: true }
      }),
      estadoMovimiento: this.fb.group({
        estado: { value: '', disabled: true }
      }),
      fechaPeriodoStockSan: this.fb.group({
        fechaStock: [{ value: '', disabled: false }]
      }),
      datosMovimiento: this.fb.group({
        tipoDocumentoPorte: { value: '', disabled: true },
        nroDocumentoPorte: { value: '', disabled: true },
        producto: { value: '', disabled: true },
        cosecha: { value: '', disabled: true },
        estado: { value: '', disabled: true },
        estadoCupo: { value: '', disabled: true },
        turnoPlaya: { value: '', disabled: true },
        ordenCompra: { value: '', disabled: true },
        ordenCarga: { value: '', disabled: true },
        humedad: { value: '', disabled: true },
        proteina: { value: '', disabled: true },
        grado: { value: '', disabled: true },
        cantidadEstimada: { value: '', disabled: true },
        entregador: { value: '', disabled: true },
        ctg: { value: '', disabled: true }
      }),
      datosPesaje: this.fb.group({
        idMovimiento: { value: '' },
        brutoDocPorte: { value: '', disabled: true },
        taraDocPorte: { value: '', disabled: true },
        netoDocPorte: { value: '', disabled: true },
        kilosBruto: [{ value: '', disabled: false },
        Validators.compose([
          Validators.required,
          Validators.min(1),
          Validators.pattern(/^-?\d+$/),
          Validators.max(2147483647)])],
        kilosTara: [{ value: '', disabled: false },
        Validators.compose([
          Validators.required,
          Validators.min(1),
          Validators.pattern(/^-?\d+$/),
          Validators.max(2147483647)])],
        netoBalanza: { value: '', disabled: true },
        brutoDiferencia: { value: '', disabled: true },
        taraDiferencia: { value: '', disabled: true },
        netoDiferencia: { value: '', disabled: true },
        brutoEsRepesaje: { value: '', disabled: true },
        taraEsRepesaje: { value: '', disabled: true },
        entradaManualAutomatico: { value: '', disabled: true },
        salidaManualAutomatico: { value: '', disabled: true },
        coeficienteConversionLitros: {value: '', disabled: true },
      }),
      lugarDescargaCarga: {value: '', disabled: true}
    });

    this.formComponentService.initialize(this.registrarPesoForm);
    this.suscribirseCambiosPesos();
  }

  private getMovimientoPesaje(idMovimiento: number, idTipoTransporte: number): void {
    this.movimientoPesajeService.getMovimientoPesaje(idMovimiento, idTipoTransporte).pipe(takeUntil(this.onDestroy))
      .subscribe(datos => {
        if (datos) {
          this.productoImputaStock = datos.producto.imputaStock;
          this.completarExistente(datos);
          this.completeCircuitoForm();
          this.agregarOQuitarValidacionFechaStock();
        }
      });
  }

  private agregarOQuitarValidacionFechaStock(): void {
    const fechaStockCtrl = this.formComponentService.getControl('fechaPeriodoStockSan.fechaStock');
    if (fechaStockCtrl) {
      if (this.productoImputaStock) {
        fechaStockCtrl.setValidators([Validators.required, fechaDebeSerMenorIgualAFechaDelDia()]);
      } else {
        fechaStockCtrl.clearValidators();
      }
      fechaStockCtrl.updateValueAndValidity();
    }
  }

  private completeCircuitoForm(): void {
    const tipoMovimiento = tiposMovimientos.find(t => t.id === this.movimiento.idTipoMovimiento);
    const tipoTransporte = tiposTransportes.find(t => t.id === this.movimiento.idTipoTransporte);
    const tipoProducto = new TipoProducto(this.movimiento.idTipoProducto, TiposProducto[this.movimiento.idTipoProducto as TiposProducto]);
    if (tipoMovimiento && this.terminal && tipoTransporte) {
      this.formComponentService.setValue(`circuito.terminal`, this.terminal.descripcion, { onlySelf: true });
      this.formComponentService.setValue(`circuito.tipoMovimiento`, tipoMovimiento.descripcion, { onlySelf: true });
      this.formComponentService.setValue(`circuito.tipoProducto`, tipoProducto.descripcion, { onlySelf: true });
      this.formComponentService.setValue(`circuito.tipoTransporte`, tipoTransporte.descripcion, { onlySelf: true });
      this.esTren = (tipoTransporte.id === TiposTransporte.Tren);
      this.esCarga = (tipoMovimiento.id === TiposMovimiento.Carga);
    }
  }

  private suscribirseCambiosPesos(): void {
    const brutoBalanza = this.registrarPesoForm.get('datosPesaje.kilosBruto');
    const taraBalanza = this.registrarPesoForm.get('datosPesaje.kilosTara');
    const netoBalanza = this.registrarPesoForm.get('datosPesaje.netoBalanza');
    const brutoDocPorte = this.registrarPesoForm.get('datosPesaje.brutoDocPorte');
    const taraDocPorte = this.registrarPesoForm.get('datosPesaje.taraDocPorte');
    const netoDocPorte = this.registrarPesoForm.get('datosPesaje.netoDocPorte');
    const brutoDiferencia = this.registrarPesoForm.get('datosPesaje.brutoDiferencia');
    const taraDiferencia = this.registrarPesoForm.get('datosPesaje.taraDiferencia');
    const netoDiferencia = this.registrarPesoForm.get('datosPesaje.netoDiferencia');

    if (brutoBalanza && taraBalanza && netoBalanza
        && brutoDocPorte && taraDocPorte && netoDocPorte
        && brutoDiferencia && taraDiferencia && netoDiferencia) {

      brutoBalanza.valueChanges.subscribe((bb: number) => {
        if (taraBalanza.value) {
          netoBalanza.setValue(bb - +taraBalanza.value);
          netoBalanza.updateValueAndValidity();
        }
        if (brutoDocPorte.value) {
          brutoDiferencia.setValue(bb - +brutoDocPorte.value);
          brutoDiferencia.updateValueAndValidity();
          if (taraDiferencia.value || taraDiferencia.value === 0) {
            netoDiferencia.setValue(+brutoDiferencia.value - +taraDiferencia.value);
            netoDiferencia.updateValueAndValidity();
          }
        }
      });

      taraBalanza.valueChanges.subscribe((tb: number) => {
        if (brutoBalanza.value) {
          netoBalanza.setValue(+brutoBalanza.value - tb);
          netoBalanza.updateValueAndValidity();
        }
        if (taraDocPorte.value) {
          taraDiferencia.setValue(tb - +taraDocPorte.value);
          taraDiferencia.updateValueAndValidity();
          if (brutoDiferencia.value || brutoDiferencia.value === 0) {
            netoDiferencia.setValue(+brutoDiferencia.value - +taraDiferencia.value);
            netoDiferencia.updateValueAndValidity();
          }
        }
      });
    }
  }

  protected subscribeNavigation(): void {
    this.navigationService.requestExtras()
      .pipe(takeUntil(this.onDestroy))
      .subscribe((params) => {
        if (params['idMovimiento']) {
          this.getMovimientoPesaje(params['idMovimiento'], params['idTipoTransporte']);
        }
      });
  }

  private completarExistente(movimiento: MovimientoPesaje) {
    if (movimiento) {
      this.movimiento = movimiento;
      const fecha = movimiento.fechaStockSAN ? new Date(movimiento.fechaStockSAN).toLocalISOString().substring(0, 10) : undefined;
      this.formComponentService.setValue(`fechaPeriodoStockSan.fechaStock`, fecha, {onlySelf: true}, !movimiento.producto.imputaStock);
      this.formComponentService.setValue(`busquedaMovimiento.patenteCamion`, movimiento.patente, { onlySelf: true }, true);
      this.formComponentService.setValue(`busquedaMovimiento.numeroVagon`, movimiento.numeroVagon, { onlySelf: true }, true);
      this.formComponentService.setValue(`busquedaMovimiento.tarjeta`, movimiento.tarjeta, { onlySelf: true }, true);
      this.formComponentService.setValue(`datosMovimiento.tipoDocumentoPorte`, movimiento.tipoDocumentoPorte, { onlySelf: true });
      this.formComponentService.setValue(`datosMovimiento.nroDocumentoPorte`, movimiento.nroDocumentoPorte, { onlySelf: true });
      this.formComponentService.setValue(`datosMovimiento.turnoPlaya`, movimiento.turno, { onlySelf: true });
      this.formComponentService.setValue(`datosMovimiento.estadoCupo`, movimiento.estadoCupo, { onlySelf: true });
      this.formComponentService.setValue(`datosMovimiento.producto`, movimiento.producto.descripcion, { onlySelf: true });
      this.formComponentService.setValue(`estadoMovimiento.estado`, movimiento.estado, { onlySelf: true });
      this.formComponentService.setValue(`datosMovimiento.cosecha`, movimiento.cosecha, { onlySelf: true });
      this.formComponentService.setValue(`datosMovimiento.humedad`, movimiento.humedad, { onlySelf: true });
      this.formComponentService.setValue(`datosMovimiento.proteina`, movimiento.proteina, { onlySelf: true });
      this.formComponentService.setValue(`datosMovimiento.grado`, movimiento.gradoDescripcion, { onlySelf: true });
      this.formComponentService.setValue(`datosMovimiento.cantidadEstimada`, movimiento.cantidadEstimada, { onlySelf: true });
      this.formComponentService.setValue(`datosMovimiento.ordenCompra`, movimiento.ordenCompra, { onlySelf: true });
      this.formComponentService.setValue(`datosMovimiento.entregador`, movimiento.entregador, { onlySelf: true });
      this.formComponentService.setValue(`datosMovimiento.ctg`, movimiento.ctg, { onlySelf: true });
      this.formComponentService.setValue(`datosPesaje.brutoDocPorte`, movimiento.kgPesoBrutoDocumento, { onlySelf: true });
      this.formComponentService.setValue(`datosPesaje.netoDocPorte`, movimiento.kgPesoNetoDocumento, { onlySelf: true });
      this.formComponentService.setValue(`datosPesaje.taraDocPorte`, movimiento.kgPesoTaraDocumento, { onlySelf: true });
      this.formComponentService.setValue(`datosPesaje.kilosBruto`, movimiento.kgPesoBruto, { onlySelf: true });
      this.formComponentService.setValue(`datosPesaje.kilosTara`, movimiento.kgPesoTara, { onlySelf: true });
      this.formComponentService.setValue(`datosPesaje.brutoEsRepesaje`, movimiento.entradaEsRepesaje, { onlySelf: true });
      this.formComponentService.setValue(`datosPesaje.taraEsRepesaje`, movimiento.salidaEsRepesaje, { onlySelf: true });
      this.formComponentService.setValue(`datosPesaje.coeficienteConversionLitros`,
                                         movimiento.coeficienteConversionLitros,
                                         { onlySelf: true }, !movimiento.imputaStockLitros);
      this.formComponentService.setValue(`lugarDescargaCarga`, movimiento.lugarDescargaCarga, { onlySelf: true }, true);
      this.formComponentService.setValue(`datosMovimiento.ordenCarga`, movimiento.ordenCarga, { onlySelf: true });
    }
  }

  private verificarPesosBalanza(): boolean {
    let isValid = true;
    if (!this.verificarControlPesoNeto()) {
      isValid = false;
    }
    if (!this.verificarControlPeso('datosPesaje.kilosBruto', 'Peso Bruto')) {
      isValid = false;
    }
    if (!this.verificarControlPeso('datosPesaje.kilosTara', 'Peso Tara')) {
      isValid = false;
    }
    return isValid;
  }

  private verificarControlPesoNeto(): boolean {
    if (this.movimiento) {
      return this.verificarPesoNeto();
    }
    return true;
  }

  private verificarPesoNeto(): boolean {
    const ctrlPesoBruto = this.registrarPesoForm.get('datosPesaje.kilosBruto');
    const ctrlPesoTara = this.registrarPesoForm.get('datosPesaje.kilosTara');
    const ctrlPesoNeto = this.registrarPesoForm.get('datosPesaje.netoBalanza');

    if (ctrlPesoNeto && ctrlPesoBruto && ctrlPesoTara && ctrlPesoNeto.value < 0) {
       this.popupService.error(Resources.Messages.ElPesoNetoResultanteEsNegativo.format(
                                                              ctrlPesoBruto.value,
                                                              ctrlPesoTara.value,
                                                              ctrlPesoNeto.value, '0', '1', '2'), Resources.Labels.Error);
      return false;
    }
    return true;
  }

  private verificarControlPeso(accessor: string, campo: string): boolean {
    const ctrlPeso = this.registrarPesoForm.get(accessor);
    if (ctrlPeso && ctrlPeso.enabled && (!ctrlPeso.value || +ctrlPeso.value === 0)) {
      this.popupService.error(Resources.Messages.ElCampoXDebeSerMayorAY.format(campo, '0'), Resources.Labels.Error);
      return false;
    }
    return true;
  }

  private successfulResult(): void {
    this.popupService.success(Resources.Messages.SeAceptoElIngresoDelPesaje, Resources.Labels.Aceptar);
    this.navegarAGestionarMovimiento();
  }

  private navegarAGestionarMovimiento(): void {
    setTimeout(() =>
    this.navigationService.navigate(this.modificarPesosFueraDeCircuitoPath, this.gestionarMovimientosPath),
    1000);
  }

  private construirCommand(): RegistrarPesajeFueraDeCircuitoCommand {
    const bruto = this.registrarPesoForm.get('datosPesaje.kilosBruto');
    const tara = this.registrarPesoForm.get('datosPesaje.kilosTara');

    if (this.movimiento && bruto && tara) {
      const command = new RegistrarPesajeFueraDeCircuitoCommand(this.movimiento.id);
      command.bruto = bruto.value;
      command.tara = tara.value;
      command.version = this.movimiento.version;
      command.coeficienteConversionLitros = this.formComponentService.getValue('datosPesaje.coeficienteConversionLitros');
      if (this.productoImputaStock) {
        command.fechaStockSan = String(this.formComponentService.getValue('fechaPeriodoStockSan.fechaStock'));
      }

      return command;
    } else {
      return new RegistrarPesajeFueraDeCircuitoCommand(0);
    }
  }
}
