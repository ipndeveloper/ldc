import { Injectable } from '@angular/core';
import { AdministrarLecturaHumedimetroDataView } from '../../shared/data-models/administrar-lectura-humedimetro-data-view';
import { LecturaHumedimetroDataView } from '../../shared/data-models/lectura-humedimetro-data-view';
import {
  LecturaHumedimetroCommand,
  CrearLecturaHumedimetroCommand,
  ModificarLecturaHumedimetroCommand
} from '../../shared/data-models/commands/cargas-descargas/lectura-humedimetro-command';
import { AdministrableFormService } from '../../core/components/search-form/services/administrable-form.service';
import { ApiService } from '../../core/services/restClient/api.service';
import { Dictionary } from '../../core/models/dictionary';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AdministrarLecturaHumedimetroService
     extends AdministrableFormService<AdministrarLecturaHumedimetroDataView[],
                                      LecturaHumedimetroCommand,
                                      CrearLecturaHumedimetroCommand,
                                      ModificarLecturaHumedimetroCommand,
                                      LecturaHumedimetroDataView> {

  constructor(protected readonly apiService: ApiService) {
    super(apiService);
    this.apiRoute = 'tipos-dispositivos-por-producto';
  }

  public getData(filters: Dictionary<string>): Observable<AdministrarLecturaHumedimetroDataView[]> {
    let query = `${this.apiRoute}/filtros?`;

    query += this.getQuerystringParameter(filters, 'terminal', 'idTerminal');
    query += this.getQuerystringParameter(filters, 'producto', 'idProducto');
    query += this.getQuerystringParameter(filters, 'humedimetro', 'idTipoDispositivo');
    query += this.getQuerystringParameter(filters, 'estaHabilitado', 'habilitado');

    return this.apiService.get<AdministrarLecturaHumedimetroDataView[]>(query);
  }

  public validateSearchClick(filters?: Dictionary<string> | undefined): boolean {
    return filters ? true : false;
  }

  public create(command: CrearLecturaHumedimetroCommand): Observable<void> {
    return this.apiService.post(this.apiRoute, command);
  }

  public update(command: ModificarLecturaHumedimetroCommand): Observable<void> {
    return this.apiService.put(this.apiRoute, command);
  }
}
