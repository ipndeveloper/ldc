import { TestBed } from '@angular/core/testing';

import { DesplegableProductoService } from './desplegable-producto.service';
import { TestModule } from '../../core/mocks/test.module';
import { ApiService } from '../../core/services/restClient/api.service';
import { configureTestSuite } from '../../core/mocks/testing';
import { DesplegableProducto } from './desplegable-producto';
import { of } from 'rxjs/internal/observable/of';

describe('DesplegableProductoService', () => {
  let apiService: any;
  let service: DesplegableProductoService;

  configureTestSuite(() => {
    apiService = jasmine.createSpyObj('ApiService', ['get']);
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [ DesplegableProductoService,
      {provide: ApiService, useValue: apiService}]
    });
    service = TestBed.get(DesplegableProductoService);
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

      expect(apiService.get).toHaveBeenCalledWith('producto');
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });

    it('devuelve un observable con los datos obtenidos por el apiservice.get', () => {
      const esperado = of([{} as DesplegableProducto]);
      apiService.get.and.returnValue(esperado);

      const resultado = service.getAll();

      expect(resultado).toEqual(esperado);
    });
  });
});
