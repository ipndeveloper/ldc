import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Dispositivo } from '../data-models/dispositivo';
import { DropdownComponent } from '../../core/shared/super/dropdown.component';
import { DesplegableDispositivoService } from './desplegable-dispositivo.service';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { EntityWithDescription } from '../../core/models/entity-with-description';
import { Observable } from 'rxjs';

@Component({
  selector: 'yrd-desplegable-dispositivo',
  templateUrl: './desplegable-dispositivo.component.html',
  styleUrls: ['./desplegable-dispositivo.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DesplegableDispositivoComponent }
  ]
})

export class DesplegableDispositivoComponent extends DropdownComponent<Dispositivo>
 implements OnInit, OnChanges {

  @ViewChild('selectDispositivo') select: ElementRef;
  @Input() tipoDispositivo: EntityWithDescription | null;
  @Input() terminal: EntityWithDescription | null;

  constructor(private readonly dispositivoService: DesplegableDispositivoService) {
    super(dispositivoService);
  }

  setFocus() {
    this.select.nativeElement.focus();
  }

  ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);
    this.setValue(undefined as any);
    this.databind();
  }

  getData(): Observable<Dispositivo[]> {
    if (this.terminal) {
      return this.dispositivoService.getByTerminalTipo(this.terminal.id, this.tipoDispositivo);
    }
    if (this.tipoDispositivo) {
      return this.dispositivoService.getAllByTipo(this.tipoDispositivo.id);
    }
    return this.dispositivoService.getAll();
  }
}
