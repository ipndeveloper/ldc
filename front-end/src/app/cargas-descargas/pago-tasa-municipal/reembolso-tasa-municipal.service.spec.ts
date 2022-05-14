import { TestBed, inject } from '@angular/core/testing';
import { ReembolsoTasaMunicipalService } from './reembolso-tasa-municipal.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from '../../core/services/restClient/api.service';
import { RestHandlerService } from '../../core/services/restClient/restHandler.service';
import { PopupModule } from '../../core/services/popupService/popup.module';
import { RequestOptionsService } from '../../core/services/restClient/requestOptions.service';
import { AuthService } from '../../core/services/session/auth.service';

describe('ReembolsoTasaMunicipalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReembolsoTasaMunicipalService,
                  ApiService,
                  RestHandlerService,
                  RequestOptionsService,
                  AuthService],
      imports: [HttpClientTestingModule,
                PopupModule]
    });
  });

  it('should be created', inject([ReembolsoTasaMunicipalService], (service: ReembolsoTasaMunicipalService) => {
    expect(service).toBeTruthy();
  }));
});
