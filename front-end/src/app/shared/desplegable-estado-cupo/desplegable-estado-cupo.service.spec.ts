import { TestBed } from '@angular/core/testing';

import { DesplegableEstadoCupoService } from './desplegable-estado-cupo.service';
import { TestModule } from '../../core/mocks/test.module';
import { ApiService } from '../../core/services/restClient/api.service';
import { configureTestSuite } from '../../core/mocks/testing';
import { of } from 'rxjs/internal/observable/of';
import { EstadoCupo } from '../data-models/estado-cupo';

describe('DesplegableEstadoCupoService', () => {
  let apiService: any;
  let service: DesplegableEstadoCupoService;

  configureTestSuite(() => {
    apiService = jasmine.createSpyObj('ApiService', ['get']);
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [DesplegableEstadoCupoService,
      {provide: ApiService, useValue: apiService}]
    });
    service = TestBed.get(DesplegableEstadoCupoService);
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

      expect(apiService.get).toHaveBeenCalledWith('estados-codigo-cupo');
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });

    it('devuelve un observable con los datos obtenidos por el apiservice.get', () => {
      const esperado = of([{} as EstadoCupo]);
      apiService.get.and.returnValue(esperado);

      const resultado = service.getAll();

      expect(resultado).toEqual(esperado);
    });
  });

  describe('El metodo getEstadosCupoPorIds()', () => {
    it('invoca al metodo get del ApiService', () => {
      service.getEstadosCupoPorIds();

      expect(apiService.get).toHaveBeenCalledWith(`${'estados-codigo-cupo'}?PorIds=True`);
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });

    it('devuelve un observable con los datos obtenidos por el apiservice.get', () => {
      const esperado = of([{} as EstadoCupo]);
      apiService.get.and.returnValue(esperado);

      const resultado = service.getEstadosCupoPorIds();

      expect(resultado).toEqual(esperado);
    });
  });
});
