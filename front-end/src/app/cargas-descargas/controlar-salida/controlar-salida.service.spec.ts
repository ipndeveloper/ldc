import { TestBed } from '@angular/core/testing';
import { ControlarSalidaService } from './controlar-salida.service';
import { ApiService } from '../../core/services/restClient/api.service';
import { RegistrarSalidaConDescargaCommand } from '../../shared/data-models/commands/cargas-descargas/registrar-salida-con-descarga-command';
import { RegistrarSalidaSinDescargaCommand } from '../../shared/data-models/commands/cargas-descargas/registrar-salida-sin-descarga-command';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PopupModule } from '../../core/services/popupService/popup.module';
import { RestHandlerService } from '../../core/services/restClient/restHandler.service';
import { RequestOptionsService } from '../../core/services/restClient/requestOptions.service';
import { AuthService } from '../../core/services/session/auth.service';
import { TipoDocumentoPorteService } from '../shared/desplegable-tipo-documento-porte/tipo-documento-porte.service';
import { DispositivoService } from '../shared/services/dispositivo.service';
import { ConsultarDatosAfipService } from '../../../app/gestion-afip/consultar-datos-afip/consultar-datos-afip-service';

describe('ControlarSalidaService', () => {
  let apiService: ApiService;
  let controlarSalidaService: ControlarSalidaService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        PopupModule
      ],
      providers: [
        DispositivoService,
        TipoDocumentoPorteService,
        ConsultarDatosAfipService,
        ApiService,
        RestHandlerService,
        RequestOptionsService,
        AuthService,
        ControlarSalidaService
      ]
    });

    apiService = TestBed.get(ApiService);
    controlarSalidaService = TestBed.get(ControlarSalidaService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(controlarSalidaService).toBeTruthy();
  });

  describe('El metodo getMovimientoControlSalida', () => {
    let patenteCamion: string;
    let numeroTarjeta: number;

    beforeEach(() => {
      patenteCamion = 'aaa111';
      numeroTarjeta = 123;
    });

    it('Invoca al get del apiService', () => {
      // Arrange
      spyOn(apiService, 'get');
      // Act
      controlarSalidaService.getMovimientoControlSalida(patenteCamion, numeroTarjeta);
      // Assert
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });

    it('Invoca al get del apiService con los datos enviados', () => {
      // Arrange
      spyOn(apiService, 'get');
      const esperado = `control-salida?patente=${patenteCamion}&tarjeta=${numeroTarjeta}`;
      // Act
      controlarSalidaService.getMovimientoControlSalida(patenteCamion, numeroTarjeta);
      // Assert
      expect(apiService.get).toHaveBeenCalledWith(esperado);
    });
  });

  describe('El metodo registrarSalidaConDescarga', () => {
    let command: RegistrarSalidaConDescargaCommand;

    beforeEach(() => {
      command = new RegistrarSalidaConDescargaCommand(1);
    });

    it('Invoca al POST del apiService', () => {
      // Arrange
      spyOn(apiService, 'post');
      // Act
      controlarSalidaService.registrarSalidaConDescarga(command);
      // Assert
      expect(apiService.post).toHaveBeenCalledTimes(1);
    });

    it('Invoca al POST del apiService con los datos enviados', () => {
      // Arrange
      spyOn(apiService, 'post');
      const esperado = `control-salida/${command.idMovimiento}/registrar-salida-con-descarga`;
      // Act
      controlarSalidaService.registrarSalidaConDescarga(command);
      // Assert
      expect(apiService.post).toHaveBeenCalledWith(esperado, command);
    });
  });

  describe('El metodo registrarSalidaSinDescarga', () => {
    let command: RegistrarSalidaSinDescargaCommand;

    beforeEach(() => {
      command = new RegistrarSalidaSinDescargaCommand(1, true, false, '');
    });

    it('Invoca al POST del apiService', () => {
      // Arrange
      spyOn(apiService, 'post');
      // Act
      controlarSalidaService.registrarSalidaSinDescarga(command);
      // Assert
      expect(apiService.post).toHaveBeenCalledTimes(1);
    });

    it('Invoca al POST del apiService con los datos enviados', () => {
      // Arrange
      spyOn(apiService, 'post');
      const esperado = `control-salida/${command.id}/registrar-salida-sin-descarga`;
      // Act
      controlarSalidaService.registrarSalidaSinDescarga(command);
      // Assert
      expect(apiService.post).toHaveBeenCalledWith(esperado, command);
    });
  });
});

