import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DropdownComponent } from '../../core/shared/super/dropdown.component';
import { EntityWithDescription } from '../../core/models/entity-with-description';
import { DesplegableCamaraService } from './desplegable-camara.service';

@Component({
  selector: 'yrd-desplegable-camara',
  templateUrl: './desplegable-camara.component.html',
  styleUrls: ['./desplegable-camara.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DesplegableCamaraComponent }
  ]
})
export class DesplegableCamaraComponent extends DropdownComponent<EntityWithDescription> {

  @ViewChild('selectCamara') select: ElementRef;
  @Input() etiqueta = 'Cámara';

  constructor(service: DesplegableCamaraService) {
    super(service);
  }

  setFocus() {
    setTimeout(() => {
      this.select.nativeElement.focus();
    }, 0);
  }
}
