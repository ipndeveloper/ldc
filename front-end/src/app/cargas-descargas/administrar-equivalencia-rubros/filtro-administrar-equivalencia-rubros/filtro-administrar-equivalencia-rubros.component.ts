import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BuscadorProductoComponent } from '../../../shared/buscador-producto/buscador-producto.component';

@Component({
  selector: 'yrd-filtro-administrar-equivalencia-rubros',
  templateUrl: './filtro-administrar-equivalencia-rubros.component.html',
  styleUrls: ['./filtro-administrar-equivalencia-rubros.component.css']
})

export class FiltroAdministrarEquivalenciaRubrosComponent implements OnInit {
  @Input() form: FormGroup;
  @ViewChild('producto') producto: BuscadorProductoComponent;

  constructor() { }

  ngOnInit() {
  }

  setFocus(): any {
    setTimeout(() => {
      this.producto.setFocus();
    }, 0);
  }
}
