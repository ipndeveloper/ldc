import { TestBed } from '@angular/core/testing';
import { ControlarDescargaCamionInsumosService } from './controlar-descarga-camion-insumos.service';
import { ApiService } from '../../core/services/restClient/api.service';
import { TestModule } from '../../core/mocks/test.module';
import { HttpClientModule } from '@angular/common/http';
import { ControlarDescargaCamionInsumosCommand } from '../../shared/data-models/commands/cargas-descargas/controlar-descarga-camion-insumos-command';
import { DejarPendienteDescargaCamionInsumosCommand } from '../../shared/data-models/commands/cargas-descargas/dejar-pendiente-descarga-camion-insumos-command';

describe('ControlarDescargaCamionInsumosService', () => {
  const apiURL = 'control-descarga-camion-insumos';
  let apiService: ApiService;
  let controlarDescargaCamionInsumosService: ControlarDescargaCamionInsumosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule,
        HttpClientModule
      ],
      providers: [
        ControlarDescargaCamionInsumosService,
        ApiService
      ]
    });

    apiService = TestBed.get(ApiService);
    controlarDescargaCamionInsumosService = TestBed.get(ControlarDescargaCamionInsumosService);
  });

  it('should be created', () => {
    expect(controlarDescargaCamionInsumosService).toBeTruthy();
  });

  describe('El método RegistrarMovimiento', () => {
    it('Invoca al post ApiService para registrar un movimiento', () => {
      // Arrange
      const command = {} as ControlarDescargaCamionInsumosCommand;
      spyOn(apiService, 'post');

      // Act
      controlarDescargaCamionInsumosService.registrarMovimiento(command, false);

      // Assert
      expect(apiService.post).toHaveBeenCalledTimes(1);
      expect(apiService.post).toHaveBeenCalledWith(apiURL, command);
    });
  });

  describe('El método DejarPendiente', () => {
    it('Invoca al post ApiService para dejar pendiente un movimiento', () => {
      // Arrange
      const command = {} as DejarPendienteDescargaCamionInsumosCommand;
      const apiURLDejarPendiente = `${apiURL}/dejar-pendiente`;
      spyOn(apiService, 'post');

      // Act
      controlarDescargaCamionInsumosService.dejarPendiente(command, false);

      // Assert
      expect(apiService.post).toHaveBeenCalledTimes(1);
      expect(apiService.post).toHaveBeenCalledWith(apiURLDejarPendiente, command);
    });
  });

});
