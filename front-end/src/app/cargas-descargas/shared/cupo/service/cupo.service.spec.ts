import { TestBed } from '@angular/core/testing';

import { CupoService } from './cupo.service';
import { ApiService } from '../../../../core/services/restClient/api.service';
import { TestModule } from '../../../../core/mocks/test.module';
import { MovimientoCupo } from '../../../../shared/data-models/movimiento-cupo';
import { Circuito } from '../../../../shared/data-models/circuito/circuito';
import { EstadoMovimiento } from '../../../../shared/data-models/estado-movimiento';
import { TipoProducto } from '../../../../shared/data-models/tipo-producto';

describe('CupoService', () => {
  let service: CupoService;
  let apiService: ApiService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [CupoService, ApiService]
    });
    service = TestBed.get(CupoService);
    apiService = TestBed.get(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('El metodo getCupoPorCodigo', () => {
    it('invoca al metodo GET del apiService', () => {
      const tipoProducto = new TipoProducto(1, 'cereal');
      const movimiento = new MovimientoCupo(new Circuito(), new EstadoMovimiento(1, 'estado'));
      movimiento.id = 5;
      const cupo = 'LAG-SOJ-20120412-0001';
      const url = `codigos-cupo?codigo=${cupo}&idTipoProducto=${tipoProducto.id}&idMovimiento=${movimiento.id}`;
      spyOn(apiService, 'get');

      service.getCupoPorCodigo(cupo, movimiento.id, tipoProducto);

      expect(apiService.get).toHaveBeenCalledWith(url);
    }); });
});
