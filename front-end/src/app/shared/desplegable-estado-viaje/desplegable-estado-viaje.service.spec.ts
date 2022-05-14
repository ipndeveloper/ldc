import { TestBed} from '@angular/core/testing';

import { DesplegableEstadoViajeService } from './desplegable-estado-viaje.service';
import { TestModule } from '../../core/mocks/test.module';
import { ApiService } from '../../core/services/restClient/api.service';
import { configureTestSuite } from '../../core/mocks/testing';
import { of } from 'rxjs/internal/observable/of';
import { EstadoViaje } from '../data-models/estado-viaje';

describe('DesplegableEstadoViajeService', () => {
  let apiService: any;
  let service: DesplegableEstadoViajeService;

  configureTestSuite(() => {
    apiService = jasmine.createSpyObj('ApiService', ['get']);
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [ DesplegableEstadoViajeService,
      {provide: ApiService, useValue: apiService}]
    });
    service = TestBed.get( DesplegableEstadoViajeService);
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

      expect(apiService.get).toHaveBeenCalledWith('estados-viaje');
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });

    it('devuelve un observable con los datos obtenidos por el apiservice.get', () => {
      const esperado = of([{} as EstadoViaje]);
      apiService.get.and.returnValue(esperado);

      const resultado = service.getAll();

      expect(resultado).toEqual(esperado);
    });
  });
});
