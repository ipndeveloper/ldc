import { TestBed } from '@angular/core/testing';

import { EstadoTrabajoGeneracionArchivoMuestrasService } from './estado-trabajo-generacion-archivo-muestras.service';
import { ApiService } from '../../core/services/restClient/api.service';
import { TestModule } from '../../core/mocks/test.module';
import { configureTestSuite } from '../../core/mocks/testing';
import { EstadoTrabajoGeneracionArchivoMuestra } from '../data-models/estado-trabajo-generacion-archivo-muestra';
import { of } from 'rxjs/internal/observable/of';

describe('EstadoTrabajoGeneracionArchivoMuestrasService', () => {
  let apiService: any;
  let service: EstadoTrabajoGeneracionArchivoMuestrasService;

  configureTestSuite(() => {
    apiService = jasmine.createSpyObj('ApiService', ['get']);
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [ EstadoTrabajoGeneracionArchivoMuestrasService,
      {provide: ApiService, useValue: apiService}]
    });
    service = TestBed.get(EstadoTrabajoGeneracionArchivoMuestrasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('El metodo getAll()', () => {
    it('invoca al metodo get del ApiService', () => {
      const datos: EstadoTrabajoGeneracionArchivoMuestra[] = [];
      apiService.get.and.returnValue(of(datos));

      service.getAll();

      expect(apiService.get).toHaveBeenCalledWith('estados-trabajo-generacion-archivo-muestras');
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });
  });
});
