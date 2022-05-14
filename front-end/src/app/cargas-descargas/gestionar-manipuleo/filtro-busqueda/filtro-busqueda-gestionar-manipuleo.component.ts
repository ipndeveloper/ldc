import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Resources } from '../../../../locale/artifacts/resources';
import { AutocompleteProductoComponent } from '../../../shared/autocomplete-producto/autocomplete-producto.component';

@Component({
  selector: 'yrd-filtro-busqueda-gestionar-manipuleo',
  templateUrl: './filtro-busqueda-gestionar-manipuleo.component.html',
  styleUrls: ['./filtro-busqueda-gestionar-manipuleo.component.css']
})
export class FiltroBusquedaGestionarManipuleoComponent implements OnInit {

  @Input() form: FormGroup;
  @ViewChild('buscadorProducto') buscadorProducto: AutocompleteProductoComponent;

  validationMessagesProducto = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Producto),
    searchValueNotValid: Resources.Messages.ElProductoNoExisteONoImputaStock
  };

  constructor() { }

  ngOnInit() {
    this.setFocus();
  }

  setFocus() {
    setTimeout(() => {
      this.buscadorProducto.setFocus();
    }, 0);
  }
}
