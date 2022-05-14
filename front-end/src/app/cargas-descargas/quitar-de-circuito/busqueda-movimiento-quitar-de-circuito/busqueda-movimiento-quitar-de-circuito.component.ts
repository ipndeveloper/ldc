import { Component, Input, Output, EventEmitter, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { QuitarDeCircuitoService } from '../quitar-de-circuito.service';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MovimientoQuitarDeCircuitoDataView } from '../../../shared/data-models/movimiento-quitar-de-circuito-data-view';
import { TipoTransporte } from '../../../shared/data-models/tipo-transporte';
import { Resources } from '../../../../locale/artifacts/resources';
import { TiposTransporte } from '../../../shared/enums/enums';
import { AutocompletePatenteComponent } from '../../../shared/autocomplete-patente/autocomplete-patente.component';
import { NumeroConEtiquetaComponent } from '../../../core/controls/numero-con-etiqueta/numero-con-etiqueta.component';
import { Collection } from '../../../core/models/collection';

@Component({
  selector: 'yrd-busqueda-movimiento-quitar-de-circuito',
  templateUrl: './busqueda-movimiento-quitar-de-circuito.component.html',
  styleUrls: ['./busqueda-movimiento-quitar-de-circuito.component.css'],
  providers: [QuitarDeCircuitoService, FormComponentService]
})
export class BusquedaMovimientoQuitarDeCircuitoComponent implements AfterViewInit, OnDestroy {

  @Input() busquedaMovimientoQuitarDeCircuitoForm: FormGroup;
  @Output() movimientoRecuperado: EventEmitter<MovimientoQuitarDeCircuitoDataView> =
    new EventEmitter<MovimientoQuitarDeCircuitoDataView>();
  @Input() disableButtons: boolean;
  @ViewChild('autocompletePatente') autocompletePatente: AutocompletePatenteComponent;
  @ViewChild('VagonInput') VagonInput: NumeroConEtiquetaComponent;
  private readonly onDestroy = new Subject();

  validationMessagesNumeroVagon = {
    required: Resources.Messages.ElCampoXEsRequeridoParaBuscar.format(Resources.Labels.NumeroDeVagon)
  };

  validationMessagesPatenteCamion = {
    required: Resources.Messages.ElCampoXEsRequeridoParaBuscar.format(Resources.Labels.PatenteCamion)
  };

  constructor(private readonly quitarDeCircuitoService: QuitarDeCircuitoService,
    private readonly fcService: FormComponentService) {
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }

  ngAfterViewInit() {
    this.fcService.initialize(this.busquedaMovimientoQuitarDeCircuitoForm);
    this.suscribirseCambioTipoTransporte();
  }

  private obtenerMovimiento(tipoTransporte, filtro): void {
    this.quitarDeCircuitoService.getMovimientoQuitarDeCircuito(tipoTransporte, filtro)
      .subscribe(datos => {
        this.movimientoRecuperado.emit(datos);
      });
  }

  getMovimientoQuitarDeCircuito() {
    const errors = new Collection<string>();
    this.fcService.validateForm(this.busquedaMovimientoQuitarDeCircuitoForm.controls, errors, '');
    if (this.fcService.isValidForm()) {
      const tipoTransporteControl = this.busquedaMovimientoQuitarDeCircuitoForm.get('tipoTransporte');
      const patenteCamionControl = this.busquedaMovimientoQuitarDeCircuitoForm.get('patenteCamion');
      const numeroVagon = this.busquedaMovimientoQuitarDeCircuitoForm.get('numeroVagon');
      if (tipoTransporteControl && patenteCamionControl && numeroVagon) {
        if (tipoTransporteControl.value.id === TiposTransporte.Camion) {
          this.obtenerMovimiento(tipoTransporteControl.value.id, patenteCamionControl.value);
          } else {
            this.obtenerMovimiento(tipoTransporteControl.value.id, numeroVagon.value);
          }
        }
      }
    }

  suscribirseCambioTipoTransporte() {
    this.busquedaMovimientoQuitarDeCircuitoForm.controls.tipoTransporte.valueChanges
      .pipe(
        takeUntil(this.onDestroy)
      )
      .subscribe((value: TipoTransporte) => {
        if (value && value.id === TiposTransporte.Tren) {
          this.busquedaMovimientoQuitarDeCircuitoForm.controls.patenteCamion.reset();
          this.busquedaMovimientoQuitarDeCircuitoForm.controls.patenteCamion.disable();
          this.busquedaMovimientoQuitarDeCircuitoForm.controls.numeroVagon.enable();
        } else {
          this.busquedaMovimientoQuitarDeCircuitoForm.controls.numeroVagon.reset();
          this.busquedaMovimientoQuitarDeCircuitoForm.controls.patenteCamion.enable();
          this.busquedaMovimientoQuitarDeCircuitoForm.controls.numeroVagon.disable();
        }
      });
  }

  limpiar() {
    const tipoTransporteControl = this.busquedaMovimientoQuitarDeCircuitoForm.get('tipoTransporte');

    if (tipoTransporteControl) {
      this.busquedaMovimientoQuitarDeCircuitoForm.controls.patenteCamion.reset();
      this.busquedaMovimientoQuitarDeCircuitoForm.controls.numeroVagon.reset();
    }
  }
}
