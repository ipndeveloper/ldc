import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/restClient/api.service';
import { LecturaQREnAutomaticoDataView } from '../../../shared/data-models/lectura-qr-en-automatico-data-view';

@Injectable({
  providedIn: 'root'
})
export class LecturaQRService {

  constructor(private readonly api: ApiService) { }

  consultarModoLecturaQR(): Observable<LecturaQREnAutomaticoDataView> {
    return this.api.get<LecturaQREnAutomaticoDataView>('lectoraQr/lectura-automatica');
  }
}
