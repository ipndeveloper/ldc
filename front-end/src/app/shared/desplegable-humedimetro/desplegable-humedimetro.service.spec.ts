import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs/internal/observable/of';
import { TestModule } from '../../core/mocks/test.module';
import { configureTestSuite } from '../../core/mocks/testing';
import { ApiService } from '../../core/services/restClient/api.service';
import { Humedimetro } from '../data-models/Humedimetro';
import { HumedimetroService } from './desplegable-humedimetro.service';

describe('TipoDispositivoService', () => {
  let apiService: any;
  let service: HumedimetroService;

  configureTestSuite(() => {
    apiService = jasmine.createSpyObj('ApiService', ['get']);
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [HumedimetroService,
      {provide: ApiService, useValue: apiService}]
    });
    service = TestBed.get(HumedimetroService);
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

      expect(apiService.get).toHaveBeenCalledWith('tipos-dispositivo/humedimetros');
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });

    it('devuelve un observable con los datos obtenidos por el apiservice.get', () => {
      const esperado = of([{} as Humedimetro]);
      apiService.get.and.returnValue(esperado);

      const resultado = service.getAll();

      expect(resultado).toEqual(esperado);
    });
  });
});
