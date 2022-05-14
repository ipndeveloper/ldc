import { Component, ViewChild, ElementRef } from '@angular/core';
import { DesplegableImpresorasPorUsuarioService } from './desplegable-impresoras-por-usuario.service';
import { DropdownComponent } from '../../core/shared/super/dropdown.component';
import { EntityWithDescription } from '../../core/models/entity-with-description';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'yrd-desplegable-impresoras-por-usuario',
  templateUrl: './desplegable-impresoras-por-usuario.component.html',
  styleUrls: ['./desplegable-impresoras-por-usuario.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: DesplegableImpresorasPorUsuarioComponent
  }]
})

export class DesplegableImpresorasPorUsuarioComponent
     extends DropdownComponent<EntityWithDescription> {

  @ViewChild('selectImpresora') select: ElementRef;

  constructor(service: DesplegableImpresorasPorUsuarioService) {
    super(service);
  }

  setFocus() {
    this.select.nativeElement.focus();
  }

}
