import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequestOptionsService } from '../../../app/core/services/restClient/requestOptions.service';
import { UrlService } from '../../../app/core/services/restClient/url.service';
import { ResolverEventoPlataformaDescargaCommand } from '../../../app/shared/data-models/commands/cargas-descargas/resolver-evento-plataforma-descarga-command';
import { ApiService } from '../../../app/core/services/restClient/api.service';
import { ResolverEventoPlataformaDescargaDataView } from '../../../app/shared/data-models/resolver-evento-plataforma-descarga-data-view';

@Injectable({
  providedIn: 'root'
})

export class ResolverPlataformaDescargaService {
  private readonly apiRoute = `resolver-evento`;

  constructor(
    protected readonly apiService: ApiService,
    private readonly http: HttpClient,
    private readonly requestOptionsService: RequestOptionsService,
    private urlService: UrlService
  ) {}

  get(pathArchestra: string) {
    const url = `${this.apiRoute}/plataforma-descarga?pathArchestra=${pathArchestra}`;
    return this.apiService.get<ResolverEventoPlataformaDescargaDataView>(url);
  }

  aprobar(command: ResolverEventoPlataformaDescargaCommand): Observable<object> {
    const url = `${this.urlService.getSignalRApiUrl()}/api/balanza/resolver-evento/plataforma-descarga`;
    return this.http.post(url, JSON.stringify(command), this.requestOptionsService.apply());
  }
}
