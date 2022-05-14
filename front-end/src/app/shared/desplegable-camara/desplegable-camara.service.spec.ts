import { TestBed } from '@angular/core/testing';

import { DesplegableCamaraService } from './desplegable-camara.service';
import { TestModule } from '../../core/mocks/test.module';
import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ApiService } from '../../core/services/restClient/api.service';
import { configureTestSuite } from '../../core/mocks/testing';
import { EntityWithDescription } from '../../core/models/entity-with-description';
import { of } from 'rxjs/internal/observable/of';

describe('DesplegableCamaraService', () => {
  let service: DesplegableCamaraService;
  let apiService: any;
  configureTestSuite(() => {
    apiService = jasmine.createSpyObj('ApiService', ['get']);
    TestBed.configureTestingModule({
      imports: [
        TestModule,
        HttpClientModule
      ],
      providers: [DesplegableCamaraService,
      {provide: ApiService, useValue: apiService}
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
    service = TestBed.get(DesplegableCamaraService);
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

      expect(apiService.get).toHaveBeenCalledWith('camaras');
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

