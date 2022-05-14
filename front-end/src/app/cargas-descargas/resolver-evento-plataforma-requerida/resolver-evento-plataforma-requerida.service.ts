import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosBalanzaDataView } from '../../../app/shared/data-models/datos-balanza-data-view';
import { ApiService } from '../../../app/core/services/restClient/api.service';
import { PlataformaBalanzaDataView } from '../../../app/shared/data-models/plataforma-balanza-data-view';
import { ResolverEventoPlataformaRequeridaCommand } from '../../../app/shared/data-models/commands/cargas-descargas/resolver-evento-plataforma-requerida-command';
import { UrlService } from '../../../app/core/services/restClient/url.service';
import { HttpClient } from '@angular/common/http';
import { RequestOptionsService } from '../../../app/core/services/restClient/requestOptions.service';

@Injectable({
  providedIn: 'root'
})
export class ResolverEventoPlataformaRequerdidaService {

  private readonly apiUrl = 'plataforma-descarga';

  constructor(private readonly apiService: ApiService,
    private urlService: UrlService,
    private readonly http: HttpClient,
    private readonly requestOptionsService: RequestOptionsService) { }

  obtenerPlataformasRequeridas(pathArchestra: string): Observable<PlataformaBalanzaDataView[]> {
    const url = `${this.apiUrl}/requeridas?`;
    return this.apiService.get(url + 'pathArchestra=' + pathArchestra);
  }

  obtenerDatosBalanza(pathArchestra: string): Observable<DatosBalanzaDataView> {
    const url = `${this.apiUrl}/datos-balanza?`;
    return this.apiService.get(url + 'pathArchestra=' + pathArchestra);
  }

  aprobarRechazar(command: ResolverEventoPlataformaRequeridaCommand): Observable<object> {
    const url = `${this.urlService.getSignalRApiUrl()}/api/balanza/resolver-evento/plataforma-requerida`;
    return this.http.post(url, JSON.stringify(command), this.requestOptionsService.apply());
  }
}

