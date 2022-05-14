import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Resources } from '../../../../../locale/artifacts/resources';

@Component({
  selector: 'yrd-filtro-busqueda-interfaces-afip',
  templateUrl: './filtro-busqueda-interfaces-afip.component.html',
  styleUrls: ['./filtro-busqueda-interfaces-afip.component.css']
})
export class FiltroBusquedaInterfacesAfipComponent implements OnInit {

  @Input() filtrosForm: FormGroup;

  validationMessagesTarjeta = {
    required: Resources.Messages.ElCampoXEsRequeridoParaBuscar.format(Resources.Labels.Tarjeta)
  };

  validationMessagesnroDocPorte = {
    minlength: Resources.Messages.ElCampoXEsRequeridoParaBuscar.format(Resources.Labels.Tarjeta)
  };

  validationMessagesFechaDesde = {
    required: Resources.Messages.ElCampoXEsRequeridoParaBuscar.format(Resources.Labels.FechaDesde)
  };

  validationMessagesFechaHasta = {
    required: Resources.Messages.ElCampoXEsRequeridoParaBuscar.format(Resources.Labels.FechaHasta)
  };

  constructor() { }

  ngOnInit() {
  }

}
