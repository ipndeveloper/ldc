import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/restClient/api.service';
import { ReembolsoTasaMunicipalCommand } from '../../shared/data-models/commands/cargas-descargas/reembolso-tasa-municipal-command';

@Injectable({
  providedIn: 'root'
})
export class ReembolsoTasaMunicipalService  {

  private readonly url: string = 'reembolso-tasa-municipal?';

  constructor(private readonly apiService: ApiService) {
  }

  registrarReembolso(command: ReembolsoTasaMunicipalCommand) {
    return this.apiService.put<string>(this.url, command);
  }
}
