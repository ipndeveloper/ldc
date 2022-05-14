import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/restClient/api.service';
import { Observable } from 'rxjs';
import { ControlarDescargaCamionInsumosVariosCommand } from '../../shared/data-models/commands/cargas-descargas/controlar-descarga-camion-insumos-varios-command';

@Injectable({
  providedIn: 'root'
})

export class ControlarDescargaCamionInsumosService {
  private readonly apiURLInsumos = 'control-descarga-camion-insumos';
  private readonly apiURLVarios = 'control-descarga-camion-transportes-varios';

  constructor(private readonly apiService: ApiService) {
  }

  public registrarMovimiento(command: ControlarDescargaCamionInsumosVariosCommand, esVarios: boolean): Observable<number> {
    const apiUrl = esVarios ? this.apiURLVarios : this.apiURLInsumos;
    return this.apiService.post<number>(apiUrl, command);
  }

  public dejarPendiente(command: ControlarDescargaCamionInsumosVariosCommand, esVarios: boolean): Observable<void> {
    const apiUrl = esVarios ? this.apiURLVarios : this.apiURLInsumos;
    return this.apiService.post<void>(`${apiUrl}/dejar-pendiente`, command);
  }
}
