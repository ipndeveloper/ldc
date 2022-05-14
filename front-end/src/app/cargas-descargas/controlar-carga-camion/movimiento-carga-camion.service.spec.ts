import { TestBed } from '@angular/core/testing';
import { MovimientoCargaCamionService } from './movimiento-carga-camion.service';
import { ApiService } from '../../core/services/restClient/api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PopupModule } from '../../core/services/popupService/popup.module';
import { RestHandlerService } from '../../core/services/restClient/restHandler.service';
import { RequestOptionsService } from '../../core/services/restClient/requestOptions.service';
import { AuthService } from '../../core/services/session/auth.service';

describe('MovimientoCargaCamionService', () => {
  let service: MovimientoCargaCamionService;
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

    service = TestBed.get(MovimientoCargaCamionService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
