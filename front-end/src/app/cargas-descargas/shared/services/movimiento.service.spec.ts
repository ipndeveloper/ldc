import { TestBed, inject } from '@angular/core/testing';
import { MovimientoService } from './movimiento.service';
import { TestModule } from '../../../core/mocks/test.module';
import { ApiService } from '../../../core/services/restClient/api.service';
import { DesmarcarMovimientoEnPuestoCommand } from '../data-models/desmarcar-movimiento-en-puesto-command';
import { MarcarMovimientoEnPuestoCommand } from '../data-models/marcar-movimiento-en-puesto-command';
import { TiposProducto, TiposTransporte } from '../../../shared/enums/enums';

describe('MovimientoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
            TestModule
        ],
        providers: [MovimientoService]
    });
  });

  it('should be created', inject([MovimientoService], (service: MovimientoService) => {
    expect(service).toBeTruthy();
  }));

  describe('El método getMovimientoDescarga', () => {
    it('debe hacer un GET a control-descarga-camion-cereales cuando el tipo de producto es Cereal',
      inject([ApiService, MovimientoService], (api: ApiService, service: MovimientoService) => {

      const idMovimiento = 654;
      const idTipoProducto = TiposProducto.Cereal;
      const idTipoTransporte = TiposTransporte.Camion;
      spyOn(api, 'get');

      service.getMovimientoDescarga(idMovimiento, idTipoProducto, idTipoTransporte);

      const url = `control-descarga-camion-cereales?idMovimiento=${idMovimiento}&idTipoProducto=${idTipoProducto}`;
      expect(api.get).toHaveBeenCalledWith(url);
    }));

    it('debe hacer un GET a control-descarga-camion-subproductos cuando el tipo de producto es NoGrano',
      inject([ApiService, MovimientoService], (api: ApiService, service: MovimientoService) => {

      const idMovimiento = 654;
      const idTipoProducto = TiposProducto.NoGranos;
      const idTipoTransporte = TiposTransporte.Camion;
      spyOn(api, 'get');

      service.getMovimientoDescarga(idMovimiento, idTipoProducto, idTipoTransporte);

      const url = `control-descarga-camion-subproductos?idMovimiento=${idMovimiento}&idTipoProducto=${idTipoProducto}`;
      expect(api.get).toHaveBeenCalledWith(url);
    }));

    it('debe hacer un GET a control-descarga-camion-subproductos cuando el tipo de producto es Subproducto',
      inject([ApiService, MovimientoService], (api: ApiService, service: MovimientoService) => {

      const idMovimiento = 654;
      const idTipoProducto = TiposProducto.SubProductos;
      const idTipoTransporte = TiposTransporte.Camion;
      spyOn(api, 'get');

      service.getMovimientoDescarga(idMovimiento, idTipoProducto, idTipoTransporte);

      const url = `control-descarga-camion-subproductos?idMovimiento=${idMovimiento}&idTipoProducto=${idTipoProducto}`;
      expect(api.get).toHaveBeenCalledWith(url);
    }));

    it('debe hacer un GET a control-descarga-camion-transportes-varios cuando el tipo de producto es Vario',
      inject([ApiService, MovimientoService], (api: ApiService, service: MovimientoService) => {

      const idMovimiento = 654;
      const idTipoProducto = TiposProducto.Varios;
      const idTipoTransporte = TiposTransporte.Camion;
      spyOn(api, 'get');

      service.getMovimientoDescarga(idMovimiento, idTipoProducto, idTipoTransporte);

      const url = `control-descarga-camion-transportes-varios?idMovimiento=${idMovimiento}&idTipoProducto=${idTipoProducto}`;
      expect(api.get).toHaveBeenCalledWith(url);
    }));
  });

  describe('El método desmarcarMovimientoEnPuesto', () => {
    it('debe hacer un PATCH al movimiento para desmarcarlo En Puesto',
      inject([ApiService, MovimientoService], (api: ApiService, service: MovimientoService) => {

      const idMovimiento = 654;
      spyOn(api, 'patch');

      service.desmarcarMovimientoEnPuesto(idMovimiento);

      const url = `movimientos/${idMovimiento}/desmarcar-en-puesto`;
      const command = new DesmarcarMovimientoEnPuestoCommand(idMovimiento);
      expect(api.patch).toHaveBeenCalledWith(url, command);
    }));
  });

  describe('El método marcarMovimientoEnPuesto', () => {
    it('debe hacer un PATCH al movimiento para marcarlo En Puesto',
      inject([ApiService, MovimientoService], (api: ApiService, service: MovimientoService) => {

      const idMovimiento = 654;
      spyOn(api, 'patch');

      service.marcarMovimientoEnPuesto(idMovimiento);

      const url = `movimientos/${idMovimiento}/marcar-en-puesto`;
      const command = new MarcarMovimientoEnPuestoCommand(idMovimiento);
      expect(api.patch).toHaveBeenCalledWith(url, command);
    }));
  });

  describe('El método movimientoEstaEnPuesto', () => {
    it('debe hacer un GET para consultar si el movimiento está En Puesto',
      inject([ApiService, MovimientoService], (api: ApiService, service: MovimientoService) => {

      const idMovimiento = 654;
      spyOn(api, 'get');

      service.movimientoEstaEnPuesto(idMovimiento);

      const url = `movimientos/${idMovimiento}/en-puesto`;
      expect(api.get).toHaveBeenCalledWith(url);
    }));
  });

  describe('El método getMovimientoCarga', () => {
    it('debe hacer un GET a control-carga-camion cuando el tipo de producto es Cereal',
      inject([ApiService, MovimientoService], (api: ApiService, service: MovimientoService) => {
      // Arrange
      const idMovimiento = 654;
      const idTipoProducto = TiposProducto.Cereal;
      spyOn(api, 'get');

      // Act
      service.getMovimientoCarga(idMovimiento, idTipoProducto);

      // Assert
      const url = `control-carga-camion`;
      expect(api.get).toHaveBeenCalledWith(`${url}/${idMovimiento}`);
    }));

    it('debe hacer un GET a control-carga-camion cuando el tipo de producto es NoGrano',
      inject([ApiService, MovimientoService], (api: ApiService, service: MovimientoService) => {
      // Arrange
      const idMovimiento = 654;
      const idTipoProducto = TiposProducto.NoGranos;
      spyOn(api, 'get');

      // Act
      service.getMovimientoCarga(idMovimiento, idTipoProducto);

      // Assert
      const url = `control-carga-camion`;
      expect(api.get).toHaveBeenCalledWith(`${url}/${idMovimiento}`);
    }));

    it('debe hacer un GET a control-carga-camion cuando el tipo de producto es Subproducto',
      inject([ApiService, MovimientoService], (api: ApiService, service: MovimientoService) => {
      // Arrange
      const idMovimiento = 654;
      const idTipoProducto = TiposProducto.SubProductos;
      spyOn(api, 'get');

      // Act
      service.getMovimientoCarga(idMovimiento, idTipoProducto);

      // Assert
      const url = `control-carga-camion`;
      expect(api.get).toHaveBeenCalledWith(`${url}/${idMovimiento}`);
    }));

    it('debe hacer un GET a control-carga-camion-varios cuando el tipo de producto es Vario',
      inject([ApiService, MovimientoService], (api: ApiService, service: MovimientoService) => {
      // Arrange
      const idMovimiento = 654;
      const idTipoProducto = TiposProducto.Varios;
      spyOn(api, 'get');

      // Act
      service.getMovimientoCarga(idMovimiento, idTipoProducto);

      // Assert
      const url = `control-carga-camion-varios`;
      expect(api.get).toHaveBeenCalledWith(`${url}/${idMovimiento}`);
    }));

    it('debe hacer un GET a control-carga-camion-varios cuando el tipo de producto es Insumo',
    inject([ApiService, MovimientoService], (api: ApiService, service: MovimientoService) => {
    // Arrange
    const idMovimiento = 654;
    const idTipoProducto = TiposProducto.Insumos;
    spyOn(api, 'get');

    // Act
    service.getMovimientoCarga(idMovimiento, idTipoProducto);

    // Assert
    const url = `control-carga-camion-varios`;
    expect(api.get).toHaveBeenCalledWith(`${url}/${idMovimiento}`);
  }));
  });

  describe('El método getPreCargaMovimientoSubproductoPorNroDocPorte', () => {
    it('debe hacer un GET a control-descarga-camion-subproductos con el id de circuito y el nro de doc de porte',
      inject([ApiService, MovimientoService], (api: ApiService, service: MovimientoService) => {
      // Arrange
      const idCircuito = 2;
      const numeroDocumentoPorte = '12345678';
      spyOn(api, 'get');

      // Act
      service.getPreCargaMovimientoSubproductoPorNroDocPorte(idCircuito, numeroDocumentoPorte);

      // Assert
      const url = `control-descarga-camion-subproductos`;
      expect(api.get).toHaveBeenCalledWith(`${url}/pre-carga?idCircuito=${idCircuito}&numeroDocumentoPorte=${numeroDocumentoPorte}`);
    }));
  });

  describe('El método getPreCargaMovimientoSubproductoPorId', () => {
    it('debe hacer un GET a control-descarga-camion-subproductos con el id del movimieto',
      inject([ApiService, MovimientoService], (api: ApiService, service: MovimientoService) => {
      // Arrange
      const idMovimiento = 2;
      spyOn(api, 'get');

      // Act
      service.getPreCargaMovimientoSubproductoPorId(idMovimiento);

      // Assert
      const url = `control-descarga-camion-subproductos`;
      expect(api.get).toHaveBeenCalledWith(`${url}/pre-carga/${idMovimiento}`);
    }));
  });
});
