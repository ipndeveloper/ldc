import { TestBed } from '@angular/core/testing';
import { MovimientoCargaCamionInsumoVarioService } from './movimiento-carga-camion-insumo-vario.service';
import { ApiService } from '../../core/services/restClient/api.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { RestHandlerService } from '../../core/services/restClient/restHandler.service';
import { PopupModule } from '../../core/services/popupService/popup.module';
import { RequestOptionsService } from '../../core/services/restClient/requestOptions.service';
import { AuthService } from '../../core/services/session/auth.service';

describe('ControlarCargaCamionInsumoVarioService', () => {
  let service: MovimientoCargaCamionInsumoVarioService;
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

    service = TestBed.get(MovimientoCargaCamionInsumoVarioService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
