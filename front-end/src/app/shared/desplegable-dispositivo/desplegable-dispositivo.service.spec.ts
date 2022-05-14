import { TestBed } from '@angular/core/testing';

import { DesplegableDispositivoService } from './desplegable-dispositivo.service';
import { TestModule } from '../../core/mocks/test.module';
import { ApiService } from '../../core/services/restClient/api.service';
import { configureTestSuite } from '../../core/mocks/testing';
import { EntityWithDescription } from '../../core/models/entity-with-description';
import { Dispositivo } from '../data-models/dispositivo';
import { of } from 'rxjs/internal/observable/of';

describe('DesplegableDispositivoService', () => {
  let apiService: any;
  let service: DesplegableDispositivoService;

  configureTestSuite(() => {
    apiService = jasmine.createSpyObj('ApiService', ['get']);
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [DesplegableDispositivoService,
      {provide: ApiService, useValue: apiService}]
    });
    service = TestBed.get(DesplegableDispositivoService);
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

      expect(apiService.get).toHaveBeenCalledWith('dispositivos');
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });

    it('devuelve un observable con los datos obtenidos por el apiservice.get', () => {
      const esperado = of([{} as Dispositivo]);
      apiService.get.and.returnValue(esperado);

      const resultado = service.getAll();

      expect(resultado).toEqual(esperado);
    });
  });

  describe('La propiedad apiRoute', () => {
    it('debe contener el string "dispositivos"', () => {
      expect(service.apiRoute).toBe('dispositivos');
    });
  });

  describe('El metodo getAllByTipo', () => {
    it('invoca al metodo get del ApiService', () => {
      const url = `${service.apiRoute}/tipo-dispositivo/${1}`;
      service.getAllByTipo(1);

      expect(apiService.get).toHaveBeenCalledWith(url);
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });

    it('devuelve un observable con los datos obtenidos por el apiservice.get', () => {
      const esperado = of([{} as Dispositivo]);
      apiService.get.and.returnValue(esperado);

      const resultado = service.getAllByTipo(1);

      expect(resultado).toEqual(esperado);
    });
  });

  describe('El metodo getByTerminalTipo()', () => {
    it('si el tipoDispositivo no existe, invoca al metodo get del ApiService con una url', () => {
      const url = `${service.apiRoute}/desplegable?idTerminal=${1}`;

      service.getByTerminalTipo(1, null);

      expect(apiService.get).toHaveBeenCalledWith(url);
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });

    it('si el tipoDispositivo existe, invoca al metodo get del ApiService con una url', () => {
      const tipoDispositivo: EntityWithDescription = {id: 2};
      const url = `${service.apiRoute}/desplegable?idTerminal=${1}&idTipoDispositivo=${tipoDispositivo.id}`;

      service.getByTerminalTipo(1, tipoDispositivo);

      expect(apiService.get).toHaveBeenCalledWith(url);
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });

    it('devuelve un observable con los datos obtenidos por el apiservice.get', () => {
      const esperado = of([{} as Dispositivo]);
      apiService.get.and.returnValue(esperado);

      const resultado = service.getByTerminalTipo(1, null);

      expect(resultado).toEqual(esperado);
    });
  });
});
