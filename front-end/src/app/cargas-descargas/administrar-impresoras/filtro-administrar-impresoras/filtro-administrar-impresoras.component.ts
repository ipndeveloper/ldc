import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Permission } from '../../../shared/enums/enums';
import { DesplegableSiNoComponent } from '../../../shared/desplegable-si-no/desplegable-si-no.component';

@Component({
  selector: 'yrd-filtro-administrar-impresoras',
  templateUrl: './filtro-administrar-impresoras.component.html',
  styleUrls: ['./filtro-administrar-impresoras.component.css']
})

export class FiltroAdministrarImpresorasComponent implements OnInit {
  @Input() form: FormGroup;
  @ViewChild('habilitado') habilitado: DesplegableSiNoComponent;

  Permission = Permission;

  constructor() { }

  ngOnInit() {
  }

  setFocus(): any {
    setTimeout(() => {
      this.habilitado.setFocus();
    }, 0);
  }

}
