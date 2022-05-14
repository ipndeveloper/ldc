import { TestBed, inject } from '@angular/core/testing';

import { TestModule } from '../../core/mocks/test.module';
import { HttpClientModule } from '@angular/common/http';
import { QuitarDeCircuitoService } from './quitar-de-circuito.service';
import { ApiService } from '../../core/services/restClient/api.service';
import { TiposTransporte } from '../../shared/enums/enums';
import { QuitarDeCircuitoCommand } from '../../shared/data-models/commands/cargas-descargas/quitar-de-circuito-command';

describe('QuitarDeCircuitoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule,
        HttpClientModule
      ],
      providers: [
        QuitarDeCircuitoService
      ]
    });
  });

  it('should be created', inject([QuitarDeCircuitoService], (service: QuitarDeCircuitoService) => {
    expect(service).toBeTruthy();
  }));

  describe('El Metodo getMovimientoQuitarDeCircuito', () => {
    it('Llama a this.apiService.get<MovimientoQuitarDeCircuitoDataView> con la URL para buscar el movimiento tipo Camion',
    inject([ApiService, QuitarDeCircuitoService],
      (apiService: ApiService, service: QuitarDeCircuitoService) => {
      // Arrange
      spyOn(apiService, 'get');
      const tipoTransporte = TiposTransporte.Camion;
      const patente = 'AAA111';

      // Act
      service.getMovimientoQuitarDeCircuito(tipoTransporte, patente);

      // Assert
      expect(apiService.get).toHaveBeenCalled();
    }));
  });

  describe('El Metodo quitarDeCircuito', () => {
    it('Llama a this.apiService.post con la URL para quitar el movimiento de circuito',
    inject([ApiService, QuitarDeCircuitoService],
      (apiService: ApiService, service: QuitarDeCircuitoService) => {
      // Arrange
      spyOn(apiService, 'post');
      const quitarDeCircuitoCommand = new QuitarDeCircuitoCommand(1, '');

      // Act
      service.quitarDeCircuito(quitarDeCircuitoCommand);

      // Assert
      expect(apiService.post).toHaveBeenCalled();
    }));
});
});
