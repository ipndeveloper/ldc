import { Injectable } from '@angular/core';
import { ControlarDescargaCamionInsumosFueraDePuestoCommand } from '../../../shared/data-models/commands/cargas-descargas/controlar-descarga-camion-insumos-fuera-de-puesto-command';
import { ApiService } from '../../../core/services/restClient/api.service';
import { ControlarDescargaCamionInsumosFueraDeCircuitoCommand } from '../../../shared/data-models/commands/cargas-descargas/controlar-descarga-camion-insumos-fuera-de-circuito-command';
import { Observable } from 'rxjs';
import { ModificarDescargaInsumosFueraPuestoBACommand } from './modificar-descarga-camion-insumos-fuera-puesto-ba-command';
import { UrlService } from '../../../core/services/restClient/url.service';
import { HttpClient } from '@angular/common/http';
import { RequestOptionsService } from '../../../core/services/restClient/requestOptions.service';

@Injectable({
  providedIn: 'root'
})
export class ModificarControlDescargaCamionInsumosService {
  private readonly apiURLInsumos = 'control-descarga-camion-insumos';
  private readonly apiURLVarios = 'control-descarga-camion-transportes-varios';

  constructor(private readonly apiService: ApiService,
              private readonly urlService: UrlService,
              private readonly http: HttpClient,
              private readonly requestOptionsService: RequestOptionsService) {
  }

  public ModificarFueraDePuesto(movimiento: ControlarDescargaCamionInsumosFueraDePuestoCommand, esVarios: boolean): Observable<void> {
    const apiUrl = esVarios ? this.apiURLVarios : this.apiURLInsumos;
    return this.apiService.post<void>(apiUrl + '/modificar-fuera-de-puesto', movimiento);
  }

  public ModificarFueraDePuestoBA(command: ModificarDescargaInsumosFueraPuestoBACommand): Observable<object> {
    const url = `${this.urlService.getSignalRApiUrl()}/api/balanza/modificar-fuera-puesto`;
    return this.http.post(url, JSON.stringify(command), this.requestOptionsService.apply());
  }

  public ModificarFueraCircuito(command: ControlarDescargaCamionInsumosFueraDeCircuitoCommand, esVarios: boolean): Observable<void> {
    const apiUrl = esVarios ? this.apiURLVarios : this.apiURLInsumos;
    return this.apiService.post<void>(apiUrl + '/modificar-fuera-circuito', command);
  }
}
