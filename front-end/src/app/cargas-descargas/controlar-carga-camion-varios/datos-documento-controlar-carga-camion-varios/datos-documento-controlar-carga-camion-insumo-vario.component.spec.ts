import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDocumentoControlarCargaCamionInsumoVarioComponent } from './datos-documento-controlar-carga-camion-Insumo-vario.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { FormBuilder } from '@angular/forms';
import { PopupModule } from '../../../core/services/popupService/popup.module';
import { ParametrosTerminalService } from '../../shared/services/parametros-terminal.service';
import { ApiService } from '../../../core/services/restClient/api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RestHandlerService } from '../../../core/services/restClient/restHandler.service';
import { RequestOptionsService } from '../../../core/services/restClient/requestOptions.service';
import { AuthService } from '../../../core/services/session/auth.service';

describe('DatosDocumentosControlarCargaCamionVariosComponent', () => {
  let component: DatosDocumentoControlarCargaCamionInsumoVarioComponent;
  let fixture: ComponentFixture<DatosDocumentoControlarCargaCamionInsumoVarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatosDocumentoControlarCargaCamionInsumoVarioComponent],
      imports: [PopupModule, HttpClientTestingModule],
      providers: [
        FormBuilder,
        FormComponentService,
        ParametrosTerminalService,
        ApiService,
        RestHandlerService,
        RequestOptionsService,
        AuthService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosDocumentoControlarCargaCamionInsumoVarioComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
