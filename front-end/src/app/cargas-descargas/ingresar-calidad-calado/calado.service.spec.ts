import { TestBed, inject } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { TestModule } from '../../core/mocks/test.module';
import { ApiService } from '../../core/services/restClient/api.service';
import { CaladoService } from './calado.service';

describe('CaladoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CaladoService],
      imports: [
        HttpClientModule,
        TestModule
      ],
    });
  });

  it('should be created', inject([CaladoService], (service: CaladoService) => {
    expect(service).toBeTruthy();
  }));

  describe('El Metodo getDispositivoRubrosCalidad', () => {
    it('Llama a this.apiService.get<DispositivoCaladoDataView> con la URL para buscar el dispositivo y sus rubros',
    inject([ApiService, CaladoService],
      (apiService: ApiService, caladoService: CaladoService) => {

      spyOn(apiService, 'get');

      caladoService.getDispositivoRubrosCalidad(1);

      expect(apiService.get).toHaveBeenCalledTimes(1);
    }));
  });

  describe('El Metodo medirRubrosCalidad', () => {
    it('Llama a this.apiService.get<MedicionesRubrosCalidadDataView> con el idProducto y nroTarjeta',
    inject([ApiService, CaladoService],
      (apiService: ApiService, caladoService: CaladoService) => {

      spyOn(apiService, 'get');

      caladoService.medirRubrosCalidad(1, 1, 1);

      expect(apiService.get).toHaveBeenCalledTimes(1);
    }));

    it('Llama a this.apiService.get<MedicionesRubrosCalidadDataView> con el idProducto solamente si no se envia el nroTarjeta',
    inject([ApiService, CaladoService],
      (apiService: ApiService, caladoService: CaladoService) => {

      spyOn(apiService, 'get');

      caladoService.medirRubrosCalidad(1, 1, 1);

      expect(apiService.get).toHaveBeenCalledTimes(1);
    }));
  });
});
