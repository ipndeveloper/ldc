import { TestBed, inject } from '@angular/core/testing';
import { AdministrarPuntosCargaService } from './administrar-puntos-carga.service';
import { ApiService } from '../../core/services/restClient/api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RestHandlerService } from '../../core/services/restClient/restHandler.service';
import { PopupModule } from '../../core/services/popupService/popup.module';
import { RequestOptionsService } from '../../core/services/restClient/requestOptions.service';
import { AuthService } from '../../core/services/session/auth.service';

describe('AdministrarPuntosCargaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
                PopupModule],
      providers: [AdministrarPuntosCargaService,
                  ApiService,
                  RestHandlerService,
                  RequestOptionsService,
                  AuthService]
    });
  });

  it('should be created', inject([AdministrarPuntosCargaService], (service: AdministrarPuntosCargaService) => {
    expect(service).toBeTruthy();
  }));
});
