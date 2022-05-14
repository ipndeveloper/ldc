import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'yrd-filtro-busqueda-reimpresion-ticket-pesaje',
  templateUrl: './filtro-busqueda-reimpresion-ticket-pesaje.component.html',
  styleUrls: ['./filtro-busqueda-reimpresion-ticket-pesaje.component.css']
})
export class FiltroBusquedaReimpresionTicketPesajeComponent implements OnInit {

  @Input() filtrosForm: FormGroup;

  constructor() { }

  ngOnInit() {
  }


}
