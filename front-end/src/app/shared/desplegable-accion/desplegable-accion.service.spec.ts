import { TestBed } from '@angular/core/testing';

import { DesplegableAccionService } from './desplegable-accion.service';
import { TestModule } from '../../core/mocks/test.module';
import { configureTestSuite } from '../../core/mocks/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ApiService } from '../../core/services/restClient/api.service';
import { of } from 'rxjs/internal/observable/of';
import { Accion } from '../data-models/accion';

describe('DesplegableAccionService', () => {
  let apiService: any;
  let desplegableAccionService: DesplegableAccionService;

  configureTestSuite(() => {
    apiService = jasmine.createSpyObj('ApiService', ['get']);

    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [
        DesplegableAccionService,
        {provide: ApiService, useValue: apiService}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    desplegableAccionService = TestBed.get(DesplegableAccionService);
  });

  beforeEach(() => {
    apiService.get.calls.reset();
  });

  it('should be created', () => {
    expect(desplegableAccionService).toBeTruthy();
  });

  describe('El metodo getAll()', () => {
    it('llama al metodo get del ApiService', () => {
      desplegableAccionService.getAll();

      expect(apiService.get).toHaveBeenCalledWith('acciones');
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });
  });

    it('devuelve un observable con los datos obtenidos por el apiservice.get', () => {
      const esperado = of([{} as Accion]);
      apiService.get.and.returnValue(esperado);

      const resultado = desplegableAccionService.getAll();

      expect(resultado).toEqual(esperado);
    });
});
