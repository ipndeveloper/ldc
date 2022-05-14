import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlarDescargaCamionCerealesComponent } from './controlar-descarga-camion-cereales.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PopupService } from '../../core/services/popupService/popup.service';
import { ControlarDescargaCamionCerealesService } from './controlar-descarga-camion-cereales.service';
import { CircuitoService } from '../shared/services/circuito.service';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { NavigationService } from '../../core/services/navigationService/navigation.service';
import { AuthService } from '../../core/services/session/auth.service';
import { DescargaEventsNotifierService } from '../shared/services/descarga-events-notifier.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MovimientoService } from '../shared/services/movimiento.service';
import { configureTestSuite } from '../../core/mocks/testing';
import { CommandService } from '../../shared/command-service/command.service';
import { HotkeyModule } from 'angular2-hotkeys';
import { TurnoCircularService } from '../shared/services/turno-circular.service';
import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RequestOptionsService } from '../../core/services/restClient/requestOptions.service';
import { RestHandlerService } from '../../core/services/restClient/restHandler.service';
import { ApiService } from '../../core/services/restClient/api.service';
import { PopupModule } from '../../core/services/popupService/popup.module';
import { TipoDocumentoPorteService } from '../shared/desplegable-tipo-documento-porte/tipo-documento-porte.service';
import { ConsultarDatosAfipService } from '../../../app/gestion-afip/consultar-datos-afip/consultar-datos-afip-service';

describe('ControlarDescargaCamionCerealesComponent', () => {
  let component: ControlarDescargaCamionCerealesComponent;
  let fixture: ComponentFixture<ControlarDescargaCamionCerealesComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        ControlarDescargaCamionCerealesComponent,
      ],
      imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        PopupModule,
        RouterTestingModule,
        HotkeyModule.forRoot()
      ],
      providers : [
        ApiService,
        RestHandlerService,
        RequestOptionsService,
        AuthService,
        PopupService,
        ControlarDescargaCamionCerealesService,
        FormBuilder,
        CircuitoService,
        FormComponentService,
        NavigationService,
        DescargaEventsNotifierService,
        MovimientoService,
        CommandService,
        TurnoCircularService,
        TipoDocumentoPorteService,
        DatePipe,
        ConsultarDatosAfipService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlarDescargaCamionCerealesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
