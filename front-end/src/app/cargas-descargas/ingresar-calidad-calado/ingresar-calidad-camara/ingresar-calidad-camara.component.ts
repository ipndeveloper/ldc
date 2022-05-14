import { Component, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Producto } from '../../../shared/data-models/producto';
import { Resources } from '../../../../locale/artifacts/resources';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Operaciones, Productos } from '../../../shared/enums/enums';
import { Subject } from 'rxjs';

@Component({
  selector: 'yrd-ingresar-calidad-camara',
  templateUrl: './ingresar-calidad-camara.component.html',
  styleUrls: ['./ingresar-calidad-camara.component.css']
})
export class IngresarCalidadCamaraComponent implements AfterViewInit, OnDestroy {

  readonly validationMessagesCodigoBarras = {
    required: Resources.Messages.CampoCodigoBarraCamaraRequerido
  };
  readonly validationMessagesLaboratorio = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Laboratorio)
  };
  requiereAnalisisCamara = false;

  private formularioFueDeshabilitadoPorCaracteristicas: boolean;
  private _producto: Producto;
  private _esConsulta: boolean;
  private onDestroy = new Subject();

  @Input() ingresoCamaraForm: FormGroup;
  @Input() esCarga = false;
  @Input() usaMuestraTipoAcopio = false;
  @Input() ctg = '';
  @Input() set producto(val: Producto) {
    this._producto = val;
    this.setValuesOnProductChanged();
  }
  @Input() set operacion(val: Operaciones) {
    this._esConsulta = (val === Operaciones.Consulta);
  }

  get producto() {
    return this._producto;
  }

  get esConsulta() {
    return this._esConsulta;
  }

  constructor() { }

  ngAfterViewInit(): void {
    this.subscribeToControlChanges();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  setDisabledState(isDisable: boolean) {
    this.formularioFueDeshabilitadoPorCaracteristicas = isDisable;
    if (isDisable) {
      this.ingresoCamaraForm.disable();
    }
  }

  private subscribeToControlChanges() {
    const camaraCtrl = this.ingresoCamaraForm.get('camara');
    if (camaraCtrl) {
      camaraCtrl.valueChanges
        .pipe(
          distinctUntilChanged(),
          takeUntil(this.onDestroy)
        )
        .subscribe(newValue => {
          this.requiereAnalisisCamara = newValue;
          this.setValuesOnCamaraChanged(newValue);

          if (!this.formularioFueDeshabilitadoPorCaracteristicas) {
            this.setDisabledStateOnCamaraChanged(newValue);
          }
        });
    }
  }

  private setValuesOnProductChanged() {
    if (this.esConsulta) {
      this.ingresoCamaraForm.disable();
    } else {
      if (this.producto && !this.esCarga) {
        if (this.producto.requiereAnalisisPorTecnologia) {
          this.ingresoCamaraForm.controls.tecnologia.setValue(true);
          this.ingresoCamaraForm.controls.camara.setValue(false);
          if (this.usaMuestraTipoAcopio) {
            this.ingresoCamaraForm.controls.codigoBarra.setValue(this.ctg);
            if (!this.formularioFueDeshabilitadoPorCaracteristicas) {
              this.ingresoCamaraForm.controls.camara.enable();
            }
          } else {
            this.ingresoCamaraForm.controls.camara.disable();
          }
        } else {
          this.ingresoCamaraForm.controls.tecnologia.setValue(false);
          this.ingresoCamaraForm.controls.tecnologia.disable();
          if (!this.formularioFueDeshabilitadoPorCaracteristicas) {
            this.ingresoCamaraForm.controls.camara.enable();
          }
        }
      } else {
        this.ingresoCamaraForm.disable();
      }
    }
  }

  private setValuesOnCamaraChanged(camaraChecked: boolean) {
    if (camaraChecked) {
      if (this.usaMuestraTipoAcopio) {
        this.ingresoCamaraForm.controls.grupoRubroAnalisis.setValue('');
        this.ingresoCamaraForm.controls.codigoBarra.setValue(this.ctg);
      } else {
        this.ingresoCamaraForm.controls.laboratorio.setValue('');
        if (this.producto && this.producto.grupoRubroAnalisisPorDefecto) {
          this.ingresoCamaraForm.controls.grupoRubroAnalisis.setValue(this.producto.grupoRubroAnalisisPorDefecto);
        } else {
          this.ingresoCamaraForm.controls.grupoRubroAnalisis.setValue('');
          this.ingresoCamaraForm.controls.codigoBarra.setValue('');
        }
      }
    } else {
      this.ingresoCamaraForm.controls.grupoRubroAnalisis.setValue('');
      this.ingresoCamaraForm.controls.laboratorio.setValue('');
      if (!this.usaMuestraTipoAcopio ||
          (this.producto.id !== Productos.Soja && this.producto.id !== Productos.SojaEPA)) {
        this.ingresoCamaraForm.controls.codigoBarra.setValue('');
      }
    }
  }

  private setDisabledStateOnCamaraChanged(camaraChecked: boolean) {
    if (camaraChecked && !this.esConsulta) {
      if (this.usaMuestraTipoAcopio) {
        this.ingresoCamaraForm.controls.laboratorio.enable();
        this.ingresoCamaraForm.controls.grupoRubroAnalisis.disable();
        if (this.producto.id === Productos.Soja || this.producto.id === Productos.SojaEPA) {
          this.ingresoCamaraForm.controls.codigoBarra.disable();
        } else {
          this.ingresoCamaraForm.controls.codigoBarra.enable();
        }
      } else {
        this.ingresoCamaraForm.controls.laboratorio.disable();
        this.ingresoCamaraForm.controls.grupoRubroAnalisis.enable();
        this.ingresoCamaraForm.controls.codigoBarra.enable();
      }
    } else {
      this.ingresoCamaraForm.controls.grupoRubroAnalisis.disable();
      this.ingresoCamaraForm.controls.laboratorio.disable();
      if (!this.esConsulta && !this.usaMuestraTipoAcopio &&
          !!this.ingresoCamaraForm.controls.tecnologia.value) {
        this.ingresoCamaraForm.controls.codigoBarra.enable();
      } else {
        this.ingresoCamaraForm.controls.codigoBarra.disable();
      }
    }
  }
}
