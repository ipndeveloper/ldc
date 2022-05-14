import { TestBed, inject } from '@angular/core/testing';

import { MovimientoPesajeFueraDeCircuitoService } from './movimiento-pesaje-fuera-de-circuito.service';
import { HttpClientModule } from '@angular/common/http';
import { TestModule } from '../../../core/mocks/test.module';
import { ApiService } from '../../../core/services/restClient/api.service';
import { TiposTransporte } from '../../../shared/enums/enums';
import { RegistrarPesajeFueraDeCircuitoCommand } from '../../../shared/data-models/commands/cargas-descargas/registrar-pesaje-fuera-de-circuito-command';

describe('MovimientoPesajeFueraDeCircuitoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
            HttpClientModule,
            TestModule
        ],
        providers: [
          MovimientoPesajeFueraDeCircuitoService
        ]
    });
  });

  it('should be created', inject([MovimientoPesajeFueraDeCircuitoService], (service: MovimientoPesajeFueraDeCircuitoService) => {
    expect(service).toBeTruthy();
  }));

  describe('El metodo getMovimientoPesaje', () => {
    let idMovimiento;
    beforeEach(() => {
       idMovimiento = 1;
    });
    it('Invoca al metodo Get de la ApiService cuando es Camión',
      inject([MovimientoPesajeFueraDeCircuitoService, ApiService],
        (service: MovimientoPesajeFueraDeCircuitoService, apiService: ApiService) => {
        // Arrange
          spyOn(apiService, 'get').and.returnValue('');
          const esperado = 'movimiento-pesaje-camion/' + `${idMovimiento}`;
        // Act
          service.getMovimientoPesaje(idMovimiento, TiposTransporte.Camion);
        // Assert
          expect(apiService.get).toHaveBeenCalledTimes(1);
          expect(apiService.get).toHaveBeenCalledWith(esperado);
      }));

      it('Invoca al metodo Get de la ApiService cuando es Tren',
      inject([MovimientoPesajeFueraDeCircuitoService, ApiService],
        (service: MovimientoPesajeFueraDeCircuitoService, apiService: ApiService) => {
        // Arrange
          spyOn(apiService, 'get').and.returnValue('');
          const esperado = 'movimiento-pesaje-vagon/' + `${idMovimiento}`;
        // Act
        service.getMovimientoPesaje(idMovimiento, TiposTransporte.Tren);
        // Assert
        expect(apiService.get).toHaveBeenCalledTimes(1);
        expect(apiService.get).toHaveBeenCalledWith(esperado);
      }));
  });

  describe('El metodo Registrar', () => {
    it('Invoca al metodo Post de la ApiService',
    inject([MovimientoPesajeFueraDeCircuitoService, ApiService],
      (service: MovimientoPesajeFueraDeCircuitoService, apiService: ApiService) => {
      // Arrange
        spyOn(apiService, 'post').and.returnValue('');
        const command = new RegistrarPesajeFueraDeCircuitoCommand(1);
      // Act
        service.registrar(command);
      // Assert
        expect(apiService.post).toHaveBeenCalledTimes(1);
    }));
  });
});
