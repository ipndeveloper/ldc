import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/restClient/api.service';
import { Observable } from 'rxjs';
import { LecturaTarjetaEnAutomaticoDataView } from '../../../shared/data-models/lectura-tarjeta-en-automatico-data-view';

@Injectable({
  providedIn: 'root'
})
export class LecturaTarjetaService {

  constructor(private readonly api: ApiService) { }

  consultarModoLecturaTarjeta(): Observable<LecturaTarjetaEnAutomaticoDataView> {
    return this.api.get('tarjetas/lectura-automatica');
  }
}
