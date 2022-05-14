import { TestBed } from '@angular/core/testing';

import { MotivoEstadoMovimientoService } from './motivo-estado-movimiento.service';
import { TestModule } from '../../core/mocks/test.module';
import { ApiService } from '../../core/services/restClient/api.service';
import { configureTestSuite } from '../../core/mocks/testing';
import { of } from 'rxjs/internal/observable/of';
import { MotivoEstadoMovimiento } from '../data-models/motivo-estado-movimiento';

describe('MotivoEstadoMovimientoService', () => {
  let apiService: any;
  let service: MotivoEstadoMovimientoService;

  configureTestSuite(() => {
    apiService = jasmine.createSpyObj('ApiService', ['get']);
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [MotivoEstadoMovimientoService,
      {provide: ApiService, useValue: apiService}]
    });
    service = TestBed.get(MotivoEstadoMovimientoService);
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

      expect(apiService.get).toHaveBeenCalledWith('motivos-estado-movimiento');
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });

    it('devuelve un observable con los datos obtenidos por el apiservice.get', () => {
      const esperado = of([{} as MotivoEstadoMovimiento]);
      apiService.get.and.returnValue(esperado);

      const resultado = service.getAll();

      expect(resultado).toEqual(esperado);
    });
  });
});
