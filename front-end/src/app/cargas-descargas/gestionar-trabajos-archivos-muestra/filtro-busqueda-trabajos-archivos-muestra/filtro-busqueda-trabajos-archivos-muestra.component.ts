import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Resources } from '../../../../locale/artifacts/resources';
import { FormGroup } from '@angular/forms';
import { FechaConEtiquetaComponent } from '../../../core/controls/fecha-con-etiqueta/fecha-con-etiqueta.component';

@Component({
  selector: 'yrd-filtro-busqueda-trabajos-archivos-muestra',
  templateUrl: './filtro-busqueda-trabajos-archivos-muestra.component.html',
  styleUrls: ['./filtro-busqueda-trabajos-archivos-muestra.component.css']
})
export class FiltroBusquedaTrabajosArchivosMuestraComponent implements OnInit {

  @Input() filtrosForm: FormGroup;
  @ViewChild('fechaDesdeControl') fechaDesdeControl: FechaConEtiquetaComponent;

  @Input() terminal;

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
    this.fechaDesdeControl.setFocus();
  }
}
