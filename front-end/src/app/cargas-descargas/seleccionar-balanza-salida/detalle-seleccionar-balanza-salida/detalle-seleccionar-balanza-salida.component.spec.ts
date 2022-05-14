import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { HotkeyModule } from 'angular2-hotkeys';
import { configureTestSuite } from '../../../core/mocks/testing';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { PopupModule } from '../../../core/services/popupService/popup.module';
import { ApiService } from '../../../core/services/restClient/api.service';
import { RequestOptionsService } from '../../../core/services/restClient/requestOptions.service';
import { RestHandlerService } from '../../../core/services/restClient/restHandler.service';
import { AuthService } from '../../../core/services/session/auth.service';
import { CommandService } from '../../../shared/command-service/command.service';
import { SeleccionarBalanzaSalidaService } from '../seleccionar-balanza-salida.service';

import { DetalleSeleccionarBalanzaSalidaComponent } from './detalle-seleccionar-balanza-salida.component';

describe('DetalleSeleccionarBalanzaSalidaComponent', () => {
  let component: DetalleSeleccionarBalanzaSalidaComponent;
  let fixture: ComponentFixture<DetalleSeleccionarBalanzaSalidaComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleSeleccionarBalanzaSalidaComponent],
      imports: [
        HttpClientTestingModule,
        PopupModule,
        HotkeyModule.forRoot()
      ],
      providers: [
        FormBuilder,
        FormComponentService,
        SeleccionarBalanzaSalidaService,
        ApiService,
        RestHandlerService,
        RequestOptionsService,
        AuthService,
        CommandService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleSeleccionarBalanzaSalidaComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
