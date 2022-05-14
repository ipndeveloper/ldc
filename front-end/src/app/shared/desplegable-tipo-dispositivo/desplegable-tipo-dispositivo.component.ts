import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DropdownComponent } from '../../core/shared/super/dropdown.component';
import { TipoDispositivo } from '../data-models/tipo-dispositivo';
import { TiposDispositivoService } from './desplegable-tipo-dispositivo.service';

@Component({
  selector: 'yrd-desplegable-tipo-dispositivo',
  templateUrl: './desplegable-tipo-dispositivo.component.html',
  styleUrls: ['./desplegable-tipo-dispositivo.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DesplegableTipoDispositivoComponent }
  ]
})

export class DesplegableTipoDispositivoComponent extends DropdownComponent<TipoDispositivo>
 implements OnInit {

  @ViewChild('selectTipoDispositivo') select: ElementRef;

  constructor(terminalService: TiposDispositivoService) {
    super(terminalService);
  }

  setFocus() {
    this.select.nativeElement.focus();
  }
}
