import { Component, Input } from '@angular/core';
import { AutocompleteComponent } from '../../core/components/autocomplete/autocomplete.component';
import { ProductoAutocomplete } from '../data-models/producto-autocomplete';
import { TipoProducto } from '../data-models/tipo-producto';
import { AutocompleteProductoService } from '../../cargas-descargas/shared/services/autocomplete-producto.service';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'yrd-autocomplete-producto',
  templateUrl: './../../core/components/autocomplete/autocomplete.component.html',
  styleUrls: ['./../../core/components/autocomplete/autocomplete.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: AutocompleteProductoComponent }
  ]
})
export class AutocompleteProductoComponent extends AutocompleteComponent<ProductoAutocomplete> {
  @Input() tipoProducto: TipoProducto;
  @Input() filtraPorImputacionStock = false;

  constructor(protected productoService: AutocompleteProductoService) {
    super();
    this.etiqueta = 'Producto';
  }

  getDataByFilter(textSearch: string) {
    let query = `?descripcion=${textSearch}`;
    if (this.tipoProducto) {
      query = query.concat(`&idTipoProducto=${this.tipoProducto.id}`);
    } else {
      query = query.concat(`&filtraPorImputacionStock=${this.filtraPorImputacionStock}`);
    }
    return this.productoService.getDataByFilter(query);
  }

}
