import { Component, Input, OnChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';

import { CampoEpaSustentable } from '../data-models/campo-epa-sustentable';
import { CampoEpaSustentableService } from './campo-epa-sustentable.service';
import { DropdownComponent } from '../../core/shared/super/dropdown.component';
import { Titular } from '../data-models/titular';
import { Producto } from '../data-models/producto';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'yrd-desplegable-campo-epa-sustentable',
  templateUrl: './desplegable-campo-epa-sustentable.component.html',
  styleUrls: ['./desplegable-campo-epa-sustentable.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DesplegableCampoEpaSustentableComponent }
  ]
})
export class DesplegableCampoEpaSustentableComponent extends DropdownComponent<CampoEpaSustentable>  implements OnChanges {
  @Input() producto: Producto;
  @Input() titular: Titular;
  @Input() control: FormControl;
  @Input() fillCampoEpa: boolean;
  @Input() cssClassControl = 'col-sm-9';
  @Input() fechaACompararVigenciaCampoEpa: Date;
  productoAnterior: Producto;
  titularAnterior: Titular;
  campoEpaService: CampoEpaSustentableService;

  constructor(campoEpaService: CampoEpaSustentableService) {
    super(campoEpaService);

    this.campoEpaService = campoEpaService;
    this.productoAnterior = new Producto(0, '', '', false);
    this.titularAnterior = new Titular(0, '', '', 0);
  }

  ngOnChanges(): void {
    if (this.producto && this.titular && this.fillCampoEpa) {
      if (this.producto.id !== this.productoAnterior.id || this.titular.id !== this.titularAnterior.id) {
        this.databind();
        this.productoAnterior = this.producto;
        this.titularAnterior = this.titular;
      }
    } else {
      this.clear();
      if (this.producto) {
        this.titularAnterior = new Titular(0, '', '', 0);
      } else {
        this.productoAnterior = new Producto(0, '', '', false);
      }
    }
  }

  protected getData(): Observable<CampoEpaSustentable[]> {
    if (this.producto && this.titular) {
      return this.campoEpaService.getCampoEpaSustentablePorProductoYTitular(this.producto.id,
                                                                            this.titular.id);
    } else {
      return of([]);
    }
  }
}
