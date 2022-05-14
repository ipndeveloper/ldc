import { TestBed } from '@angular/core/testing';

import { RolService } from './rol.service';
import { ApiService } from '../../core/services/restClient/api.service';
import { TestModule } from '../../core/mocks/test.module';
import { of } from 'rxjs';
import { Rol } from '../data-models/rol';

describe('RolService', () => {
  let service: RolService;
  let apiService: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule
      ],
      providers: [RolService]
    });

    service = TestBed.get(RolService);
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
      const esperado = of([{} as Rol]);
      spyOn(apiService, 'get').and.returnValue(esperado);

      // Act
      const resultado = service.getAll();

      // Assert
      expect(resultado).toEqual(esperado);
    });
  });
});
