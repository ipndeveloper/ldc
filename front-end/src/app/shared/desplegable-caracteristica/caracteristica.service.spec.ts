import { TestBed } from '@angular/core/testing';

import { CaracteristicaService } from './caracteristica.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestModule } from '../../core/mocks/test.module';
import { configureTestSuite } from '../../core/mocks/testing';
import { ApiService } from '../../core/services/restClient/api.service';
import { Caracteristica } from '../data-models/caracteristica';
import { of } from 'rxjs/internal/observable/of';

describe('CaracteristicaService', () => {
  let service: CaracteristicaService;
  let apiService: any;
  configureTestSuite(() => {
    apiService = jasmine.createSpyObj('ApiService', ['get']);
    TestBed.configureTestingModule({
      imports: [
        TestModule
      ],
      providers: [CaracteristicaService,
      {provide: ApiService, useValue: apiService}],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
    service = TestBed.get(CaracteristicaService);
  });

  beforeEach(() => {
    apiService.get.calls.reset();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('EL metodo getAll() ', () => {
    it('invoca al metodo get de apiService', () => {
      service.getAll();

      expect(apiService.get).toHaveBeenCalledWith('caracteristicas');
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });

    it('devuelve un observable con los datos obtenidos por el apiservice.get', () => {
      const esperado = of([{} as Caracteristica]);
      apiService.get.and.returnValue(esperado);

      const resultado = service.getAll();

      expect(resultado).toEqual(esperado);
    });
  });
});
