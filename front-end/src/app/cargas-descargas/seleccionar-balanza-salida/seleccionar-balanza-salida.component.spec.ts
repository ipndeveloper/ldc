import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HotkeyModule } from 'angular2-hotkeys';
import { configureTestSuite } from '../../core/mocks/testing';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { NavigationService } from '../../core/services/navigationService/navigation.service';
import { PopupModule } from '../../core/services/popupService/popup.module';
import { ApiService } from '../../core/services/restClient/api.service';
import { RequestOptionsService } from '../../core/services/restClient/requestOptions.service';
import { RestHandlerService } from '../../core/services/restClient/restHandler.service';
import { AuthService } from '../../core/services/session/auth.service';
import { CommandService } from '../../shared/command-service/command.service';

import { SeleccionarBalanzaSalidaComponent } from './seleccionar-balanza-salida.component';
import { SeleccionarBalanzaSalidaService } from './seleccionar-balanza-salida.service';

describe('SeleccionarBalanzaSalidaComponent', () => {
  let component: SeleccionarBalanzaSalidaComponent;
  let fixture: ComponentFixture<SeleccionarBalanzaSalidaComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [SeleccionarBalanzaSalidaComponent],
      imports: [
        HttpClientTestingModule,
        PopupModule,
        HotkeyModule.forRoot(),
        RouterTestingModule
      ],
      providers: [
        FormBuilder,
        FormComponentService,
        SeleccionarBalanzaSalidaService,
        ApiService,
        RestHandlerService,
        RequestOptionsService,
        AuthService,
        CommandService,
        NavigationService,
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionarBalanzaSalidaComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
