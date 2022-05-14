import { Component, Input, ElementRef, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';

import { DropdownComponent } from '../../core/shared/super/dropdown.component';
import { PlataformaDescargaService } from './plataforma-descarga.service';
import { PlataformaDescarga } from '../data-models/plataforma-descarga';

@Component({
  selector: 'yrd-desplegable-plataforma-descarga',
  templateUrl: './desplegable-plataforma-descarga.component.html',
  styleUrls: ['./desplegable-plataforma-descarga.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DesplegablePlataformaDescargaComponent }
  ]
})
export class DesplegablePlataformaDescargaComponent extends DropdownComponent<PlataformaDescarga> {

  @Input() etiqueta = 'Ingrese etiqueta';
  @Input() control: FormControl;
  @ViewChild('selectPlataformaDescarga') selectPlataformaElement: ElementRef;

  constructor(plataformaDescargaService: PlataformaDescargaService) {
    super(plataformaDescargaService);
  }

  setFocus() {
    this.selectPlataformaElement.nativeElement.focus();
  }
}
