import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResolverEventoTarjetaPatenteNoCoincidenDataView } from '../../shared/data-models/resolver-evento-tarjeta-patente-no-coinciden-data-view';
import { ApiService } from '../../core/services/restClient/api.service';
import { ResolverEventoCommand } from '../../shared/data-models/commands/cargas-descargas/resolver-evento-command';
import { HttpClient } from '@angular/common/http';
import { RequestOptionsService } from '../../core/services/restClient/requestOptions.service';
import { UrlService } from '../../core/services/restClient/url.service';

@Injectable({
  providedIn: 'root'
})
export class ResolverEventoService {
  private readonly apiRoute = `resolver-evento`;
  constructor(
    protected readonly apiService: ApiService,
    private readonly http: HttpClient,
    private readonly requestOptionsService: RequestOptionsService,
    private urlService: UrlService) {
  }

  public get(pathArchestra: string): Observable<object> {
    const url = `${this.apiRoute}?pathArchestra=${pathArchestra}`;

    return this.apiService.get<ResolverEventoTarjetaPatenteNoCoincidenDataView>(url);
  }

  resolver(command: ResolverEventoCommand): Observable<object> {
    const url = `${this.urlService.getSignalRApiUrl()}/api/balanza/resolver-evento/tarjeta-patente-no-coinciden`;
    return this.http.post(url, JSON.stringify(command), this.requestOptionsService.apply());
  }

}
