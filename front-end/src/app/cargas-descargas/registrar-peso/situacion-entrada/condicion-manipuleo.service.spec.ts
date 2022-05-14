import { TestBed } from '@angular/core/testing';
import { TestModule } from '../../../core/mocks/test.module';
import { CondicionManipuleoService } from './condicion-manipuleo.service';
import { ApiService } from '../../../core/services/restClient/api.service';

describe('CondicionManipuleoService', () => {
  let apiService: ApiService;
  let service: CondicionManipuleoService;
  let idProducto: number;
  let humedad: number | undefined;
  let proteina: number | undefined;
  let grado: number | undefined;
  let tipoTransporte: number;
  let tipoMovimiento: number;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [CondicionManipuleoService]
    });
    apiService = TestBed.get(ApiService);
    service = TestBed.get(CondicionManipuleoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('El metodo getAll', () => {

    it('invoca al metodo get del apiService', () => {
      // Arrange
      spyOn(apiService, 'get');
      service.apiURL = 'condicion-manipuleos';
      // Act
      service.getAll();

      // Assert
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });
  });

  describe('El metodo getCondicionManipuleoPorParametros', () => {
    it('Invoca al get del apiService con los datos enviados', () => {
      // Arrange
      idProducto = 1;
      tipoTransporte = 1;
      tipoMovimiento = 2;
      humedad = 1;
      proteina = 1;
      grado = 1;
      spyOn(apiService, 'get');
      const esperado =  `condicion-manipuleos?idProducto=${idProducto}&humedad=` +
      `${humedad}&proteina=${proteina}&grado=${grado}&IdTipoTransporte=${tipoTransporte}&IdTipoMovimiento=${tipoMovimiento}`;

      // Act
      service.getCondicionManipuleoPorParametros(idProducto, humedad, proteina, grado, tipoTransporte, tipoMovimiento);

      // Assert
      expect(apiService.get).toHaveBeenCalledWith(esperado);
    });
  });

  describe('El metodo getCondicionManipuleoPorParametros', () => {
    it('Invoca al get del apiService con los datos enviados', () => {
      // Arrange
      idProducto = 1;
      tipoTransporte = 1;
      tipoMovimiento = 2;
      spyOn(apiService, 'get');
      const esperado =  `condicion-manipuleos?idProducto=${idProducto}` +
      `&IdTipoTransporte=${tipoTransporte}` +
      `&IdTipoMovimiento=${tipoMovimiento}`;

      // Act
      service.getCondicionManipuleoCargaPorParametros(idProducto, tipoTransporte, tipoMovimiento);

      // Assert
      expect(apiService.get).toHaveBeenCalledWith(esperado);
    });
  });
});
