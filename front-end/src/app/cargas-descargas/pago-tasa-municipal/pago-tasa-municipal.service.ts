import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/restClient/api.service';
import { Observable } from 'rxjs';
import { PagoTasaMunicipalCommand } from '../../shared/data-models/commands/cargas-descargas/pago-tasa-municipal-command';
import { PagoTasaMunicipalDataView } from '../../shared/data-models/pago-tasa-municipal-data-view';
import { Dictionary } from '../../core/models/dictionary';
import { SearchFormService } from '../../core/components/search-form/services/search-form.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { Resources } from '../../../locale/artifacts/resources';

@Injectable({
  providedIn: 'root'
})
export class PagoTasaMunicipalService extends SearchFormService<PagoTasaMunicipalDataView> {
  private readonly url: string = 'pago-tasa-municipal?';

  constructor(private readonly apiService: ApiService,
    private readonly popupService: PopupService) {
    super();
  }

  validateSearchClick(filters: Dictionary<string>) {
    if (filters) {
      if (filters['tarjeta']) { return true; }
      if (filters['patenteCamion']) { return true; }
    }
    this.popupService.error(Resources.Messages.DebeSeleccionarAlMenosUnFiltro,
      Resources.Labels.Buscar);
    return false;
  }

  public getData(filters: Dictionary<string>): Observable<PagoTasaMunicipalDataView> {
    this.apiRoute = this.url;

    this.apiRoute += this.getQuerystringParameter(filters, 'tarjeta');
    this.apiRoute += this.getQuerystringParameter(filters, 'patenteCamion');

    return this.apiService.get<PagoTasaMunicipalDataView>(this.apiRoute);
  }

  registrarPago(command: PagoTasaMunicipalCommand) {
    return this.apiService.post<string>(this.url, command);
  }
}
