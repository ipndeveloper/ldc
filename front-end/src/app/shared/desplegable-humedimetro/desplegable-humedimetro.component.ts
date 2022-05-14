import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DropdownComponent } from '../../core/shared/super/dropdown.component';
import { Humedimetro } from '../data-models/Humedimetro';
import { HumedimetroService } from './desplegable-humedimetro.service';

@Component({
  selector: 'yrd-desplegable-humedimetro',
  templateUrl: './desplegable-humedimetro.component.html',
  styleUrls: ['./desplegable-humedimetro.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DesplegableHumedimetroComponent }
  ]
})
export class DesplegableHumedimetroComponent extends DropdownComponent<Humedimetro>
implements OnInit {
  @ViewChild('selectTipoDispositivo') select: ElementRef;

  constructor(humedimetroService: HumedimetroService) {
    super(humedimetroService);
  }

  setFocus() {
    this.select.nativeElement.focus();
  }
}
