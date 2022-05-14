import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs/internal/observable/of';

import { TestModule } from '../../core/mocks/test.module';
import { configureTestSuite } from '../../core/mocks/testing';
import { ApiService } from '../../core/services/restClient/api.service';
import { TipoProducto } from '../data-models/tipo-producto';
import { TipoProductoService } from './tipo-producto.service';

describe('TipoProductoService', () => {
  let apiService: any;
  let service: TipoProductoService;

  configureTestSuite(() => {
    apiService = jasmine.createSpyObj('ApiService', ['get']);
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [TipoProductoService,
      {provide: ApiService, useValue: apiService}]
    });
    service = TestBed.get(TipoProductoService);
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

      expect(apiService.get).toHaveBeenCalledWith('tipos-producto');
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });

    it('devuelve un observable con los datos obtenidos por el apiservice.get', () => {
      const esperado = of([{} as TipoProducto]);
      apiService.get.and.returnValue(esperado);

      const resultado = service.getAll();

      expect(resultado).toEqual(esperado);
    });
  });

  describe('El metodo getSubproductos()', () => {
    it('invoca al metodo get del ApiService', () => {
      service.getSubproductos();

      expect(apiService.get).toHaveBeenCalledWith('tipos-producto?esSubproductos=true');
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });

    it('devuelve un observable con los datos obtenidos por el apiservice.get', () => {
      const esperado = of([{} as TipoProducto]);
      apiService.get.and.returnValue(esperado);

      const resultado = service.getSubproductos();

      expect(resultado).toEqual(esperado);
    });
  });

  describe('El metodo getInsumosVarios()', () => {
    it('invoca al metodo get del ApiService', () => {
      service.getInsumosVarios();

      expect(apiService.get).toHaveBeenCalledWith('tipos-producto?esInsumosVarios=true');
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });

    it('devuelve un observable con los datos obtenidos por el apiservice.get', () => {
      const esperado = of([{} as TipoProducto]);
      apiService.get.and.returnValue(esperado);

      const resultado = service.getInsumosVarios();

      expect(resultado).toEqual(esperado);
    });
  });

  describe('El metodo getConCupo()', () => {
    it('invoca al metodo get del ApiService', () => {
      service.getConCupo();

      expect(apiService.get).toHaveBeenCalledWith('tipos-producto?esCupo=true');
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });

    it('devuelve un observable con los datos obtenidos por el apiservice.get', () => {
      const esperado = of([{} as TipoProducto]);
      apiService.get.and.returnValue(esperado);

      const resultado = service.getConCupo();

      expect(resultado).toEqual(esperado);
    });
  });
});
