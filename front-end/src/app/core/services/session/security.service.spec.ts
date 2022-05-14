import { TestBed } from '@angular/core/testing';
import { ApiService } from '../restClient/api.service';
import { of } from 'rxjs';
import { TestModule } from '../../mocks/test.module';
import { BrowserModule } from '@angular/platform-browser';
import { SecurityService } from './security.service';

describe('SecurityService', () => {
  let service: SecurityService;
  let apiService: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule,
        BrowserModule
      ],
      providers: [
        ApiService,
        SecurityService
      ]
    });

    apiService = TestBed.get(ApiService);
    spyOn(apiService, 'post').and.returnValue(of());

    service = TestBed.get(SecurityService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('El metodo getPermissions', () => {
    it('Ejecuta una llamada post al servicio apiService', () => {
      // Arrange

      // Act
      service.getPermissions();

      // Assert
      expect(apiService.post).toHaveBeenCalledWith('permisos', {});
    });
  });
});

