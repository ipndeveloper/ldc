import { TestBed } from '@angular/core/testing';

import { EstadoMuestraService } from './estado-muestra.service';
import { ApiService } from '../../core/services/restClient/api.service';
import { TestModule } from '../../core/mocks/test.module';
import { configureTestSuite } from '../../core/mocks/testing';
import { of } from 'rxjs/internal/observable/of';
import { EstadoMuestra } from '../data-models/estado-muestra';

describe('EstadoMuestraService', () => {
  let service: EstadoMuestraService;
  let apiService: any;

  configureTestSuite(() => {
    apiService = jasmine.createSpyObj('ApiService', ['get']);
    TestBed.configureTestingModule({
      providers: [
        EstadoMuestraService,
        {provide: ApiService, useValue: apiService}
      ],
      imports: [
        TestModule
      ]
    });
    service = TestBed.get(EstadoMuestraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('El metodo getAll', () => {
    it('invoca al metodo get de ApiService', () => {
      const datos: EstadoMuestra[] = [];
      apiService.get.and.returnValue(of(datos));

      service.getAll();

      expect(apiService.get).toHaveBeenCalledWith('estados-muestra');
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });
  });
});
