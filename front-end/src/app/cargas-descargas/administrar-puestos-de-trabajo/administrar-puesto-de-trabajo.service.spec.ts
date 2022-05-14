import { TestBed } from '@angular/core/testing';

import { AdministrarPuestoDeTrabajoService } from './administrar-puesto-de-trabajo.service';
import { TestModule } from '../../core/mocks/test.module';
import { Dictionary } from '../../core/models/dictionary';
import { ApiService } from '../../core/services/restClient/api.service';

describe('AdministrarPuestoDeTrabajoService', () => {
  let service: AdministrarPuestoDeTrabajoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule
      ],
      providers: [AdministrarPuestoDeTrabajoService]
    });

    service = TestBed.get(AdministrarPuestoDeTrabajoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('El metodo validateSearchClick', () => {
    it('devuelve true cuando el diccionario de filtros esta definido', () => {
      // Arrange
      const diccionario = new Dictionary<string>();

      // Act
      const resultado = service.validateSearchClick(diccionario);

      // Assert
      expect(resultado).toBeTruthy();
    });

    it('devuelve false cuando el diccionario de filtros no esta definido', () => {
      // Arrange

      // Act
      const resultado = service.validateSearchClick(undefined);

      // Assert
      expect(resultado).toBeFalsy();
    });
  });

  describe('El metodo getData', () => {
    let apiService: ApiService;

    beforeEach(() => {
      apiService = TestBed.get(ApiService);

      spyOn(apiService, 'get');
      spyOn(service, 'getQuerystringParameter');
    });

    it('invoca al getQuerystringParameter con la terminal', () => {
      // Arrange
      const diccionario = new Dictionary<string>();

      // Act
      service.getData(diccionario);

      // Assert
      expect(service.getQuerystringParameter).toHaveBeenCalledWith(diccionario, 'terminal', 'idTerminal');
    });

    it('invoca al getQuerystringParameter con el tipo puesto de trabajo', () => {
      // Arrange
      const diccionario = new Dictionary<string>();

      // Act
      service.getData(diccionario);

      // Assert
      expect(service.getQuerystringParameter).toHaveBeenCalledWith(diccionario, 'tipoPuestoTrabajo', 'idTipoPuestoTrabajo');
    });

    it('invoca al getQuerystringParameter con habilitado', () => {
      // Arrange
      const diccionario = new Dictionary<string>();

      // Act
      service.getData(diccionario);

      // Assert
      expect(service.getQuerystringParameter).toHaveBeenCalledWith(diccionario, 'habilitado');
    });

    it('invoca al metodo get del apiService para solicitar los datos', () => {
      // Arrange
      const diccionario = new Dictionary<string>();

      // Act
      service.getData(diccionario);

      // Assert
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });
  });

  describe('El metodo get', () => {
    let apiService: ApiService;

    beforeEach(() => {
      apiService = TestBed.get(ApiService);

      spyOn(apiService, 'get');
    });

    it('invoca al metodo get del apiService para obtener el puesto de trabajo', () => {
      // Arrange

      // Act
      service.get(1);

      // Assert
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });
  });

  describe('El metodo crear', () => {
    let apiService: ApiService;

    beforeEach(() => {
      apiService = TestBed.get(ApiService);

      spyOn(apiService, 'post');
    });

    it('invoca al metodo post del apiService', () => {
      // Arrange

      // Act
      service.crear({} as any);

      // Assert
      expect(apiService.post).toHaveBeenCalledTimes(1);
    });
  });

  describe('El metodo modificar', () => {
    let apiService: ApiService;

    beforeEach(() => {
      apiService = TestBed.get(ApiService);

      spyOn(apiService, 'put');
    });

    it('invoca al metodo put del apiService', () => {
      // Arrange

      // Act
      service.modificar({} as any);

      // Assert
      expect(apiService.put).toHaveBeenCalledTimes(1);
    });
  });

});
