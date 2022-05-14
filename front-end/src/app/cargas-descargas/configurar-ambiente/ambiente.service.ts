import { Injectable } from '@angular/core';
import { AdministrableFormService } from '../../core/components/search-form/services/administrable-form.service';
import { AmbienteDataView } from '../../shared/data-models/ambiente-data-view';
import { AmbienteCommand, CrearAmbienteCommand, ModificarAmbienteCommand, AdministrarAmbienteDataView } from '../../shared/data-models/commands/cargas-descargas/ambiente-command';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/services/restClient/api.service';

@Injectable({
  providedIn: 'root'
})
export class AmbienteService extends AdministrableFormService<AmbienteDataView,
                                     AmbienteCommand,
                                     CrearAmbienteCommand,
                                     ModificarAmbienteCommand,
                                     AdministrarAmbienteDataView> {

  constructor(private readonly apiService: ApiService) {
    super(apiService);
    this.apiRoute = 'ambiente';
  }

  public getData(): Observable<AmbienteDataView> {
    return this.apiService.get<AmbienteDataView>('ambiente');
  }

  public validateSearchClick(): boolean {
    return true;
  }

}
