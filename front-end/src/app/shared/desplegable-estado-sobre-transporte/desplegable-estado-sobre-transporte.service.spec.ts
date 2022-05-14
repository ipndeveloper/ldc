import { TestBed } from '@angular/core/testing';

import { DesplegableEstadoSobreTransporteService } from './desplegable-estado-sobre-transporte.service';
import { TestModule } from '../../core/mocks/test.module';
import { ApiService } from '../../core/services/restClient/api.service';
import { configureTestSuite } from '../../core/mocks/testing';
import { EntityWithDescription } from '../../core/models/entity-with-description';
import { of } from 'rxjs/internal/observable/of';

describe('DesplegableEstadoSobreTransporteService', () => {
  let apiService: any;
  let service:  DesplegableEstadoSobreTransporteService ;

  configureTestSuite(() => {
    apiService = jasmine.createSpyObj('ApiService', ['get']);
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [ DesplegableEstadoSobreTransporteService ,
      {provide: ApiService, useValue: apiService}]
    });
    service = TestBed.get( DesplegableEstadoSobreTransporteService );
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

      expect(apiService.get).toHaveBeenCalledWith('estado-sobre-transporte');
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });

    it('devuelve un observable con los datos obtenidos por el apiservice.get', () => {
      const esperado = of([{} as EntityWithDescription]);
      apiService.get.and.returnValue(esperado);

      const resultado = service.getAll();

      expect(resultado).toEqual(esperado);
    });
  });
});
