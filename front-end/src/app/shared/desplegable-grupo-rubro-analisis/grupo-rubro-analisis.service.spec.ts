import { TestBed } from '@angular/core/testing';

import { GrupoRubroAnalisisService } from './grupo-rubro-analisis.service';
import { ApiService } from '../../core/services/restClient/api.service';
import { TestModule } from '../../core/mocks/test.module';
import { configureTestSuite } from '../../core/mocks/testing';
import { of } from 'rxjs/internal/observable/of';
import { GrupoRubroCalidadAnalisis } from '../data-models/grupo-rubro-calidad-analisis';

describe('GrupoRubroAnalisisService', () => {
  let apiService: any;
  let service: GrupoRubroAnalisisService;

  configureTestSuite(() => {
    apiService = jasmine.createSpyObj('ApiService', ['get']);
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [GrupoRubroAnalisisService,
      {provide: ApiService, useValue: apiService}]
    });
    service = TestBed.get(GrupoRubroAnalisisService);
  });

  beforeEach(() => {
    apiService.get.calls.reset();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('El metodo getGruposRubroAnalisisPorProducto()', () => {
    it('invoca al metodo get del ApiService con idTerminal en null', () => {
      const url = 'grupos-rubros-analisis?idProducto=' + 1;

      service.getGruposRubroAnalisisPorProducto(1, null);

      expect(apiService.get).toHaveBeenCalledWith(url);
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });

    it('invoca al metodo get del ApiService con idTerminal', () => {
      const url = 'grupos-rubros-analisis?idProducto=' + 1 + '&idTerminal=' + 2;

      service.getGruposRubroAnalisisPorProducto(1, 2);

      expect(apiService.get).toHaveBeenCalledWith(url);
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });

    it('devuelve un observable con los datos obtenidos por el apiservice.get', () => {
      const esperado = of([{} as GrupoRubroCalidadAnalisis]);
      apiService.get.and.returnValue(esperado);

      const resultado = service.getGruposRubroAnalisisPorProducto(1);

      expect(resultado).toEqual(esperado);
    });
  });
});
