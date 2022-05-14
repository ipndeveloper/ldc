import { TestBed } from '@angular/core/testing';

import { DesplegablePuntoCargaService } from './desplegable-punto-carga.service';
import { ApiService } from '../../core/services/restClient/api.service';
import { TestModule } from '../../core/mocks/test.module';
import { configureTestSuite } from '../../core/mocks/testing';
import { PuntoCarga } from '../data-models/punto-carga';
import { of } from 'rxjs/internal/observable/of';

describe('DesplegablePuntoCargaService', () => {
  let apiService: any;
  let service: DesplegablePuntoCargaService;

  configureTestSuite(() => {
    apiService = jasmine.createSpyObj('ApiService', ['get']);
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [ DesplegablePuntoCargaService,
      {provide: ApiService, useValue: apiService}]
    });
    service = TestBed.get(DesplegablePuntoCargaService);
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

      expect(apiService.get).toHaveBeenCalledWith('punto-carga');
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });

    it('devuelve un observable con los datos obtenidos por el apiservice.get', () => {
      const esperado = of([{} as PuntoCarga]);
      apiService.get.and.returnValue(esperado);

      const resultado = service.getAll();

      expect(resultado).toEqual(esperado);
    });
  });
});
