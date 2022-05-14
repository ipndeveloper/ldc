import { Injectable } from '@angular/core';
import { AdministrableFormService } from '../../core/components/search-form/services/administrable-form.service';
import { ApiService } from '../../core/services/restClient/api.service';
import { Dictionary } from '../../core/models/dictionary';
import { Observable } from 'rxjs';
import { AdministrarTipoDocumentoPorteTipoProductoDataView } from '../../shared/data-models/administrar-tipo-documento-porte-tipo-producto-data-view';
import { TipoDocumentoPorteTipoProductoCommand, CrearTipoDocumentoPorteTipoProductoCommand, ModificarTipoDocumentoPorteTipoProductoCommand } from '../../shared/data-models/commands/cargas-descargas/tipo-documento-porte-tipo-producto-command';
import { TipoDocumentoPorteTipoProductoDataView } from '../../shared/data-models/tipo-documento-porte-tipo-producto-data-view';

@Injectable({
  providedIn: 'root'
})
export class AdministrarTipoDocumentoPorteTipoProductoService
  extends AdministrableFormService<Array<AdministrarTipoDocumentoPorteTipoProductoDataView>,
                                   TipoDocumentoPorteTipoProductoCommand,
                                   CrearTipoDocumentoPorteTipoProductoCommand,
                                   ModificarTipoDocumentoPorteTipoProductoCommand,
                                   TipoDocumentoPorteTipoProductoDataView> {

  constructor(protected readonly apiService: ApiService) {
    super(apiService);
    this.apiRoute = 'tipo-documento-porte-tipo-producto-terminal';
  }

  public validateSearchClick(filters?: Dictionary<string> | undefined): boolean {
    if (filters) {
      return true;
    }
    return false;
  }

  public getData(filters: Dictionary<string>): Observable<Array<AdministrarTipoDocumentoPorteTipoProductoDataView>> {
    let query = `${this.apiRoute}/filtros?`;

    query += this.getQuerystringParameter(filters, 'terminal', 'idTerminal');
    query += this.getQuerystringParameter(filters, 'tipoDocumentoPorte', 'idTipoDocumentoPorte');
    query += this.getQuerystringParameter(filters, 'tipoProducto', 'idTipoProducto');
    query += this.getQuerystringParameter(filters, 'habilitado');

    return this.apiService.get<Array<AdministrarTipoDocumentoPorteTipoProductoDataView>>(query);
  }
}
