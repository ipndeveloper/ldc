import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/services/restClient/api.service';
import { ModificarParametrosPorTerminalCommand } from '../../shared/data-models/commands/cargas-descargas/modificar-parametros-por-terminal-command';
import { AdministrableFormService } from '../../core/components/search-form/services/administrable-form.service';
import { ParametrosPorTerminalCommand, CrearParametrosPorTerminalCommand } from '../../shared/data-models/commands/cargas-descargas/parametros-por-terminal-command';
import { ParametrosTerminalDataView } from '../../shared/data-models/parametros-terminal-data-view';
import { Dictionary } from '../../core/models/dictionary';
import { ParametrosPorTerminal } from '../../shared/data-models/parametros-por-terminal';

@Injectable({
  providedIn: 'root'
})

export class AdministrarParametrosPorTerminalService extends AdministrableFormService<Array<ParametrosTerminalDataView>,
ParametrosPorTerminalCommand,
CrearParametrosPorTerminalCommand,
ModificarParametrosPorTerminalCommand,
ParametrosPorTerminal> {

  codigoPermiso: string;
  incluirAdministracionCentral: boolean;

  constructor(protected readonly apiService: ApiService) {
    super(apiService);
    this.apiRoute = 'parametros-terminal';
  }

  public getData(data): Observable<ParametrosTerminalDataView[]> {
    return this.buscarParametrosPorTerminal(data);
  }

  public validateSearchClick(filters?: Dictionary<string> | undefined): boolean {
    if (filters) {
      return true;
    }
    return false;
  }

  buscarParametrosPorTerminal(filters: Dictionary<string>): Observable<any> {
    let query = `${this.apiRoute}/buscar?`;
    query += `codigoPermiso=${this.codigoPermiso}`;
    query += `&incluirAdministracionCentral=${this.incluirAdministracionCentral}`;
    query += this.getQuerystringParameter(filters, 'terminal', 'idTerminal');

    return this.apiService.get(query);
  }

  modificarParametros(command: ModificarParametrosPorTerminalCommand): Observable<any> {
    return this.apiService.put(`${this.apiRoute}`, command);
  }
}
