import { TestBed, inject } from '@angular/core/testing';

import { EstadoMovimientoService } from './estado-movimiento.service';
import { TestModule } from '../../core/mocks/test.module';
import { ApiService } from '../../core/services/restClient/api.service';


// export class MockEstadoMovimientoService extends EntityService<EstadoMovimiento> {
//   constructor(private readonly apiService: ApiService) {
//     super();
//   }
// }

describe('EstadoCupoService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [EstadoMovimientoService]
    });
  });

  it('should be created', inject([EstadoMovimientoService], (service: EstadoMovimientoService) => {
    expect(service).toBeTruthy();
  }));

  it('should call to getAll', inject([EstadoMovimientoService, ApiService], (service: EstadoMovimientoService, apiService: ApiService) => {

    spyOn(apiService, 'get');

    service.getAll();

    expect(apiService.get).toHaveBeenCalled();
  }));

  // it('should call to getEstadosMovimientoByIdByIdsActividad', inject([EstadoMovimientoService, ApiService],
  //   (service: EstadoMovimientoService, apiService: ApiService) => {
  //     const idsActividad = [11];
  //     spyOn(apiService, 'get');
  //     spyOn(Object.keys(idsActividad[0]), 'map');

  //   service.getEstadosMovimientoByIdByIdsActividad(1, 2, idsActividad);

  //   expect(apiService.get).toHaveBeenCalled();
  //   expect(Object.keys(idsActividad[0]).map).toHaveBeenCalled();
  // }));
});
