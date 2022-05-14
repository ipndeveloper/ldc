import { TestBed, inject } from '@angular/core/testing';
import { ChecklistControlPatrimonialService } from './checklist-control-patrimonial.service';
import { TestModule } from '../../core/mocks/test.module';
import { ApiService } from '../../core/services/restClient/api.service';
import { HttpClientModule } from '@angular/common/http';
import { ChecklistControlPatrimonialCommand } from '../../shared/data-models/commands/cargas-descargas/checklist-control-patrimonial-command';

describe('ChecklistControlPatrimonialService', () => {
  let apiService: ApiService;
  let controlPatrimonialService: ChecklistControlPatrimonialService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule,
        HttpClientModule
      ],
      providers: [
        ChecklistControlPatrimonialService,
        ApiService
      ]
    });

    apiService = TestBed.get(ApiService);
    controlPatrimonialService = TestBed.get(ChecklistControlPatrimonialService);
  });

  it('should be created',
     inject([ChecklistControlPatrimonialService],
            (service: ChecklistControlPatrimonialService) => {
    expect(service).toBeTruthy();
  }));

  describe('El metodo getMovimiento', () => {
    let patenteCamion: string;

    beforeEach(() => {
      patenteCamion = 'ABC123';
    });

    it('Invoca al get del apiService', () => {
        // Arrange
        spyOn(apiService, 'get');

        // Act
        controlPatrimonialService.getMovimiento(patenteCamion, null);

        // Assert
        expect(apiService.get).toHaveBeenCalledTimes(1);
      });

    it('Invoca al get del apiService con los datos de patente', () => {
      // Arrange
      spyOn(apiService, 'get');
      const esperado = `actualizar-checklist-control-patrimonial?patentecamion=${patenteCamion}`;

      // Act
      controlPatrimonialService.getMovimiento(patenteCamion, null);

      // Assert
      expect(apiService.get).toHaveBeenCalledWith(esperado);
    });

    it('Invoca al get del apiService con el id de movimiento', () => {
      // Arrange
      spyOn(apiService, 'get');
      const idMovimiento = 1;
      const esperado = `actualizar-checklist-control-patrimonial?idmovimiento=${idMovimiento}`;

      // Act
      controlPatrimonialService.getMovimiento(null, idMovimiento);

      // Assert
      expect(apiService.get).toHaveBeenCalledWith(esperado);
    });
  });

  describe('El metodo actualizarControlPatrimonial', () => {
    let command: ChecklistControlPatrimonialCommand;

    beforeEach(() => {
      command = new ChecklistControlPatrimonialCommand();
    });

    it('Invoca al POST del apiService', () => {
      // Arrange
      spyOn(apiService, 'post');

      // Act
      controlPatrimonialService.actualizarControlPatrimonial(command);

      // Assert
      expect(apiService.post).toHaveBeenCalledTimes(1);
      });

    it('Invoca al POST del apiService con los datos enviados', () => {
      // Arrange
      spyOn(apiService, 'post');
      const esperado = `actualizar-checklist-control-patrimonial/${command.id}`;

      // Act
      controlPatrimonialService.actualizarControlPatrimonial(command);

      // Assert
      expect(apiService.post).toHaveBeenCalledWith(esperado, command);
    });
  });
});
