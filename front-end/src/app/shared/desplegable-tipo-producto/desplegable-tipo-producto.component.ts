import { Component, Input, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { DropdownComponent } from '../../core/shared/super/dropdown.component';
import { TipoProducto } from '../data-models/tipo-producto';
import { TipoProductoService } from './tipo-producto.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'yrd-desplegable-tipo-producto',
  templateUrl: './desplegable-tipo-producto.component.html',
  styleUrls: ['./desplegable-tipo-producto.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DespegableTipoProductoComponent }
  ]
})
export class DespegableTipoProductoComponent extends DropdownComponent<TipoProducto> implements OnChanges {

  @Input() completarTipoProducto = true;
  @Input() subproductos = false;
  @Input() insumosVarios = false;
  @Input() conCupo = false;
  @Input() etiqueta = 'Tipo Prod.';

  @ViewChild('selectTipoProducto') selectTipoProducto: ElementRef;

  constructor(protected readonly tipoProductoService: TipoProductoService) {
    super(tipoProductoService);
  }

  ngOnChanges() {
    this.databind();
  }

  getData(): Observable<TipoProducto[]> {
    if (this.completarTipoProducto) {
      if (this.subproductos) {
        return this.tipoProductoService.getSubproductos();
      }
      if (this.insumosVarios) {
        return this.tipoProductoService.getInsumosVarios();
      }
      if (this.conCupo) {
        return this.tipoProductoService.getConCupo();
      }
    }
    return super.getData();
  }

  setFocus(): void {
    this.selectTipoProducto.nativeElement.focus();
  }
}
