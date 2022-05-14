import { Injectable } from '@angular/core';
import { ApiService } from '../../../../core/services/restClient/api.service';
import { EntityService } from '../../../../core/shared/super/entity.service';
import { Observable } from 'rxjs';
import { MotivoNoDescarga } from './motivo-no-descarga';

@Injectable()
export class MotivosNoDescargaService extends EntityService<MotivoNoDescarga> {

  constructor(private readonly apiService: ApiService) {
    super();
  }

  getMotivos(idCircuito: number, esEntrada: boolean): Observable<MotivoNoDescarga[]> {
    return this.apiService.get<MotivoNoDescarga[]>(`motivo-error-balanza?idCircuito=${idCircuito}&esEntrada=${esEntrada}`);
  }

  getMotivosPesaje(idCircuito: number,
                   esEntrada: boolean,
                   pesoDocumentoPorte: number,
                   pesoBalanza: number,
                   pesoAnterior: number| null,
                   idEstadoMovimiento: number,
                   cantidadEstimada: number  | null = null,
                   admiteNetoNegativo: boolean | null = null,
                   pesoTara: number | null = null): Observable<MotivoNoDescarga[]> {

    const url = `motivo-error-balanza/pesaje-bruto?idCircuito=${idCircuito}&esEntrada=${esEntrada}`
              + `&pesoDocumentoPorte=${pesoDocumentoPorte}&pesoBalanza=${pesoBalanza}&pesoAnterior=${pesoAnterior}`
              + `&idEstadoMovimiento=${idEstadoMovimiento}&cantidadEstimada=${cantidadEstimada}&admiteNetoNegativo=${admiteNetoNegativo}`
              + `&pesoTara=${pesoTara}`;

    return this.apiService.get<MotivoNoDescarga[]>(url);
  }
}
