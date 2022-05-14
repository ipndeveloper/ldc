import { TestBed, inject } from '@angular/core/testing';

import { CambiarTarjetaService } from './cambiar-tarjeta.service';
import { ApiService } from '../../core/services/restClient/api.service';
import { MovimientoCambioTarjeta } from '../../shared/data-models/movimiento-cambio-tarjeta';
import { of } from 'rxjs';
import { CambiarTarjetaCommand } from '../../shared/data-models/commands/cargas-descargas/cambiar-tarjeta-command';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PopupModule } from '../../core/services/popupService/popup.module';
import { RestHandlerService } from '../../core/services/restClient/restHandler.service';
import { RequestOptionsService } from '../../core/services/restClient/requestOptions.service';
import { AuthService } from '../../core/services/session/auth.service';

describe('CambiarTarjetaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        PopupModule
      ],
      providers: [
        CambiarTarjetaService,
        ApiService,
        RestHandlerService,
        RequestOptionsService,
        AuthService]
    });
  });

  it('should be created', inject([CambiarTarjetaService], (service: CambiarTarjetaService) => {
    expect(service).toBeTruthy();
  }));

  describe('El método buscarMovimientos', () => {
    it('debe hacer un GET del movimiento para el cambio de tarjeta',
      inject([ApiService, CambiarTarjetaService], (api: ApiService, service: CambiarTarjetaService) => {
        const idTipoDocumentoPorte = 7;
        const numeroDocumentoPorte = '000120180823';
        const patenteCamion = undefined;
        const ctg = undefined;
      spyOn(api, 'get');

        service.buscarMovimientos(numeroDocumentoPorte, idTipoDocumentoPorte, patenteCamion, ctg);

      const url = `movimientos/cambiar-tarjeta-buscar?idTipoDocumentoPorte=${idTipoDocumentoPorte}&numeroDocumentoPorte=${numeroDocumentoPorte}`
      + `&numeroVagon=${undefined}` + `&patenteCamion=${patenteCamion}` + `&ctg=${ctg}`;
      expect(api.get).toHaveBeenCalledWith(url);
    }));

    it('debe devolver el MovimientoCambioTarjeta retornado por la api',
      inject([ApiService, CambiarTarjetaService], (api: ApiService, service: CambiarTarjetaService) => {

      const expected = of(new MovimientoCambioTarjeta());
      spyOn(api, 'get').and.returnValue(expected);

      const actual = service.buscarMovimientos('654654', 1);

      expect(actual).toBe(actual);
    }));
  });

  describe('El método cambiarTarjeta', () => {
    it('debe hacer un PATCH al movimiento para el cambio de tarjeta',
      inject([ApiService, CambiarTarjetaService], (api: ApiService, service: CambiarTarjetaService) => {

      const idMovimiento = 654;
      const numeroTarjeta = 1101;
      spyOn(api, 'patch');

      service.cambiarTarjeta(idMovimiento, numeroTarjeta);

      const url = `movimientos/${idMovimiento}/cambiar-tarjeta`;
      const command = new CambiarTarjetaCommand(idMovimiento, numeroTarjeta);
      expect(api.patch).toHaveBeenCalledWith(url, command);
    }));
  });
});
