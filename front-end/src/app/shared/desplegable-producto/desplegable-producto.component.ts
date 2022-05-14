import { Component, ViewChild, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DropdownComponent } from '../../core/shared/super/dropdown.component';
import { DesplegableProductoService } from './desplegable-producto.service';
import { DesplegableProducto } from './desplegable-producto';

@Component({
  selector: 'yrd-desplegable-producto',
  templateUrl: './desplegable-producto.component.html',
  styleUrls: ['./desplegable-producto.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DesplegableProductoComponent }
  ]
})
export class DesplegableProductoComponent extends DropdownComponent<DesplegableProducto> {

  @ViewChild('selectProducto') select: ElementRef;

  constructor(service: DesplegableProductoService) {
    super(service);
   }

  setFocus() {
    setTimeout(() => {
      this.select.nativeElement.focus();
    }, 0);
  }

}
