import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Resources } from '../../../../locale/artifacts/resources';
import { DesplegableEstadoMovimientoFilter } from '../../../shared/desplegable-estado-movimiento/desplegable-estado-movimiento-filter';

@Component({
  selector: 'yrd-filtro-busqueda-control',
  templateUrl: './filtro-busqueda-control.component.html',
  styleUrls: ['./filtro-busqueda-control.component.css']
})
export class FiltroBusquedaControlComponent implements OnInit {
  @Input() filtrosForm: FormGroup;
  @Input() filtroEstadoMovimiento: DesplegableEstadoMovimientoFilter;

  validationMessagesTarjeta = {
    required: Resources.Messages.ElCampoXEsRequeridoParaBuscar.format(Resources.Labels.Tarjeta),
    pattern: Resources.Messages.CampoTarjetaSoloNumeros
  };

  validationMessagesnroDocPorte = {
    minlength: Resources.Messages.ElCampoXEsRequeridoParaBuscar.format(Resources.Labels.Tarjeta)
  };

  constructor() { }

  ngOnInit() {
  }

}
