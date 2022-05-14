import { TestBed } from '@angular/core/testing';

import { DesplegableMotivoErrorBalanzaCircuitoService } from './desplegable-motivo-error-balanza-circuito.service';
import { TestModule } from '../../core/mocks/test.module';
import { ApiService } from '../../core/services/restClient/api.service';
import { configureTestSuite } from '../../core/mocks/testing';
import { of } from 'rxjs/internal/observable/of';
import { MotivoErrorBalanzaPorCircuitoDataView } from '../data-models/motivo-error-balanza-por-circuito-data-view';

describe('DesplegableMotivoErrorBalanzaCircuitoService', () => {
  let apiService: any;
  let service: DesplegableMotivoErrorBalanzaCircuitoService;

  configureTestSuite(() => {
    apiService = jasmine.createSpyObj('ApiService', ['get']);
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [DesplegableMotivoErrorBalanzaCircuitoService,
      {provide: ApiService, useValue: apiService}]
    });
    service = TestBed.get(DesplegableMotivoErrorBalanzaCircuitoService);
  });

  beforeEach(() => {
    apiService.get.calls.reset();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('El metodo getAllByCircuito()', () => {
    it('invoca al metodo get del ApiService y esEntrada es true', () => {
      const url = `circuitos/motivos-error?idCircuito=${1}&esEntrada=${true}`;

      service.getAllByCircuito(1, true);

      expect(apiService.get).toHaveBeenCalledWith(url);
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });

    it('invoca al metodo get del ApiService y esEntrada es false', () => {
      const url = `circuitos/motivos-error?idCircuito=${1}&esEntrada=${false}`;

      service.getAllByCircuito(1, false);

      expect(apiService.get).toHaveBeenCalledWith(url);
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });

    it('devuelve un observable con los datos obtenidos por el apiservice.get', () => {
      const esperado = of([{} as MotivoErrorBalanzaPorCircuitoDataView]);
      apiService.get.and.returnValue(esperado);

      const resultado = service.getAllByCircuito(1, true);

      expect(resultado).toEqual(esperado);
    });
  });
});
