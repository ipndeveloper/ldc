import { TestBed, inject } from '@angular/core/testing';

import { ApiService } from '../../core/services/restClient/api.service';
import { HttpClientModule } from '@angular/common/http';
import { RestHandlerService } from '../../core/services/restClient/restHandler.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { ConfirmationService } from '@jaspero/ng-confirmations';
import { RequestOptionsService } from '../../core/services/restClient/requestOptions.service';
import { AuthService } from '../../core/services/session/auth.service';
import { GestionarManipuleoService } from './gestionar-manipuleo.service';
import { ToastrService, ToastrModule } from 'ngx-toastr';

describe('GestionarManipuleoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GestionarManipuleoService,
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

  it('should be created', inject([GestionarManipuleoService], (service: GestionarManipuleoService) => {
    expect(service).toBeTruthy();
  }));
});
