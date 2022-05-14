import { TestBed } from '@angular/core/testing';
import { AdministrarParametrosPorTipoAnalisisCamaraService } from './administrar-parametros-por-tipo-analisis-camara.service';
import { PopupModule } from '../../core/services/popupService/popup.module';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from '../../core/services/restClient/api.service';
import { RestHandlerService } from '../../core/services/restClient/restHandler.service';
import { RequestOptionsService } from '../../core/services/restClient/requestOptions.service';
import { AuthService } from '../../core/services/session/auth.service';

describe('AdministrarParametrosPorTipoAnalisisCamaraService', () => {
  let service: AdministrarParametrosPorTipoAnalisisCamaraService;
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

    service = TestBed.get(AdministrarParametrosPorTipoAnalisisCamaraService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
