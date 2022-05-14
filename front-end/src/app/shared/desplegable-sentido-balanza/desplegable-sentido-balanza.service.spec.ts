import { TestBed } from '@angular/core/testing';

import { DesplegableSentidoBalanzaService } from './desplegable-sentido-balanza.service';
import { TestModule } from '../../core/mocks/test.module';
import { ApiService } from '../../core/services/restClient/api.service';
import { configureTestSuite } from '../../core/mocks/testing';
import { of } from 'rxjs/internal/observable/of';
import { EntityWithDescription } from '../../core/models/entity-with-description';

describe('DesplegableSentidoBalanzaService', () => {
  let apiService: any;
  let service: DesplegableSentidoBalanzaService;

  configureTestSuite(() => {
    apiService = jasmine.createSpyObj('ApiService', ['get']);
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [DesplegableSentidoBalanzaService,
      {provide: ApiService, useValue: apiService}]
    });
    service = TestBed.get( DesplegableSentidoBalanzaService);
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

      expect(apiService.get).toHaveBeenCalledWith('sentidos-balanza');
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
