import { TestBed } from '@angular/core/testing';

import { DesplegableMotivoCupoService } from './desplegable-motivo-cupo.service';
import { TestModule } from '../../core/mocks/test.module';
import { ApiService } from '../../core/services/restClient/api.service';
import { configureTestSuite } from '../../core/mocks/testing';
import { Finalidad } from '../data-models/finalidad';
import { MotivoCupo } from '../data-models/motivo-cupo';
import { of } from 'rxjs/internal/observable/of';

describe('DesplegableMotivoCupoService', () => {
  let apiService: any;
  let service: DesplegableMotivoCupoService;

  configureTestSuite(() => {
    apiService = jasmine.createSpyObj('ApiService', ['get']);
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [ DesplegableMotivoCupoService,
      {provide: ApiService, useValue: apiService}]
    });
    service = TestBed.get( DesplegableMotivoCupoService);
  });

  beforeEach(() => {
    apiService.get.calls.reset();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('El metodo getMotivoPorFinalidad()', () => {
    it('invoca al metodo get del ApiService', () => {
      const finalidad: Finalidad = { id: 1 };

      service.getMotivoPorFinalidad(finalidad);

      expect(apiService.get).toHaveBeenCalledWith(`motivo-cupo?idFinalidad=${finalidad.id}`);
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });

    it('devuelve un observable con los datos obtenidos por el apiservice.get', () => {
      const esperado = of([{} as MotivoCupo]);
      apiService.get.and.returnValue(esperado);

      const resultado = service.getMotivoPorFinalidad({} as Finalidad);

      expect(resultado).toEqual(esperado);
    });
  });
});
