import { TestBed } from '@angular/core/testing';

import { FinalidadService } from './finalidad.service';
import { TestModule } from '../../core/mocks/test.module';
import { ApiService } from '../../core/services/restClient/api.service';
import { configureTestSuite } from '../../core/mocks/testing';
import { Finalidad } from '../data-models/finalidad';
import { of } from 'rxjs/internal/observable/of';

describe('FinalidadService', () => {
  let apiService: any;
  let service: FinalidadService;
  configureTestSuite(() => {
    apiService = jasmine.createSpyObj('ApiService', ['get']);
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [FinalidadService,
      {provide: ApiService, useValue: apiService}]
    });
    service = TestBed.get(FinalidadService);
  });

  beforeEach(() => {
  apiService.get.calls.reset();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('El metodo getFinalidadesPorCircuito()', () => {
    it('invoca al metodo get de ApiService', () => {
      const url = 'finalidades/circuito/?idCircuito=1';
      service.getFinalidadesPorCircuito(1);

      expect(apiService.get).toHaveBeenCalledWith(url);
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });

    it('devuelve un observable con los datos obtenidos por el apiservice.get', () => {
      const esperado = of([{} as Finalidad]);
      apiService.get.and.returnValue(esperado);

      const resultado = service.getFinalidadesPorCircuito(1);

      expect(resultado).toEqual(esperado);
    });
  });

  describe('El metodo getAll()', () => {
    it('invoca al metodo get de ApiService', () => {
      service.getAll();

      expect(apiService.get).toHaveBeenCalledWith('finalidades');
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });

    it('devuelve un observable con los datos obtenidos por el apiservice.get', () => {
      const esperado = of([{} as Finalidad]);
      apiService.get.and.returnValue(esperado);

      const resultado = service.getAll();

      expect(resultado).toEqual(esperado);
    });
  });

  describe('El metodo getTipoFinalidad()', () => {
    it('invoca al metodo get de ApiService', () => {
      service.getTipoFinalidad(1);

      expect(apiService.get).toHaveBeenCalledWith('finalidades/' + 1 + '/tipofinalidad');
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });

    it('devuelve un observable con los datos obtenidos por el apiservice.get', () => {
      const esperado = of({} as number);
      apiService.get.and.returnValue(esperado);

      const resultado = service.getTipoFinalidad(1);

      expect(resultado).toEqual(esperado);
    });
  });
});
