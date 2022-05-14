import { TestBed, inject } from '@angular/core/testing';
import { LoginService } from './login.service';
import { ApiService } from '../restClient/api.service';
import { of } from 'rxjs';
import { TestModule } from '../../mocks/test.module';
import { BrowserModule } from '@angular/platform-browser';

describe('LoginService', () => {

  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
      ],
      imports: [
        TestModule,
        BrowserModule
      ],
      providers: [
        ApiService,
        LoginService
      ]
    });

    const apiService = TestBed.get(ApiService);
    spyOn(apiService, 'post').and.returnValue(of());

    service = TestBed.get(LoginService);
});

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('El metodo login', () => {
    let userName: string;
    let password: string;
    let idTerminal: number;

    beforeEach(() => {
      userName = 'andreslaneUser';
      password = 'andreslanePass';
      idTerminal = 422;
    });

    it('Ejecuta una llamada post al servicio apiService',
      inject([ApiService],
        (apiService: ApiService) => {

        // Arrange

        // Act
        service.login(userName, password, idTerminal);

        // Assert
        const url = 'login';
        const command = { nombreUsuario: userName, contrasenia: password, idTerminal };
        expect(apiService.post).toHaveBeenCalledWith(url, command);
        expect(apiService.post).toHaveBeenCalledTimes(1);
      })
    );
  });

});
