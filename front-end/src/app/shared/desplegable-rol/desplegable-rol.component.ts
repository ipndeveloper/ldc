import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DropdownComponent } from '../../core/shared/super/dropdown.component';
import { RolService } from './rol.service';
import { Rol } from '../data-models/rol';
import { Observable } from 'rxjs';

@Component({
  selector: 'yrd-desplegable-rol',
  templateUrl: './desplegable-rol.component.html',
  styleUrls: ['./desplegable-rol.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DesplegableRolComponent }
  ]
})
export class DesplegableRolComponent extends DropdownComponent<Rol> {

  @Input() tieneEtiqueta = false;
  @Input() soloHabilitados = false;
  @ViewChild('rol') rol: ElementRef;

  constructor(private readonly service: RolService) {
    super(service);
  }

  setFocus() {
    this.rol.nativeElement.focus();
  }

  protected getData(): Observable<Rol[]> {
    if (this.soloHabilitados) {
      return this.service.getAllHabilitados();
    } else {
      return this.service.getAll();
    }
  }
}

