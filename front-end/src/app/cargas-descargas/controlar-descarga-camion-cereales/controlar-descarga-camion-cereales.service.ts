import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/restClient/api.service';
import { Observable } from 'rxjs';
import { ControlarDescargaCerealesCommand } from '../../shared/data-models/commands/cargas-descargas/controlar-descarga-camion-cereales-command';
import { DejarPendienteDescargaCamionCerealesCommand } from '../../shared/data-models/commands/cargas-descargas/dejar-pendiente-descarga-camion-cereales-command';
import { ModificarDescargaCerealesFueraPuestoCommand } from '../modificaciones/modificar-control-descarga-camion-cereales/modificar-descarga-camion-cereales-fuera-puesto-command';
import { ModificarDescargaCamionCerealesFueraCircuitoCommand } from '../modificaciones/modificar-control-descarga-camion-cereales/modificar-descarga-camion-cereales-fuera-circuito-command';
import { ModificarDescargaCerealesFueraPuestoBACommand } from '../modificaciones/modificar-control-descarga-camion-cereales/modificar-descarga-camion-cereales-fuera-puesto-ba-command';
import { UrlService } from '../../core/services/restClient/url.service';
import { HttpClient } from '@angular/common/http';
import { RequestOptionsService } from '../../core/services/restClient/requestOptions.service';

@Injectable()
export class ControlarDescargaCamionCerealesService {
  private readonly apiURL = 'control-descarga-camion-cereales';

  constructor(private readonly apiService: ApiService,
              private readonly urlService: UrlService,
              private readonly http: HttpClient,
              private readonly requestOptionsService: RequestOptionsService) { }

  public RegistrarMovimiento(movimiento: ControlarDescargaCerealesCommand): Observable<any> {
    return this.apiService.post<any>(this.apiURL, movimiento);
  }

  public DejarPendiente(movimiento: DejarPendienteDescargaCamionCerealesCommand): Observable<string> {
    return this.apiService.post<string>(this.apiURL + '/dejar-pendiente', movimiento);
  }

  public modificarFueraPuesto(command: ModificarDescargaCerealesFueraPuestoCommand): Observable<string> {
    return this.apiService.post<string>(this.apiURL + '/modificar-fuera-puesto', command);
  }

  public modificarFueraPuestoBA(command: ModificarDescargaCerealesFueraPuestoBACommand): Observable<object> {
    const url = `${this.urlService.getSignalRApiUrl()}/api/balanza/modificar-fuera-puesto`;
    return this.http.post(url, JSON.stringify(command), this.requestOptionsService.apply());
  }

  public modificarFueraCircuito(command: ModificarDescargaCamionCerealesFueraCircuitoCommand): Observable<string> {
    return this.apiService.post<string>(this.apiURL + '/modificar-fuera-circuito', command);
  }
}
