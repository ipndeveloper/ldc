import { TestBed } from '@angular/core/testing';

import { DesplegableActividadService } from './desplegable-actividad.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestModule } from '../../core/mocks/test.module';
import { ApiService } from '../../core/services/restClient/api.service';
import { configureTestSuite } from '../../core/mocks/testing';
import { Actividad } from '../data-models/actividad';
import { of } from 'rxjs/internal/observable/of';

describe('DesplegableActividadService', () => {
  let service: DesplegableActividadService;
  let apiService: any;

  configureTestSuite(() => {
    apiService = jasmine.createSpyObj('ApiService', ['get']);
    TestBed.configureTestingModule({
      imports: [
        TestModule
      ],
      providers: [
      DesplegableActividadService,
      {provide: ApiService, useValue: apiService}
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
    service = TestBed.get(DesplegableActividadService);
  });

  beforeEach(() => {
    apiService.get.calls.reset();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('El metodo getAll()', () => {
    it('invoca al metodo get del apiService', () => {
      service.getAll();

      expect(apiService.get).toHaveBeenCalledWith('actividades');
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });

    it('devuelve un observable con los datos obtenidos por el apiservice.get', () => {
      const esperado = of([{} as Actividad]);
      apiService.get.and.returnValue(esperado);

      const resultado = service.getAll();

      expect(resultado).toEqual(esperado);
    });
  });

  describe('El metodo get(idCircuito)', () => {
    it('invoca al metodo get del apiService', () => {
      const url = `circuitos/actividades/${1}`;

      service.get(1);

      expect(apiService.get).toHaveBeenCalledWith(url);
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });

    it('devuelve un observable con los datos obtenidos por el apiservice.get', () => {
      const esperado = of([{} as Actividad]);
      apiService.get.and.returnValue(esperado);

      const resultado = service.get(1);

      expect(resultado).toEqual(esperado);
    });
  });
});
