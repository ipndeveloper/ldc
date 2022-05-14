import { TestBed } from '@angular/core/testing';

import { TestModule } from '../../core/mocks/test.module';
import { TipoNotificacionService } from './tipo-notificacion.service';
import { ApiService } from '../../core/services/restClient/api.service';
import { TipoNotificacion } from '../data-models/tipo-notificacion';
import { of } from 'rxjs';

describe('TipoNotificacionService', () => {
  let service: TipoNotificacionService;
  let apiService: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule
      ],
      providers: [TipoNotificacionService]
    });

    service = TestBed.get(TipoNotificacionService);
    apiService = TestBed.get(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('El metodo getAll', () => {
    it('invoca al metodo get del apiService', () => {
      // Arrange
      spyOn(apiService, 'get');

      // Act
      service.getAll();

      // Assert
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });

    it('devuelve un observable con los datos obtenidos por el apiservice.get', () => {
      // Arrange
      const esperado = of([{} as TipoNotificacion]);
      spyOn(apiService, 'get').and.returnValue(esperado);

      // Act
      const resultado = service.getAll();

      // Assert
      expect(resultado).toEqual(esperado);
    });
  });
});
