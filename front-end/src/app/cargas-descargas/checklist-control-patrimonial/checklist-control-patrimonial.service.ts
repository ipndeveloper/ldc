import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/restClient/api.service';
import { Observable } from 'rxjs';
import { ChecklistControlPatrimonialCommand } from '../../shared/data-models/commands/cargas-descargas/checklist-control-patrimonial-command';
import { ChecklistControlPatrimonialDataView } from '../../shared/data-models/checklist-control-patrimonial-data-view';

@Injectable({
  providedIn: 'root'
})

export class ChecklistControlPatrimonialService {

  private readonly url: string = 'actualizar-checklist-control-patrimonial';

  constructor(private readonly apiService: ApiService) {}

  getMovimiento(patenteCamion: string | null,
                idMovimiento: number | null = null): Observable<ChecklistControlPatrimonialDataView> {
    let apiUrl: string;
    patenteCamion ? apiUrl = `${this.url}?patentecamion=${patenteCamion}` : apiUrl = `${this.url}?idmovimiento=${idMovimiento}`;

    return this.apiService.get<ChecklistControlPatrimonialDataView>(apiUrl);
  }

  actualizarControlPatrimonial(command: ChecklistControlPatrimonialCommand) {
    const apiUrl = `${this.url}/${command.id}`;

    return this.apiService.post<string>(apiUrl, command);
  }
}
