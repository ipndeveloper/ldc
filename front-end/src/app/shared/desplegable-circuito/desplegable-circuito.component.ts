import { Component, ViewChild, ElementRef, OnInit, Input } from '@angular/core';
import { DropdownComponent } from '../../core/shared/super/dropdown.component';
import { Circuitos } from '../data-models/circuitos';
import { DesplegableCircuitoService } from './desplegable-circuito.service';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'yrd-desplegable-circuito',
  templateUrl: './desplegable-circuito.component.html',
  styleUrls: ['./desplegable-circuito.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DesplegableCircuitoComponent }
  ]
})
export class DesplegableCircuitoComponent extends DropdownComponent<Circuitos> implements OnInit {

  @Input() soloHabilitados = false;
  @Input() permiso: string;
  @ViewChild('selectCircuito') select: ElementRef;

  constructor(private readonly desplegableCircuitoService: DesplegableCircuitoService) {
    super(desplegableCircuitoService);
  }

  setFocus() {
    this.select.nativeElement.focus();
  }

  protected getData(): Observable<Circuitos[]> {
    if (this.permiso) {
      return this.desplegableCircuitoService.getAllByPermiso(this.permiso, this.soloHabilitados);
    } else if (this.soloHabilitados) {
      return this.desplegableCircuitoService.getAllHabilitados();
    } else {
      return this.desplegableCircuitoService.getAll();
    }
  }
}
