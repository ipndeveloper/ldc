import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/restClient/api.service';
import { CrearCondicionManipuleoCommand, CondicionManipuleoCommand, ModificarCondicionManipuleoCommand } from '../../shared/data-models/commands/cargas-descargas/condicion-manipuleo-command';
import { Observable } from 'rxjs';
import { GestionarManipuleoGridDataView } from '../../shared/data-models/gestionar-manipuleo-grid-data-view';
import { AdministrableFormService } from '../../core/components/search-form/services/administrable-form.service';
import { Dictionary } from '../../core/models/dictionary';
import { GestionarManipuleoDataView } from '../../shared/data-models/gestionar-manipuleo-data-view';


@Injectable()
export class GestionarManipuleoService
  extends AdministrableFormService<GestionarManipuleoGridDataView[],
                                   CondicionManipuleoCommand,
                                   CrearCondicionManipuleoCommand,
                                   ModificarCondicionManipuleoCommand,
                                   GestionarManipuleoDataView> {

  constructor(protected readonly apiService: ApiService) {
    super(apiService);
    this.apiRoute = 'condicion-manipuleos';
  }

  public validateSearchClick(filters?: Dictionary<string> | undefined): boolean {
    if (filters) {
      if (filters.item('producto')) { return true; }
      if (filters.item('tipoTransporte')) { return true; }
      if (filters.item('tipoMovimiento')) { return true; }
    }
    return false;
  }

  public getData(filters: Dictionary<string>): Observable<GestionarManipuleoGridDataView[]> {
    let query = `${this.apiRoute}/gestionar?`;

    query += this.getQuerystringParameter(filters, 'producto', 'idProducto');
    query += this.getQuerystringParameter(filters, 'tipoTransporte', 'idTipoTransporte');
    query += this.getQuerystringParameter(filters, 'tipoMovimiento', 'idTipoMovimiento');

    return this.apiService.get<Array<GestionarManipuleoGridDataView>>(query);
  }

  public validarCondicionManipuleoACambiarOEliminar(id: number): Observable<boolean> {
    const apiRoute = `/movimientos/validar-manipuleo?IdCondicionManipuleo=${id}`;

    return this.apiService.get<boolean>(apiRoute);
  }
}
