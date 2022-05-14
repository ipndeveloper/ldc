import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DropdownComponent } from '../../core/shared/super/dropdown.component';
import { TipoEvento } from '../data-models/tipo-evento';
import { DesplegableEventoService } from './desplegable-evento.service';

@Component({
  selector: 'yrd-desplegable-evento',
  templateUrl: './desplegable-evento.component.html',
  styleUrls: ['./desplegable-evento.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DesplegableEventoComponent }
  ]
})
export class DesplegableEventoComponent extends DropdownComponent<TipoEvento>
 implements OnInit {

  @ViewChild('selectTipoEvento') select: ElementRef;
  @Input() permiso: string;

  constructor(eventoService: DesplegableEventoService) {
    super(eventoService);
  }

  setFocus() {
    this.select.nativeElement.focus();
  }
}
