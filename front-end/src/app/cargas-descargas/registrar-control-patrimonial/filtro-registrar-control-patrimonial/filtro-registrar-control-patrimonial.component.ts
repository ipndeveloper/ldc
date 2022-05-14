import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AutocompletePatenteComponent } from '../../../shared/autocomplete-patente/autocomplete-patente.component';
import { Terminal } from '../../../shared/data-models/terminal';
import { Permission } from '../../../shared/enums/enums';

@Component({
  selector: 'yrd-filtro-registrar-control-patrimonial',
  templateUrl: './filtro-registrar-control-patrimonial.component.html',
  styleUrls: ['./filtro-registrar-control-patrimonial.component.css']
})

export class FiltroRegistrarControlPatrimonialComponent
implements OnInit {
  @Input() disableFiltros: boolean;
  @Input() form: FormGroup;
  @Input() terminal: Terminal;
  @ViewChild('autocompletePatente') autocompletePatente: AutocompletePatenteComponent;

  readonly Permission = Permission;

  ngOnInit(): void {
    this.setFocus();
  }

  setFocus(): void {
    setTimeout(() => this.autocompletePatente.setFocus(), 0);
  }
}
