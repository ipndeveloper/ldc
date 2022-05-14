import { Injectable } from '@angular/core';
import { Resources } from '../../../locale/artifacts/resources';
import { SearchFormService } from '../components/search-form/services/search-form.service';
import { ApiService } from './restClient/api.service';
import { PopupService } from './popupService/popup.service';

@Injectable()
export abstract class SearchByDateRangeService<TOutput> extends SearchFormService<TOutput> {

  constructor(protected readonly apiService: ApiService, protected readonly popupService: PopupService) {
    super();
  }

  protected fechaDesdeHastaValidas(fechaDesde: string, fechaHasta: string, rango?: number): boolean {
    let fechasValidas = true;

    if (fechaDesde && fechaHasta) {
      const fechaDesdeDate = (new Date(fechaDesde + 'T00:00:00')).valueOf();
      const fechaHastaDate = (new Date(fechaHasta + 'T00:00:00')).valueOf();
      const fechaHoy = new Date().valueOf();
      if (fechaDesdeDate > fechaHoy) {
        this.popupService.error(Resources.Messages.FechaIngresadaDesdeMenorOIgualADiaHoy, Resources.Labels.Buscar);
        fechasValidas = false;
      }
      if (fechaHastaDate > fechaHoy) {
        this.popupService.error(Resources.Messages.FechaIngresadaHastaMenorOIgualADiaHoy, Resources.Labels.Buscar);
        fechasValidas = false;
      }
      if (fechaDesdeDate > fechaHastaDate) {
        this.popupService.error(Resources.Messages.FechaDesdeDebeSerMenorOIgualAFechaHasta, Resources.Labels.Buscar);
        fechasValidas = false;
      }
      if (rango && (fechaHastaDate - fechaDesdeDate) / (1000 * 60 * 60 * 24) > rango) {
        this.popupService.error(`El rango de fecha ingresado no puede ser mayor a ${rango} días.`, Resources.Labels.Buscar);
        fechasValidas = false;
      }
    } else {
      fechasValidas = false;
      if (!fechaHasta) {
        this.popupService.error(Resources.Messages.ElCampoXEsRequeridoParaBuscar.format(Resources.Labels.FechaHasta),
         Resources.Labels.Buscar);
      }
      if (!fechaDesde) {
        this.popupService.error(Resources.Messages.ElCampoXEsRequeridoParaBuscar.format(Resources.Labels.FechaDesde),
        Resources.Labels.Buscar);
      }
    }
    return fechasValidas;
  }
}
