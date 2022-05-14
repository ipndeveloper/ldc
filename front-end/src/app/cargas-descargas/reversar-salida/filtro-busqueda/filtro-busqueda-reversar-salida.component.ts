import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DesplegableEstadoMovimientoFilter } from '../../../shared/desplegable-estado-movimiento/desplegable-estado-movimiento-filter';
import { TiposTransporte } from '../../../shared/enums/enums';

@Component({
  selector: 'yrd-filtro-busqueda-reversar-salida',
  templateUrl: './filtro-busqueda-reversar-salida.component.html',
  styleUrls: ['./filtro-busqueda-reversar-salida.component.css']
})
export class FiltroBusquedaReversarSalidaComponent implements OnInit {

  @Input() filtrosForm: FormGroup;
  @Input() estadoMovimientoFilters: DesplegableEstadoMovimientoFilter;

  constructor() { }

  ngOnInit() {
    const tipoTransporteCtl = this.filtrosForm.get('tipoTransporte');
    const patenteCtl = this.filtrosForm.get('patente');
    const numeroVagonCtl = this.filtrosForm.get('numeroVagon');

    if (tipoTransporteCtl && patenteCtl && numeroVagonCtl) {
      tipoTransporteCtl.valueChanges.subscribe((value) => {
        if (value) {
          if (value.id === TiposTransporte.Camion) {
            patenteCtl.enable();
            numeroVagonCtl.setValue('');
            numeroVagonCtl.disable();
          } else {
            patenteCtl.setValue('');
            patenteCtl.disable();
            numeroVagonCtl.enable();
          }
        } else {
          patenteCtl.enable();
          numeroVagonCtl.enable();
        }
      });
    }
  }

}
