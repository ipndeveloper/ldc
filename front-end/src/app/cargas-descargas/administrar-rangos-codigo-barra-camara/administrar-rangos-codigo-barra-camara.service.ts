import { Injectable } from '@angular/core';
import { AdministrarRangosCodigoBarraCamaraDataView } from '../../shared/data-models/administrar-rangos-codigo-barra-camara-data-view';
import { AdministrableFormService } from '../../core/components/search-form/services/administrable-form.service';
import { RangosCodigoBarraCamaraCommand, CrearRangosCodigoBarraCamaraCommand, ModificarRangosCodigoBarraCamaraCommand } from '../../shared/data-models/commands/cargas-descargas/rangos-codigo-barra-camara-command';
import { ApiService } from '../../core/services/restClient/api.service';
import { Dictionary } from '../../core/models/dictionary';
import { Observable } from 'rxjs';
import { PopupService } from '../../core/services/popupService/popup.service';
import { Resources } from '../../../locale/artifacts/resources';

@Injectable({
  providedIn: 'root'
})
export class AdministrarRangosCodigoBarraCamaraService
  extends AdministrableFormService<AdministrarRangosCodigoBarraCamaraDataView[],
                                   RangosCodigoBarraCamaraCommand,
                                   CrearRangosCodigoBarraCamaraCommand,
                                   ModificarRangosCodigoBarraCamaraCommand,
                                   AdministrarRangosCodigoBarraCamaraDataView> {

  constructor(protected readonly apiService: ApiService,
              private readonly popupService: PopupService) {
    super(apiService);
    this.apiRoute = 'codigos-barras';
  }

  public validateSearchClick(filters?: Dictionary<string> | undefined): boolean {
    if (filters && !filters['terminal']) {
      this.popupService.error(Resources.Messages.ElCampoXEsRequeridoParaBuscar.format(Resources.Labels.Terminal));
      return false;
    }
    return true;
  }

  public getData(filters: Dictionary<string>): Observable<AdministrarRangosCodigoBarraCamaraDataView[]> {
    let query = `${this.apiRoute}/filtros?`;

    query += this.getQuerystringParameter(filters, 'terminal', 'idTerminal');
    query += this.getQuerystringParameter(filters, 'vigente', 'vigencia');

    return this.apiService.get<AdministrarRangosCodigoBarraCamaraDataView[]>(query);
  }
}
