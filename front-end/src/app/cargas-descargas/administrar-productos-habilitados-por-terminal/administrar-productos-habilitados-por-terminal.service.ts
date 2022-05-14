import { Injectable } from '@angular/core';
import { AdministrarProductosHablitadosPorTerminalDataView } from '../../shared/data-models/administrar-productos-habilitados-por-terminal-data-view';
import { AdministrableFormService } from '../../core/components/search-form/services/administrable-form.service';
import { Observable } from 'rxjs';
import { Dictionary } from '../../core/models/dictionary';
import { ApiService } from '../../core/services/restClient/api.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { ProductosHablitadosPorTerminalDataView } from '../../shared/data-models/productos-hablitados-por-terminal-data-view';
import { RubroPorTerminalDataView } from '../../shared/data-models/rubro-por-terminal-data-view';
import { CrearProductoHabilitadoPorTerminalCommand, ModificarProductoHabilitadoPorTerminalCommand, ProductoHabilitadoPorTerminalCommand } from '../../shared/data-models/commands/cargas-descargas/producto-habilitado-por-terminal-command';

@Injectable({
  providedIn: 'root'
})
export class AdministrarProductosHabilitadosPorTerminalService extends
                                      AdministrableFormService<Array<AdministrarProductosHablitadosPorTerminalDataView>,
                                      ProductoHabilitadoPorTerminalCommand,
                                      CrearProductoHabilitadoPorTerminalCommand,
                                      ModificarProductoHabilitadoPorTerminalCommand,
                                      ProductosHablitadosPorTerminalDataView> {

  constructor(protected readonly apiService: ApiService,
              protected readonly popupService: PopupService) {
    super(apiService);
    this.apiRoute = 'terminales';
  }

  public getData(filters: Dictionary<string>): Observable<AdministrarProductosHablitadosPorTerminalDataView[]> {
    let query = `${this.apiRoute}/filtro?`;

    query += this.getQuerystringParameter(filters, 'terminal', 'idTerminal');
    query += this.getQuerystringParameter(filters, 'habilitado');
   return this.apiService.get<AdministrarProductosHablitadosPorTerminalDataView[]>(query);
  }

  public validateSearchClick(filters?: Dictionary<string>): boolean {
    if (filters) {
      return true;
    }
    return false;
  }

  public getProductoPorTerminal(idProduct: number, idTerminal: number): Observable<ProductosHablitadosPorTerminalDataView> {
    return this.apiService.get<ProductosHablitadosPorTerminalDataView>
                    (`${this.apiRoute}/Producto?&IdProducto=${idProduct}&IdTerminal=${idTerminal}`);
  }
  public getRubroCalidadPorTerminalYProducto(idProduct: number, idTerminal: number): Observable<RubroPorTerminalDataView[]> {
    return this.apiService.get<RubroPorTerminalDataView[]>
                    (`${this.apiRoute}/rubro-calidad?&IdProducto=${idProduct}&IdTerminal=${idTerminal}`);
  }

  create(command: CrearProductoHabilitadoPorTerminalCommand): Observable<void> {
    return this.api.post(`${this.apiRoute}/Producto`, command);
  }

  update(command: ModificarProductoHabilitadoPorTerminalCommand): Observable<void> {
    return this.api.put(`${this.apiRoute}/Producto`, command);
  }

}
