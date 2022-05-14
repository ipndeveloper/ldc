import { TestBed, inject } from '@angular/core/testing';

import { ReimprimirTicketPesajeService } from './reimprimir-ticket-pesaje.service';
import { ApiService } from '../../../core/services/restClient/api.service';
import { RestHandlerService } from '../../../core/services/restClient/restHandler.service';

import { ConfirmationService } from '@jaspero/ng-confirmations';
import { RequestOptionsService } from '../../../core/services/restClient/requestOptions.service';
import { AuthService } from '../../../core/services/session/auth.service';
import { PopupService } from '../../../core/services/popupService/popup.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService, ToastrModule } from 'ngx-toastr';

describe('ReimprimirTicketPesajeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ReimprimirTicketPesajeService,
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

  it('should be created', inject([ReimprimirTicketPesajeService], (service: ReimprimirTicketPesajeService) => {
    expect(service).toBeTruthy();
  }));
});
