import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BuscadorChoferComponent } from '../../../shared/buscador-chofer/buscador-chofer.component';

@Component({
  selector: 'yrd-filtro-administrar-penalizacion-choferes',
  templateUrl: './filtro-administrar-penalizacion-choferes.component.html',
  styleUrls: ['./filtro-administrar-penalizacion-choferes.component.css']
})
export class FiltroAdministrarPenalizacionChoferesComponent implements OnInit {
  @ViewChild('chofer') chofer: BuscadorChoferComponent ;
  @Input() form: FormGroup;

  constructor() { }

  ngOnInit() {
  }

  setFocus(): any {
    setTimeout(() => {
      this.chofer.setFocus();
    }, 0);
  }

}
