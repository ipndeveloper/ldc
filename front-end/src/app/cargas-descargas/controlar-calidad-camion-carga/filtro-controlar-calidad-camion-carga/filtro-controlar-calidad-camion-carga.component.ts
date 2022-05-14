import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AutocompletePatenteComponent } from '../../../shared/autocomplete-patente/autocomplete-patente.component';
import { Permission } from '../../../shared/enums/enums';

@Component({
  selector: 'yrd-filtro-controlar-calidad-camion-carga',
  templateUrl: './filtro-controlar-calidad-camion-carga.component.html',
  styleUrls: ['./filtro-controlar-calidad-camion-carga.component.css'],
})
export class FiltroControlarCalidadCamionCargaComponent
implements OnInit {
  @Input() disableFiltros: boolean;
  @Input() form: FormGroup;
  @ViewChild('autocompletePatente') autocompletePatente: AutocompletePatenteComponent;

  readonly Permission = Permission;

  ngOnInit(): void {
    this.setFocus();
  }

  setFocus(): void {
    setTimeout(() => this.autocompletePatente.setFocus(), 0);
  }
}
