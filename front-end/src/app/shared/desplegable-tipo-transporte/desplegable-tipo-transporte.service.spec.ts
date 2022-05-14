import { TestBed } from '@angular/core/testing';
import { TestModule } from '../../core/mocks/test.module';
import { TipoTransporteService } from './desplegable-tipo-transporte.service';
import { ApiService } from '../../core/services/restClient/api.service';
import { of } from 'rxjs';
import { DropdownNotificationService } from '../../core/shared/super/dropdown-notification.service';

describe('TipoTransporteService', () => {
  let apiService: ApiService;
  let service: TipoTransporteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [TipoTransporteService, ApiService, DropdownNotificationService]
    });
    apiService = TestBed.get(ApiService);
    service = TestBed.get(TipoTransporteService);
    spyOn(apiService, 'get').and.returnValue(of(''));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('El Metodo getAll', () => {

    it('Invoca al metodo Get del ApiService', () => {
      // Arrange

      // Act
      service.getAll();
      // Assert
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });

    it('Invoca al metodo Get del apiService con la Url esperada', () => {
      // Arrange
      const esperado = 'tipo-transporte?soloCamionYTren=false';
      // Act
      service.getAll();
      // Assert
      expect(apiService.get).toHaveBeenCalledWith(esperado);
    });

  });

});
