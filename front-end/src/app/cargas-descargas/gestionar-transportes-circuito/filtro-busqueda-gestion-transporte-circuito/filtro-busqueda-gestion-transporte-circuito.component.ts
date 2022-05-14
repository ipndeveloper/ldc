import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Resources } from '../../../../locale/artifacts/resources';
import { DesplegableEstadoMovimientoFilter } from '../../../shared/desplegable-estado-movimiento/desplegable-estado-movimiento-filter';

@Component({
  selector: 'yrd-filtro-busqueda-gestion-transporte-circuito',
  templateUrl: './filtro-busqueda-gestion-transporte-circuito.component.html',
  styleUrls: ['./filtro-busqueda-gestion-transporte-circuito.component.css']
})
export class FiltroBusquedaGestionTransporteCircuitoComponent implements OnInit {
  @Input() filtrosForm: FormGroup;
  @Input() filtroEstadoMovimiento: DesplegableEstadoMovimientoFilter;

  validationMessagesTarjeta = {
    minlength: Resources.Messages.ElCampoXEsRequeridoParaBuscar.format(Resources.Labels.Tarjeta)
  };

  constructor() { }

  ngOnInit() {
  }
}
