import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs/internal/observable/of';
import { TestModule } from '../../core/mocks/test.module';
import { configureTestSuite } from '../../core/mocks/testing';
import { ApiService } from '../../core/services/restClient/api.service';
import { TipoDispositivo } from '../data-models/tipo-dispositivo';
import { TiposDispositivoService } from './desplegable-tipo-dispositivo.service';

describe('TipoDispositivoService', () => {
  let apiService: any;
  let service: TiposDispositivoService;

  configureTestSuite(() => {
    apiService = jasmine.createSpyObj('ApiService', ['get']);
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [ TiposDispositivoService,
      {provide: ApiService, useValue: apiService}]
    });
    service = TestBed.get(TiposDispositivoService);
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

      expect(apiService.get).toHaveBeenCalledWith('tipos-dispositivo');
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });

    it('devuelve un observable con los datos obtenidos por el apiservice.get', () => {
      const esperado = of([{} as TipoDispositivo]);
      apiService.get.and.returnValue(esperado);

      const resultado = service.getAll();

      expect(resultado).toEqual(esperado);
    });
  });
});
