import { TestBed } from '@angular/core/testing';

import { TipoPuestoTrabajoService } from './desplegable-tipo-puesto-trabajo.service';
import { TestModule } from '../../core/mocks/test.module';
import { configureTestSuite } from '../../core/mocks/testing';
import { ApiService } from '../../core/services/restClient/api.service';
import { of } from 'rxjs/internal/observable/of';
import { TipoPuestoTrabajo } from '../data-models/tipo-puesto-trabajo';

describe('DesplegableTipoPuestoTrabajoService', () => {
  let apiService: any;
  let service: TipoPuestoTrabajoService;

  configureTestSuite(() => {
    apiService = jasmine.createSpyObj('ApiService', ['get']);
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [ TipoPuestoTrabajoService,
      {provide: ApiService, useValue: apiService}]
    });
    service = TestBed.get(TipoPuestoTrabajoService);
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

      expect(apiService.get).toHaveBeenCalledWith('tipos-puestos-trabajo');
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });

    it('devuelve un observable con los datos obtenidos por el apiservice.get', () => {
      const esperado = of([{} as TipoPuestoTrabajo]);
      apiService.get.and.returnValue(esperado);

      const resultado = service.getAll();

      expect(resultado).toEqual(esperado);
    });
  });
});
