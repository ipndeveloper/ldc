import { TestBed } from '@angular/core/testing';

import { EstadoInterfazSanService } from './estado-interfaz-san.service';
import { TestModule } from '../../core/mocks/test.module';
import { ApiService } from '../../core/services/restClient/api.service';
import { of } from 'rxjs';
import { Resources } from '../../../locale/artifacts/resources';

describe('EstadoInterfazSanService', () => {

  let service: EstadoInterfazSanService;
  let apiService: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [EstadoInterfazSanService]
    });

    service = TestBed.get(EstadoInterfazSanService);
    apiService = TestBed.get(ApiService);

    spyOn(apiService, 'get').and.returnValue(of([]));
    spyOn(apiService, 'post').and.returnValue(of([]));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('El metodo getAll', () => {
    it('invoca al metodo get del apiService', () => {
      // Arrange

      // Act
      service.getAll();

      // Assert
      expect(apiService.get).toHaveBeenCalled();
    });

    it('retorna un observable con el primer elemento siendo el estado -1 SinPasarASan', () => {
      // Arrange

      // Act
      const resultado = service.getAll();

      // Assert
      resultado.subscribe((datos) => expect(datos[0].id).toEqual(-1));
      resultado.subscribe((datos) => expect(datos[0].descripcion).toEqual(Resources.Labels.SinPasarASan));
    });
  });
});
