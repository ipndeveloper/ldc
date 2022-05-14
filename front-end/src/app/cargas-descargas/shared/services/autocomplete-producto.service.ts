import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/restClient/api.service';
import { Observable } from 'rxjs';
import { AutocompleteService } from '../../../core/components/autocomplete/autocomplete.service';
import { ProductoAutocomplete } from '../../../shared/data-models/producto-autocomplete';

@Injectable({
  providedIn: 'root'
})
export class AutocompleteProductoService extends AutocompleteService<ProductoAutocomplete> {
  constructor(protected apiService: ApiService) {
    super(apiService);
    this.apiRoute = 'producto';
  }

  public getDataByFilter(filter: string): Observable<ProductoAutocomplete[]> {
    return this.apiService.get(`${this.apiRoute}/autocomplete/${filter}`);
  }
}

