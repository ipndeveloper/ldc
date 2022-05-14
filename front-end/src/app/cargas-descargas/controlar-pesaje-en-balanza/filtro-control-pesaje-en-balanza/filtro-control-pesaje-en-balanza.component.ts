import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FechaConEtiquetaComponent } from '../../../core/controls/fecha-con-etiqueta/fecha-con-etiqueta.component';
import { Resources } from '../../../../locale/artifacts/resources';

@Component({
  selector: 'yrd-filtro-control-pesaje-en-balanza',
  templateUrl: './filtro-control-pesaje-en-balanza.component.html',
  styleUrls: ['./filtro-control-pesaje-en-balanza.component.css']
})

export class FiltroControlPesajeEnBalanzaComponent implements OnInit {

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
