import { TestBed } from '@angular/core/testing';

import { CampoEpaSustentableService } from './campo-epa-sustentable.service';
import { TestModule } from '../../core/mocks/test.module';
import { configureTestSuite } from '../../core/mocks/testing';
import { ApiService } from '../../core/services/restClient/api.service';
import { of } from 'rxjs/internal/observable/of';
import { CampoEpaSustentable } from '../data-models/campo-epa-sustentable';

describe('CampoEpaSustentableService', () => {
  let apiService: any;
  let service: CampoEpaSustentableService;

  configureTestSuite(() => {
    apiService = jasmine.createSpyObj('ApiService', ['get']);
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [
      CampoEpaSustentableService,
      {provide: ApiService, useValue: apiService}]
    });
    service = TestBed.get(CampoEpaSustentableService);
  });

  beforeEach(() => {
    apiService.get.calls.reset();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('El metodo getCampoEpaSustentablePorProductoYTitular', () => {
    it('invoca al metodo get de apiService con sus respectivos parametros', () => {
      const url = `${'campo-epa-sustentable'}?idProducto=${1}
                                                                       &idTitular=${2}`;

      service.getCampoEpaSustentablePorProductoYTitular(1, 2);

      expect(apiService.get).toHaveBeenCalledWith(url);
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });

    it('devuelve un observable con los datos obtenidos por el apiservice.get', () => {
      const esperado = of([{} as CampoEpaSustentable]);
      apiService.get.and.returnValue(esperado);

      const resultado = service.getCampoEpaSustentablePorProductoYTitular(1, 2);

      expect(resultado).toEqual(esperado);
    });
  });

  describe('La propiedad apiRoute', () => {
    it('deberia ser "campo-epa-sustentable" ', () => {
      expect(service.apiRoute).toBe('campo-epa-sustentable');
    });
  });
});
