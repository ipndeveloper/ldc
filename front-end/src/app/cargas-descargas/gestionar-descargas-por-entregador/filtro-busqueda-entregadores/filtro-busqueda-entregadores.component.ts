import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DesplegableEstadoMovimientoFilter } from '../../../shared/desplegable-estado-movimiento/desplegable-estado-movimiento-filter';
import { Resources } from '../../../../locale/artifacts/resources';
import { DesplegableTipoDocumentoPorteComponent } from '../../shared/desplegable-tipo-documento-porte/desplegable-tipo-documento-porte.component';

@Component({
  selector: 'yrd-filtro-busqueda-entregadores',
  templateUrl: './filtro-busqueda-entregadores.component.html',
  styleUrls: ['./filtro-busqueda-entregadores.component.css']
})

export class FiltroBusquedaEntregadoresComponent implements OnInit {

  @Input() filtrosForm: FormGroup;
  @Input() estadoMovimientoFilters: DesplegableEstadoMovimientoFilter;
  textoEnCircuito = Resources.Labels.EnCircuito;
  textoRechazados = Resources.Labels.Rechazados;
  @Input() terminal;
  @ViewChild('tipoDocPorte') tipoDocPorte: DesplegableTipoDocumentoPorteComponent;

  validationMessagesFechaDesde = {
    required: Resources.Messages.ElCampoXEsRequeridoParaBuscar.format(Resources.Labels.FechaDesde)
  };

  validationMessagesFechaHasta = {
    required: Resources.Messages.ElCampoXEsRequeridoParaBuscar.format(Resources.Labels.FechaHasta)
  };

  constructor() { }

  ngOnInit() {
    this.setFocus();
  }

  setFocus() {
    this.tipoDocPorte.setFocus();
  }

}
