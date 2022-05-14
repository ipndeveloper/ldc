import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/restClient/api.service';
import { Observable } from 'rxjs/internal/Observable';
import { ReembolsoTasaMunicipalCommand } from '../../shared/data-models/commands/cargas-descargas/reembolso-tasa-municipal-command';
import { ReembolsoTasaMunicipalDataView } from '../../shared/data-models/reembolso-tasa-municipal-data-view';
import { Dictionary } from '../../core/models/dictionary';
import { SearchFormService } from '../../core/components/search-form/services/search-form.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { Resources } from '../../../locale/artifacts/resources';

@Injectable({
  providedIn: 'root'
})
export class ReembolsoTasaMunicipalService extends SearchFormService<ReembolsoTasaMunicipalDataView> {

  private readonly url: string = 'reembolso-tasa-municipal?';

  constructor(private readonly apiService: ApiService,
              private readonly popupService: PopupService) {
                super();
              }

  validateSearchClick(filters: Dictionary<string>) {
    if (filters) {
      if (filters['tipo-documento']) { return true; }
      if (filters['nro-documento']) { return true; }
      if (filters['patenteCamion']) { return true; }
    }
    this.popupService.error(Resources.Messages.DebeSeleccionarAlMenosUnFiltro,
      Resources.Labels.Buscar);
    return false;
  }

  public getData(filters: Dictionary<string>): Observable<ReembolsoTasaMunicipalDataView> {
    this.apiRoute = this.url;

    this.apiRoute += this.getQuerystringParameter(filters, 'tipo-documento', 'IdTipoDocumento');
    this.apiRoute += this.getQuerystringParameter(filters, 'nro-documento', 'numeroDocumentoPorte');
    this.apiRoute += this.getQuerystringParameter(filters, 'patenteCamion');

    return this.apiService.get<ReembolsoTasaMunicipalDataView>(this.apiRoute);
  }

  registrarReembolso(command: ReembolsoTasaMunicipalCommand) {
    return this.apiService.put<string>(this.url, command);
  }

}
