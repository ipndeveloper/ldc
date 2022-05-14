import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestOptionsService } from '../../core/services/restClient/requestOptions.service';
import { ApiService } from '../../core/services/restClient/api.service';
import { UrlService } from '../../core/services/restClient/url.service';
import { BADatosSeleccionarBalanzaSalidaDataView } from '../../shared/data-models/ba-datos-seleccionar-balanza-salida-data-view';
import { BASeleccionarBalanzaSalidaCommand } from '../../shared/data-models/commands/cargas-descargas/seleccionar-balanza-salida-command';
import { TiposDispositivo } from '../../shared/enums/enums';
import { BABalanzasDisponiblesDataView } from '../../shared/data-models/ba-balanzas-disponibles-data-view';

@Injectable({
  providedIn: 'root'
})
export class SeleccionarBalanzaSalidaService {
  apiRoute: string;
  endpoint: string;

  constructor(protected readonly api: ApiService,
    private readonly http: HttpClient,
    private urlService: UrlService,
    private readonly requestOptionsService: RequestOptionsService,
    ) {
    this.apiRoute = 'seleccionar-balanza-salida';
  }

  getBalanzasDisponibles(idTerminal: number) {
    const urlPrefix =
      `${this.apiRoute}?IdTerminal=${idTerminal}&EstaHabilitado=${true}&IdTipoDispositivo=${TiposDispositivo.BalanzaCamion}`;

    return this.api.get<BABalanzasDisponiblesDataView[]>(urlPrefix);
  }

  getDatosBalanza(pathArchestra: string): Observable<BADatosSeleccionarBalanzaSalidaDataView> {
    const urlPrefix = `${this.apiRoute}/datos?PathArchestra=${pathArchestra}`;

    return this.api.get<BADatosSeleccionarBalanzaSalidaDataView>(urlPrefix);
  }

  enviarDecision(command: BASeleccionarBalanzaSalidaCommand): Observable<object> {
    const url = `${this.urlService.getSignalRApiUrl()}/api/balanza/resolver-evento/seleccionar-balanza-salida`;
    console.log(command);
    return this.http.post(url, JSON.stringify(command), this.requestOptionsService.apply());
  }
}
