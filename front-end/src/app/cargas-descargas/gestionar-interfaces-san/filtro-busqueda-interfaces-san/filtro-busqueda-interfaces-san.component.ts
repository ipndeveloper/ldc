import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'yrd-filtro-busqueda-interfaces-san',
  templateUrl: './filtro-busqueda-interfaces-san.component.html',
  styleUrls: ['./filtro-busqueda-interfaces-san.component.css']
})
export class FiltroBusquedaInterfacesSanComponent implements OnInit {

  @Input() form: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
