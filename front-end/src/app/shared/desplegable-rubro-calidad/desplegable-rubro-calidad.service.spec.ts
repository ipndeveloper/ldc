import { TestBed } from '@angular/core/testing';

import { DesplegableRubroCalidadService } from './desplegable-rubro-calidad.service';
import { TestModule } from '../../core/mocks/test.module';
import { configureTestSuite } from '../../core/mocks/testing';
import { ApiService } from '../../core/services/restClient/api.service';
import { of } from 'rxjs/internal/observable/of';
import { EntityWithDescription } from '../../core/models/entity-with-description';

describe('DesplegableRubroCalidadService', () => {
  let apiService: any;
  let service: DesplegableRubroCalidadService;

  configureTestSuite(() => {
    apiService = jasmine.createSpyObj('ApiService', ['get']);
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [DesplegableRubroCalidadService,
      {provide: ApiService, useValue: apiService}]
    });
    service = TestBed.get(DesplegableRubroCalidadService);
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

      expect(apiService.get).toHaveBeenCalledWith('rubros-calidad/todos');
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });

    it('devuelve un observable con los datos obtenidos por el apiservice.get', () => {
      const esperado = of([{} as EntityWithDescription]);
      apiService.get.and.returnValue(esperado);

      const resultado = service.getAll();

      expect(resultado).toEqual(esperado);
    });
  });

  describe('El metodo getRubrosPorProducto()', () => {
    it('invoca al metodo get del ApiService', () => {
      const url = `rubros-calidad/producto/${1}`;
      service.getRubrosPorProducto(1);

      expect(apiService.get).toHaveBeenCalledWith(url);
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });

    it('devuelve un observable con los datos obtenidos por el apiservice.get', () => {
      const esperado = of([{} as EntityWithDescription]);
      apiService.get.and.returnValue(esperado);

      const resultado = service.getRubrosPorProducto(1);

      expect(resultado).toEqual(esperado);
    });
  });
});
