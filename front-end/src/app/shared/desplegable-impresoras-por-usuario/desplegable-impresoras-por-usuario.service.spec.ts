import { TestBed, inject } from '@angular/core/testing';
import { DesplegableImpresorasPorUsuarioService } from './desplegable-impresoras-por-usuario.service';
import { TestModule } from '../../core/mocks/test.module';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../../core/services/restClient/api.service';

describe('DesplegableImpresorasPorUsuarioService', () => {
  let apiService: ApiService;
  let desplegableImpresorasPorUsuarioService: DesplegableImpresorasPorUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule,
        HttpClientModule
      ],
      providers: [
        DesplegableImpresorasPorUsuarioService,
        ApiService
      ],
    });

    apiService = TestBed.get(ApiService);
    desplegableImpresorasPorUsuarioService = TestBed.get(DesplegableImpresorasPorUsuarioService);
  });

  it('should be created', inject([DesplegableImpresorasPorUsuarioService], (service: DesplegableImpresorasPorUsuarioService) => {
    expect(service).toBeTruthy();
  }));

  describe('El método getAll', () => {
    it('Invoca al get del apiService', () => {
      // Arrange
      spyOn(apiService, 'get');
      const esperado = `impresoras/usuario`;

      // Act
      desplegableImpresorasPorUsuarioService.getAll();

      // Assert
      expect(apiService.get).toHaveBeenCalledTimes(1);
      expect(apiService.get).toHaveBeenCalledWith(esperado);
    });
  });
});
