import { TestBed } from '@angular/core/testing';

import { DesplegableCircuitoService } from './desplegable-circuito.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestModule } from '../../core/mocks/test.module';
import { ApiService } from '../../core/services/restClient/api.service';
import { configureTestSuite } from '../../core/mocks/testing';
import { Circuitos } from '../data-models/circuitos';
import { of } from 'rxjs/internal/observable/of';

describe('DesplegableCircuitoService', () => {
  let service: DesplegableCircuitoService;
  let apiService: any;
  configureTestSuite(() => {
    apiService = jasmine.createSpyObj('ApiService', ['get']);
    TestBed.configureTestingModule({
      imports: [
        TestModule
      ],
      providers: [DesplegableCircuitoService,
      {provide: ApiService, useValue: apiService}],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
    service = TestBed.get(DesplegableCircuitoService);
  });
  beforeEach(() => {
    apiService.get.calls.reset();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('El metodo getAll()', () => {
    it('invoca al metodo get del ApiService', () => {
      service.getAll();

      expect(apiService.get).toHaveBeenCalledWith('circuitos/todos');
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });

    it('devuelve un observable con los datos obtenidos por el apiservice.get', () => {
      const esperado = of([{} as Circuitos]);
      apiService.get.and.returnValue(esperado);

      const resultado = service.getAll();

      expect(resultado).toEqual(esperado);
    });
  });

  describe('El metodo getAllHabilitados()', () => {
    it('invoca al metodo get del ApiService', () => {
      service.getAllHabilitados();

      expect(apiService.get).toHaveBeenCalledWith('circuitos/todos?&Habilitado=true');
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });

    it('devuelve un observable con los datos obtenidos por el apiservice.get', () => {
      const esperado = of([{} as Circuitos]);
      apiService.get.and.returnValue(esperado);

      const resultado = service.getAllHabilitados();

      expect(resultado).toEqual(esperado);
    });
  });

  describe('El metodo getAllByPermiso()', () => {
    let permiso;
    beforeEach(() => {
       permiso = 'Permiso11';
    });
    it('invoca al metodo get del ApiService con una url cuando soloHabilitados es false', () => {
      const url = `circuitos/permiso?codigoPermiso=${permiso}`;

      service.getAllByPermiso(permiso, false);

      expect(apiService.get).toHaveBeenCalledWith(url);
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });

    it('invoca al metodo get del ApiService con una url cuando soloHabilitados es true', () => {
      const url = `circuitos/permiso?codigoPermiso=${permiso}&soloHabilitados=true`;

      service.getAllByPermiso(permiso, true);

      expect(apiService.get).toHaveBeenCalledWith(url);
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });

    it('devuelve un observable con los datos obtenidos por el apiservice.get', () => {
      const esperado = of([{} as Circuitos]);
      apiService.get.and.returnValue(esperado);

      const resultado = service.getAllByPermiso('', true);

      expect(resultado).toEqual(esperado);
    });
  });
});
