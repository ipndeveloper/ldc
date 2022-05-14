import { TestBed } from '@angular/core/testing';

import { DesplegableEstadoOrdenCargaService } from './desplegable-estado-orden-carga.service';
import { TestModule } from '../../core/mocks/test.module';
import { ApiService } from '../../core/services/restClient/api.service';
import { configureTestSuite } from '../../core/mocks/testing';
import { of } from 'rxjs/internal/observable/of';
import { EstadoOrdenCarga } from '../data-models/estado-orden-carga';

describe('DesplegableEstadoOrdenCargaService', () => {
  let apiService: any;
  let service: DesplegableEstadoOrdenCargaService;

  configureTestSuite(() => {
    apiService = jasmine.createSpyObj('ApiService', ['get']);
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [DesplegableEstadoOrdenCargaService,
      {provide: ApiService, useValue: apiService}]
    });
    service = TestBed.get(DesplegableEstadoOrdenCargaService);
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

      expect(apiService.get).toHaveBeenCalledWith('estados-orden-carga');
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });

    it('devuelve un observable con los datos obtenidos por el apiservice.get', () => {
      const esperado = of([{} as EstadoOrdenCarga]);
      apiService.get.and.returnValue(esperado);

      const resultado = service.getAll();

      expect(resultado).toEqual(esperado);
    });
  });
});
