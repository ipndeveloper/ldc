import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { PopupModule } from '../../core/services/popupService/popup.module';
import { ApiService } from '../../core/services/restClient/api.service';
import { RequestOptionsService } from '../../core/services/restClient/requestOptions.service';
import { RestHandlerService } from '../../core/services/restClient/restHandler.service';
import { AuthService } from '../../core/services/session/auth.service';

import { SeleccionarBalanzaSalidaService } from './seleccionar-balanza-salida.service';

describe('SeleccionarBalanzaSalidaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        PopupModule
      ],
      providers: [
        SeleccionarBalanzaSalidaService,
        ApiService,
        RestHandlerService,
        RequestOptionsService,
        AuthService
      ]
    });
  });

  it('should be created', inject([SeleccionarBalanzaSalidaService],
                                 (service: SeleccionarBalanzaSalidaService) => {
    expect(service).toBeTruthy();
  }));
});
