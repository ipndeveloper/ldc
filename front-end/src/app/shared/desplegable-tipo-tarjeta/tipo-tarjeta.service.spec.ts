import { TestBed } from '@angular/core/testing';

import { TipoTarjetaService } from './tipo-tarjeta.service';
import { TestModule } from '../../core/mocks/test.module';
import { ApiService } from '../../core/services/restClient/api.service';
import { configureTestSuite } from '../../core/mocks/testing';
import { of } from 'rxjs/internal/observable/of';
import { TipoTarjeta } from '../data-models/tipo-tarjeta';

describe('TipoTarjetaService', () => {
  let apiService: any;
  let service: TipoTarjetaService;

  configureTestSuite(() => {
    apiService = jasmine.createSpyObj('ApiService', ['get']);
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [ TipoTarjetaService,
      {provide: ApiService, useValue: apiService}]
    });
    service = TestBed.get(TipoTarjetaService);
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

      expect(apiService.get).toHaveBeenCalledWith('tipos-tarjeta');
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });

    it('devuelve un observable con los datos obtenidos por el apiservice.get', () => {
      const esperado = of([{} as TipoTarjeta]);
      apiService.get.and.returnValue(esperado);

      const resultado = service.getAll();

      expect(resultado).toEqual(esperado);
    });
  });
});
