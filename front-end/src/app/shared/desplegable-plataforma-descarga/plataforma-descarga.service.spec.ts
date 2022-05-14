import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs/internal/observable/of';

import { TestModule } from '../../core/mocks/test.module';
import { configureTestSuite } from '../../core/mocks/testing';
import { ApiService } from '../../core/services/restClient/api.service';
import { PlataformaDescarga } from '../data-models/plataforma-descarga';
import { PlataformaDescargaService } from './plataforma-descarga.service';

describe('PlataformaDescargaService', () => {
  let apiService: any;
  let service: PlataformaDescargaService;

  configureTestSuite(() => {
    apiService = jasmine.createSpyObj('ApiService', ['get']);
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [PlataformaDescargaService,
      {provide: ApiService, useValue: apiService}]
    });
    service = TestBed.get( PlataformaDescargaService);
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

      expect(apiService.get).toHaveBeenCalledWith('plataforma-descarga');
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });

    it('devuelve un observable con los datos obtenidos por el apiservice.get', () => {
      const esperado = of([{} as PlataformaDescarga]);
      apiService.get.and.returnValue(esperado);

      const resultado = service.getAll();

      expect(resultado).toEqual(esperado);
    });
  });
});
