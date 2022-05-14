import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDocumentoControlarCargaCamionComponent } from './datos-documento-controlar-carga-camion.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { FormBuilder } from '@angular/forms';
import { PopupModule } from '../../../core/services/popupService/popup.module';
import { ParametrosTerminalService } from '../../shared/services/parametros-terminal.service';
import { AuthService } from '../../../core/services/session/auth.service';
import { ApiService } from '../../../core/services/restClient/api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RestHandlerService } from '../../../core/services/restClient/restHandler.service';
import { RequestOptionsService } from '../../../core/services/restClient/requestOptions.service';
import { DescargaEventsNotifierService } from '../../shared/services/descarga-events-notifier.service';

describe('DatosDocumentoControlarCargaCamionComponent', () => {
  let component: DatosDocumentoControlarCargaCamionComponent;
  let fixture: ComponentFixture<DatosDocumentoControlarCargaCamionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DatosDocumentoControlarCargaCamionComponent],
      imports: [PopupModule, HttpClientTestingModule],
      providers: [
        FormComponentService,
        FormBuilder,
        AuthService,
        ParametrosTerminalService,
        ApiService,
        RestHandlerService,
        RequestOptionsService,
        AuthService,
        DescargaEventsNotifierService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosDocumentoControlarCargaCamionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
