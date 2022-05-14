import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs/internal/observable/of';

import { TestModule } from '../../core/mocks/test.module';
import { configureTestSuite } from '../../core/mocks/testing';
import { ApiService } from '../../core/services/restClient/api.service';
import { Silo } from '../data-models/silo';
import { SiloService } from './desplegable-silo.service';

describe('SiloService', () => {
  let apiService: any;
  let service: SiloService;

  configureTestSuite(() => {
    apiService = jasmine.createSpyObj('ApiService', ['get']);
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [SiloService,
      {provide: ApiService, useValue: apiService}]
    });
    service = TestBed.get(SiloService);
  });

  beforeEach(() => {
    apiService.get.calls.reset();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('El metodo getSilosPorProducto()', () => {
    it('invoca al metodo get del ApiService', () => {
      service.getSilosPorProducto(1);

      expect(apiService.get).toHaveBeenCalledWith('silos/producto/' + 1);
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });

    it('devuelve un observable con los datos obtenidos por el apiservice.get', () => {
      const esperado = of([{} as Silo]);
      apiService.get.and.returnValue(esperado);

      const resultado = service.getSilosPorProducto(1);

      expect(resultado).toEqual(esperado);
    });
  });

  describe('El metodo getSilosPorTerminal()', () => {
    it('invoca al metodo get del ApiService', () => {
      const route = `silos/terminal/?&IdTerminal=${2}`;

      service. getSilosPorTerminal(2);

      expect(apiService.get).toHaveBeenCalledWith(route);
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });

    it('devuelve un observable con los datos obtenidos por el apiservice.get', () => {
      const esperado = of([{} as Silo]);
      apiService.get.and.returnValue(esperado);

      const resultado = service.getSilosPorTerminal(2);

      expect(resultado).toEqual(esperado);
    });

  });
});
