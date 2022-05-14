import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/restClient/api.service';

@Injectable({
  providedIn: 'root'
})
export class AgregarAlSobreTransporteService {

  constructor(private readonly apiService: ApiService) { }

  getAllSobresTransporteAbiertos() {
    return this.apiService.get('sobres-transporte/abiertos');
  }

  agregarAlSobreTransporte(idEntidad: number, idTablaTransporte: number, idSobreTransporte: number) {
    return this.apiService.post('sobres-transporte/agregar-al-sobre',
                                {idEntidad, idTablaTransporte, idSobreTransporte});
  }
}
