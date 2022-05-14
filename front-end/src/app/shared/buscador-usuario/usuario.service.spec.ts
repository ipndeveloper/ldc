import { TestBed, inject } from '@angular/core/testing';

import { UsuarioService } from './usuario.service';
import { ApiService } from '../../core/services/restClient/api.service';
import { HttpClientModule } from '@angular/common/http';
import { RestHandlerService } from '../../core/services/restClient/restHandler.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { ConfirmationService } from '@jaspero/ng-confirmations';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { RequestOptionsService } from '../../core/services/restClient/requestOptions.service';
import { AuthService } from '../../core/services/session/auth.service';

describe('UsuarioService', () => {

  const apiservice = jasmine.createSpyObj('ApiService', ['get']);
  const service = new UsuarioService(apiservice);

  beforeEach(() => {
    apiservice.get.calls.reset();
    TestBed.configureTestingModule({
      providers: [
        RequestOptionsService,
        UsuarioService,
        AuthService,
        ApiService,
        RestHandlerService,
        PopupService,
        ConfirmationService,
        ToastrService
      ],
      imports: [HttpClientModule, ToastrModule.forRoot()]
    });
  });

  it('should be created', inject([UsuarioService], (serviceinstance: UsuarioService) => {
    expect(serviceinstance).toBeTruthy();
  }));

  describe('Test del construcctor', () => {

    it('Chequea que el nombre del api service sea correcto', () => {

      // arrange
      let testService: UsuarioService;
      // act
      testService = new UsuarioService(apiservice);

      // assert
      expect(testService.apiRoute).toEqual('usuarios');
    });

  });

  describe('Test del getByNombreUsuario', () => {

    it('Chequea llamada get', () => {

      // arrange

      // act

      service.getByNombreUsuario('nombreTest');

      // assert
      expect(apiservice.get).toHaveBeenCalledTimes(1);
    });

    it('Chequea que la ruta enviada a la api sea correcta', () => {

      // arrange
      let testServiceRoute = '';
      apiservice.get.and.callFake((route: string) => {
        testServiceRoute = route;
      });

      // act
      service.getByNombreUsuario('nombreTest');

      // assert
      expect(testServiceRoute).toEqual('usuarios/nombre-usuario?&nombreusuario=nombreTest&EsDeSistema=false');
    });

  });
});
