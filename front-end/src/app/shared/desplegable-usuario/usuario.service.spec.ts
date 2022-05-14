import { TestBed } from '@angular/core/testing';

import { UsuarioService } from './usuario.service';
import { ApiService } from '../../core/services/restClient/api.service';
import { TestModule } from '../../core/mocks/test.module';
import { of } from 'rxjs';
import { Usuario } from '../data-models/usuario';

describe('UsuarioService', () => {
  let service: UsuarioService;
  let apiService: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule
      ],
      providers: [UsuarioService]
    });

    service = TestBed.get(UsuarioService);
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
      const esperado = of([{} as Usuario]);
      spyOn(apiService, 'get').and.returnValue(esperado);

      // Act
      const resultado = service.getAll();

      // Assert
      expect(resultado).toEqual(esperado);
    });
  });
});
