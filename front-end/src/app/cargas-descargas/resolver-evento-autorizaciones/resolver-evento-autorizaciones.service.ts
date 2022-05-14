import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BA_ResolverEventosAutorizaORechazaCamionDataView } from '../../shared/data-models/resolver-eventos-autoriza-rechaza';
import { ApiService } from '../../core/services/restClient/api.service';
import { ResolverEventoAutorizacionesCommand } from '../../shared/data-models/commands/cargas-descargas/resolver-evento-autorizaciones-command';
import { HttpClient } from '@angular/common/http';
import { RequestOptionsService } from '../../core/services/restClient/requestOptions.service';
import { UrlService } from '../../core/services/restClient/url.service';

@Injectable({
  providedIn: 'root'
})
export class ResolverEventoAutorizacionesService {
  private readonly apiRoute = `resolver-evento/autoriza-rechaza`;

  constructor(
    protected readonly apiService: ApiService,
    private readonly http: HttpClient,
    private readonly requestOptionsService: RequestOptionsService,
    private readonly urlService: UrlService) {
  }

  get(pathArchestra: string): Observable<object> {
    const url = `${this.apiRoute}?pathArchestra=${pathArchestra}`;

    return this.apiService.get<BA_ResolverEventosAutorizaORechazaCamionDataView>(url);
  }

  getRoles(idMotivoErrorBalanza: number,
          idTipoMovimiento: number,
          idTipoTransporte: number,
          idCircuito: number,
          esEntrada: boolean): Observable<object> {
    const url = `dashboard/balanza/roles?IdMotivoErrorBalanza=${idMotivoErrorBalanza}
    &IdTipoMovimiento=${idTipoMovimiento}&IdTipoTransporte=${idTipoTransporte}
    &IdCircuito=${idCircuito}&EsEntrada=${esEntrada}`;
    return this.apiService.get<any>(url);
  }

  resolver(command: ResolverEventoAutorizacionesCommand): Observable<object> {
    const url = `${this.urlService.getSignalRApiUrl()}/api/balanza/resolver-evento/autorizaciones`;

    return this.http.post(url, JSON.stringify(command), this.requestOptionsService.apply());
  }
}
