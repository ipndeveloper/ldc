import { TestBed, inject } from '@angular/core/testing';
import { ReimprimirTurnoPlayaService } from './reimprimir-turno-playa.service';
import { ApiService } from '../../core/services/restClient/api.service';
import { TestModule } from '../../core/mocks/test.module';
import { HttpClientModule } from '@angular/common/http';
import { ReimprimirTurnoPlayaCommand } from '../../shared/data-models/commands/cargas-descargas/reimprimir-turno-playa-command';

describe('ReimprimirTurnoPlayaService', () => {
  let apiService: ApiService;
  let reimprimirTurnoPlayaService: ReimprimirTurnoPlayaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule,
        HttpClientModule
      ],
      providers: [
        ReimprimirTurnoPlayaService,
        ApiService
      ]
    });

    apiService = TestBed.get(ApiService);
    reimprimirTurnoPlayaService = TestBed.get(ReimprimirTurnoPlayaService);
  });

  it('should be created', inject([ReimprimirTurnoPlayaService], (service: ReimprimirTurnoPlayaService) => {
    expect(service).toBeTruthy();
  }));

  describe('El método get', () => {
    let tipoDocumentoPorte: string;
    let numeroDocumentoPorte: string;
    let idVendedor: number;
    let ctg;

    beforeEach(() => {
      tipoDocumentoPorte = 'Documento de Porte';
      numeroDocumentoPorte = '12345678';
      idVendedor = 2;
      ctg = 123;
    });

    it('Invoca al get del apiService', () => {
      // Arrange
      spyOn(apiService, 'get');

      // Act
      reimprimirTurnoPlayaService.get(tipoDocumentoPorte, numeroDocumentoPorte, ctg, idVendedor);

      // Assert
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });

    it('Invoca al get del apiService con los datos enviados', () => {
      // Arrange
      spyOn(apiService, 'get');
      let esperado = `reimprimir-turno-playa?tipoDocumentoPorte=${tipoDocumentoPorte}`;
      esperado += `&numeroDocumentoPorte=${numeroDocumentoPorte}&ctg=${ctg}&IdVendedor=${idVendedor}`;

      // Act
      reimprimirTurnoPlayaService.get(tipoDocumentoPorte, numeroDocumentoPorte, ctg, idVendedor);

      // Assert
      expect(apiService.get).toHaveBeenCalledWith(esperado);
    });
  });

  describe('El método reimprimirTurnoPlaya', () => {
    it('Invoca al POST del apiService', () => {
      // Arrange
      const command = {} as ReimprimirTurnoPlayaCommand;
      spyOn(apiService, 'post');

      // Act
      reimprimirTurnoPlayaService.reimprimirTurnoPlaya(command);

      // Assert
      expect(apiService.post).toHaveBeenCalledTimes(1);
    });

    it('Invoca al POST del apiService con los datos enviados', () => {
      // Arrange
      const url = `reimprimir-turno-playa`;
      const command = {} as ReimprimirTurnoPlayaCommand;
      spyOn(apiService, 'post');

      // Act
      reimprimirTurnoPlayaService.reimprimirTurnoPlaya(command);

      // Assert
      expect(apiService.post).toHaveBeenCalledWith(url, command);
    });
  });
});
