import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs/internal/observable/of';
import { TestModule } from '../../core/mocks/test.module';
import { configureTestSuite } from '../../core/mocks/testing';
import { ApiService } from '../../core/services/restClient/api.service';
import { TipoCartaPorte } from '../data-models/tipo-carta-porte';
import { TipoCartaPorteService } from './desplegable-tipo-carta-porte.service';

describe('TipoCartaPorteService', () => {
  let apiService: any;
  let service: TipoCartaPorteService;

  configureTestSuite(() => {
    apiService = jasmine.createSpyObj('ApiService', ['get']);
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [ TipoCartaPorteService,
      {provide: ApiService, useValue: apiService}]
    });
    service = TestBed.get(TipoCartaPorteService);
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

      expect(apiService.get).toHaveBeenCalledWith('tipo-carta-porte');
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });

    it('devuelve un observable con los datos obtenidos por el apiservice.get', () => {
      const esperado = of([{} as TipoCartaPorte]);
      apiService.get.and.returnValue(esperado);

      const resultado = service.getAll();

      expect(resultado).toEqual(esperado);
    });
  });
});
