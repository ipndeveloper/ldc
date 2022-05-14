import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleAdministrarActividadesCircuitoComponent } from './detalle-administrar-actividades-circuito.component';
import { ActividadService } from './actividad.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { configureTestSuite } from '../../../core/mocks/testing';
import { FormBuilder } from '@angular/forms';
import { ApiService } from '../../../core/services/restClient/api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RestHandlerService } from '../../../core/services/restClient/restHandler.service';
import { PopupModule } from '../../../core/services/popupService/popup.module';
import { RequestOptionsService } from '../../../core/services/restClient/requestOptions.service';
import { AuthService } from '../../../core/services/session/auth.service';

describe('DetalleAdministrarActividadesCircuitoComponent', () => {
  let component: DetalleAdministrarActividadesCircuitoComponent;
  let fixture: ComponentFixture<DetalleAdministrarActividadesCircuitoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleAdministrarActividadesCircuitoComponent],
      imports: [
        HttpClientTestingModule,
        PopupModule
      ],
      providers: [
        ApiService,
        RestHandlerService,
        RequestOptionsService,
        AuthService,
        ActividadService,
        FormBuilder
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleAdministrarActividadesCircuitoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
