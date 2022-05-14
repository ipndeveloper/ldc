import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { DropdownComponent } from '../../core/shared/super/dropdown.component';
import { GradoService } from './desplegable-grado.service';
import { Grado } from '../data-models/grado';

@Component({
  selector: 'yrd-desplegable-grado',
  templateUrl: './desplegable-grado.component.html',
  styleUrls: ['./desplegable-grado.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DesplegableGradoComponent }
  ]
})

export class DesplegableGradoComponent extends DropdownComponent<Grado> {

  @Input() etiqueta = 'Ingrese etiqueta';
  @Input() control: FormControl;

  constructor(gradoService: GradoService) {
    super(gradoService);
  }
}
