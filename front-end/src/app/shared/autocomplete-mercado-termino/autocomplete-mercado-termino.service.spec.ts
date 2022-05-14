import { TestBed } from '@angular/core/testing';
import { AutocompleteMercadoTerminoService } from './autocomplete-mercado-termino.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from '../../core/services/restClient/api.service';
import { RestHandlerService } from '../../core/services/restClient/restHandler.service';
import { PopupModule } from '../../core/services/popupService/popup.module';
import { RequestOptionsService } from '../../core/services/restClient/requestOptions.service';
import { AuthService } from '../../core/services/session/auth.service';

describe('AutocompleteMercadoTerminoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutocompleteMercadoTerminoService,
                  ApiService,
                  RestHandlerService,
                  RequestOptionsService,
                  AuthService],
      imports: [HttpClientTestingModule,
                PopupModule]
    });
  });

  it('should be created', () => {
    const service: AutocompleteMercadoTerminoService = TestBed.get(AutocompleteMercadoTerminoService);
    expect(service).toBeTruthy();
  });
});
