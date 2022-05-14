import { TestBed } from '@angular/core/testing';

import { DesplegableMotivoErrorBalanzaService } from './desplegable-motivo-error-balanza.service';
import { TestModule } from '../../core/mocks/test.module';
import { ApiService } from '../../core/services/restClient/api.service';
import { configureTestSuite } from '../../core/mocks/testing';
import { EntityWithDescription } from '../../core/models/entity-with-description';
import { of } from 'rxjs/internal/observable/of';

describe('DesplegableMotivoErrorBalanzaService', () => {
  let apiService: any;
  let service: DesplegableMotivoErrorBalanzaService;

  configureTestSuite(() => {
    apiService = jasmine.createSpyObj('ApiService', ['get']);
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [DesplegableMotivoErrorBalanzaService,
      {provide: ApiService, useValue: apiService}]
    });
    service = TestBed.get(DesplegableMotivoErrorBalanzaService);
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

      expect(apiService.get).toHaveBeenCalledWith('motivo-error-balanza/todos');
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });

    it('devuelve un observable con los datos obtenidos por el apiservice.get', () => {
      const esperado = of([{} as EntityWithDescription]);
      apiService.get.and.returnValue(esperado);

      const resultado = service.getAll();

      expect(resultado).toEqual(esperado);
    });
  });
});
