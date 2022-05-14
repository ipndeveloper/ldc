import { TestBed } from '@angular/core/testing';

import { BusquedaMovimientoPesajeService } from './busqueda-movimiento-pesaje.service';
import { TestModule } from '../../../core/mocks/test.module';
import { ApiService } from '../../../core/services/restClient/api.service';
import { configureTestSuite } from '../../../core/mocks/testing';
import { of } from 'rxjs/internal/observable/of';
import { MovimientoPesaje } from '../movimiento-pesaje';

describe('BusquedaMovimientoPesajeService', () => {
  let apiService: any;
  let service: BusquedaMovimientoPesajeService;

  configureTestSuite(() => {
    apiService = jasmine.createSpyObj('ApiService', ['get']);

    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [BusquedaMovimientoPesajeService,
      {provide: ApiService, useValue: apiService}]
    });
    service = TestBed.get(BusquedaMovimientoPesajeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('El metodo getMovimientoPesajeCamion()', () => {

    it('invoca al metodo get del apiService ', () => {
      const url = `movimiento-pesaje-camion?patente=${'AAA123'}&tarjeta=${'123'}`;

      service.getMovimientoPesajeCamion('AAA123', '123');

      expect(apiService.get).toHaveBeenCalledWith(url);
    });

    it('retorna el observable', () => {
      const esperado = of({} as MovimientoPesaje);
      apiService.get.and.returnValue(esperado);

      const result =  service.getMovimientoPesajeCamion('AAA123', '123');

      expect(result).toEqual(esperado);
    });
  });

  describe('El metodo getMovimientoPesajeCamionById()', () => {

    it('invoca al metodo get del apiService ', () => {
      const url = `movimiento-pesaje-camion/${1}/por-navegacion`;

      service.getMovimientoPesajeCamionById(1);

      expect(apiService.get).toHaveBeenCalledWith(url);
    });

    it('retorna el observable', () => {
      const esperado = of({} as MovimientoPesaje);
      apiService.get.and.returnValue(esperado);

      const result =  service.getMovimientoPesajeCamionById(1);

      expect(result).toEqual(esperado);
    });
  });

  describe('El metodo getMovimientoPesajeVagonById()', () => {

    it('invoca al metodo get del apiService ', () => {
      const url = `movimiento-pesaje-vagon/${1}/por-navegacion`;

      service.getMovimientoPesajeVagonById(1);

      expect(apiService.get).toHaveBeenCalledWith(url);
    });

    it('retorna el observable', () => {
      const esperado = of({} as MovimientoPesaje);
      apiService.get.and.returnValue(esperado);

      const result =  service.getMovimientoPesajeVagonById(1);

      expect(result).toEqual(esperado);
    });
  });

  describe('El metodo getMovimientoPesajeVagon()', () => {

    it('invoca al metodo get del apiService ', () => {
      const url = `movimiento-pesaje-vagon?numeroVagon=${12}`;

      service.getMovimientoPesajeVagon('12');

      expect(apiService.get).toHaveBeenCalledWith(url);
    });

    it('invoca al metodo get del apiService con tarjeta', () => {
      const url = `movimiento-pesaje-vagon?numeroVagon=${12}&tarjeta=${123}`;

      service.getMovimientoPesajeVagon('12', '123');

      expect(apiService.get).toHaveBeenCalledWith(url);
    });

    it('retorna el observable', () => {
      const esperado = of({} as MovimientoPesaje);
      apiService.get.and.returnValue(esperado);

      const result =  service.getMovimientoPesajeVagon('12');

      expect(result).toEqual(esperado);
    });
  });
});
