import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PopupModule } from '../../core/services/popupService/popup.module';
import { ApiService } from '../../core/services/restClient/api.service';
import { RequestOptionsService } from '../../core/services/restClient/requestOptions.service';
import { RestHandlerService } from '../../core/services/restClient/restHandler.service';
import { AuthService } from '../../core/services/session/auth.service';
import { GestionarTransportesCircuitoService } from './gestionar-transportes-circuito.service';

describe('SearchControlService', () => {
  let service: GestionarTransportesCircuitoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        PopupModule
      ],
      providers: [
        ApiService,
        RestHandlerService,
        RequestOptionsService,
        AuthService
      ]
    });

    service = TestBed.get(GestionarTransportesCircuitoService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
