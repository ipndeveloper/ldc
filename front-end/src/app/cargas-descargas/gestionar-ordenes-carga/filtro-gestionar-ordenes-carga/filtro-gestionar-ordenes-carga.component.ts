import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TextoConEtiquetaComponent } from '../../../core/controls/texto-con-etiqueta/texto-con-etiqueta.component';

@Component({
  selector: 'yrd-filtro-gestionar-ordenes-carga',
  templateUrl: './filtro-gestionar-ordenes-carga.component.html',
  styleUrls: ['./filtro-gestionar-ordenes-carga.component.css']
})
export class FiltroGestionarOrdenesCargaComponent implements OnInit {

  @Input() filtrosForm: FormGroup;
  @ViewChild('nroOrdenCarga') nroOrdenCarga: TextoConEtiquetaComponent;

  constructor() { }

  ngOnInit() {
  }

  setFocus() {
    this.nroOrdenCarga.setFocus();
  }
}
