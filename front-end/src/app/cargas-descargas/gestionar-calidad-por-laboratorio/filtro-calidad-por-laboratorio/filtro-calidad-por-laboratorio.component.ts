import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { tiposProducto } from '../../../shared/data-models/tipo-producto';

@Component({
  selector: 'yrd-filtro-calidad-por-laboratorio',
  templateUrl: './filtro-calidad-por-laboratorio.component.html',
  styleUrls: ['./filtro-calidad-por-laboratorio.component.css']
})
export class FiltroCalidadPorLaboratorioComponent {
  @Input() filtrosForm: FormGroup;
  tipoProducto = tiposProducto[2];

  constructor() { }

}
