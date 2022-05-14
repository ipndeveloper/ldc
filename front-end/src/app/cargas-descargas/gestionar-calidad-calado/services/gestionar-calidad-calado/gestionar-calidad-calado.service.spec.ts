import { TestBed, inject } from '@angular/core/testing';

import { GestionarCalidadCaladoService } from './gestionar-calidad-calado.service';
import { ApiService } from '../../../../core/services/restClient/api.service';
import { HttpClientModule } from '@angular/common/http';
import { RestHandlerService } from '../../../../core/services/restClient/restHandler.service';
import { PopupService } from '../../../../core/services/popupService/popup.service';
import { ConfirmationService } from '@jaspero/ng-confirmations';
import { RequestOptionsService } from '../../../../core/services/restClient/requestOptions.service';
import { AuthService } from '../../../../core/services/session/auth.service';
import { ToastrService, ToastrModule } from 'ngx-toastr';

describe('GestionarCalidadCaladoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GestionarCalidadCaladoService,
        ApiService,
        RestHandlerService,
        PopupService,
        ConfirmationService,
        ToastrService,
        RequestOptionsService,
        AuthService
      ],
      imports: [
        HttpClientModule,
        ToastrModule.forRoot()
      ]
    });
  });

  it('should be created', inject([GestionarCalidadCaladoService], (service: GestionarCalidadCaladoService) => {
    expect(service).toBeTruthy();
  }));
});
