import { Component, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Resources } from '../../../../locale/artifacts/resources';
import { NumeroConEtiquetaComponent } from '../../../core/controls/numero-con-etiqueta/numero-con-etiqueta.component';

@Component({
  selector: 'yrd-filtro-busqueda-muestras',
  templateUrl: './filtro-busqueda-muestras.component.html',
  styleUrls: ['./filtro-busqueda-muestras.component.css']
})
export class FiltroBusquedaMuestrasComponent {

  @Input() filtrosForm: FormGroup;
  @ViewChild('inputCodigoBarars') inputCodigoBarras: NumeroConEtiquetaComponent;

  validationMessagesFechaDesde = {
    required: Resources.Messages.ElCampoXEsRequeridoParaBuscar.format(Resources.Labels.FechaDesde)
  };

  validationMessagesFechaHasta = {
    required: Resources.Messages.ElCampoXEsRequeridoParaBuscar.format(Resources.Labels.FechaHasta)
  };

  validationMessagesCodigoBarras = {
    pattern: Resources.Messages.CampoAdmiteSoloNumeros
  };

  constructor() { }

  setFocus() {
    this.inputCodigoBarras.setFocus();
  }
}
