import { Injectable } from '@angular/core';
import { EntityService } from '../../core/shared/super/entity.service';
import { GrupoRubroCalidadAnalisis } from '../data-models/grupo-rubro-calidad-analisis';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/services/restClient/api.service';

@Injectable()
export class GrupoRubroAnalisisService extends EntityService<GrupoRubroCalidadAnalisis> {
  constructor(protected readonly apiService: ApiService) {
    super();
  }

  getGruposRubroAnalisisPorProducto(idProducto: number, idTerminal: number | null = null): Observable<GrupoRubroCalidadAnalisis[]> {
    let url = 'grupos-rubros-analisis?idProducto=' + idProducto;
    if (idTerminal !== null) {
      url += '&idTerminal=' + idTerminal;
    }
    return this.apiService.get<GrupoRubroCalidadAnalisis[]>(url);
  }
}
