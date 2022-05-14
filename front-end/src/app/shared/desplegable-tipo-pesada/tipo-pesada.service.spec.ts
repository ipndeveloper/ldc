import { TestBed } from '@angular/core/testing';
import { TipoPesadaService } from './tipo-pesada.service';
import { TestModule } from '../../core/mocks/test.module';
import { ApiService } from '../../core/services/restClient/api.service';
import { configureTestSuite } from '../../core/mocks/testing';
import { TipoPesada } from '../data-models/tipo-pesada';
import { of } from 'rxjs/internal/observable/of';

describe('TipoPesadaService', () => {
  let apiService: any;
  let service: TipoPesadaService;

  configureTestSuite(() => {
    apiService = jasmine.createSpyObj('ApiService', ['get']);
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [ TipoPesadaService,
      {provide: ApiService, useValue: apiService}]
    });
    service = TestBed.get(TipoPesadaService);
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

      expect(apiService.get).toHaveBeenCalledWith('tipo-pesada');
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });

    it('devuelve un observable con los datos obtenidos por el apiservice.get', () => {
      const esperado = of([{} as TipoPesada]);
      apiService.get.and.returnValue(esperado);

      const resultado = service.getAll();

      expect(resultado).toEqual(esperado);
    });
  });
});
