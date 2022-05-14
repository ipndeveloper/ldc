import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DesplegableEstadoMovimientoFilter } from '../../../shared/desplegable-estado-movimiento/desplegable-estado-movimiento-filter';
import { Resources } from '../../../../locale/artifacts/resources';
@Component({
  selector: 'yrd-filtro-busqueda-gestionar-calidad-calado',
  templateUrl: './filtro-busqueda-gestionar-calidad-calado.component.html',
  styleUrls: ['./filtro-busqueda-gestionar-calidad-calado.component.css']
})
export class FiltroBusquedaGestionarCalidadCaladoComponent implements OnInit {

  @Input() filtrosForm: FormGroup;
  @Input() estadoMovimientoFilters: DesplegableEstadoMovimientoFilter;
  readonly terminalUtilizaTarjeta: boolean;

  validationMessagesTarjeta = {
    required: Resources.Messages.ElCampoXEsRequeridoParaBuscar.format(Resources.Labels.Tarjeta),
    pattern: Resources.Messages.CampoTarjetaSoloNumeros
  };

  validationMessagesPatente = {
    required: Resources.Messages.ElCampoXEsRequeridoParaBuscar.format(Resources.Labels.PatenteCamion)
  };

  constructor() {}

  ngOnInit() {
  }

}
