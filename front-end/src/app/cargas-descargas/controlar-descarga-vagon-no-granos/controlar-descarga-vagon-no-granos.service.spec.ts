import { TestBed } from '@angular/core/testing';

import { ControlarDescargaVagonNoGranosService } from './controlar-descarga-vagon-no-granos.service';
import { HttpClientModule } from '@angular/common/http';
import { TestModule } from '../../core/mocks/test.module';
import { ApiService } from '../../core/services/restClient/api.service';
import { of } from 'rxjs';

describe('ControlarDescargaVagonNoGranosService', () => {
  let service: ControlarDescargaVagonNoGranosService;
  let apiService: ApiService;
  const apiUrl = 'control-descarga-vagon-no-granos';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        TestModule
      ],
      providers: [
        ApiService,
        ControlarDescargaVagonNoGranosService,
      ]
    });

    apiService = TestBed.get(ApiService);
    spyOn(apiService, 'get');
    spyOn(apiService, 'post');
    service = TestBed.get(ControlarDescargaVagonNoGranosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('El metodo TodosVagonesFactiblesModificarFueraPuesto', () => {

    it('invoca al metodo get del apiService', () => {
      // Arrange
      const esperado = `${apiUrl}/todos-vagones-factibles-modificar-fuera-puesto?numeroDocumentoPorte=123`;
      (apiService.get as jasmine.Spy).and.returnValue(of(true));

      // Act
      service.TodosVagonesFactiblesModificarFueraPuesto('123');

      // Assert
      expect(apiService.get).toHaveBeenCalledTimes(1);
      expect(apiService.get).toHaveBeenCalledWith(esperado);
    });
  });
});
