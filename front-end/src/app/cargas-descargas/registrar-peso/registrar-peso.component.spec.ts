import { RegistrarPesoComponent } from './registrar-peso.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configureTestSuite } from '../../core/mocks/testing';
import { FormBuilder } from '@angular/forms';
import { PopupModule } from '../../core/services/popupService/popup.module';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { BusquedaMovimientoPesajeService } from './busqueda-movimiento-pesaje/busqueda-movimiento-pesaje.service';
import { MovimientoService } from '../shared/services/movimiento.service';
import { CircuitoService } from '../shared/services/circuito.service';
import { RegistrarPesadaService } from './registrar-pesada.service';
import { MotivosNoDescargaService } from './situacion-entrada/lista-motivos-no-descarga/motivos-no-descarga.service';
import { BalanzaService } from '../shared/services/balanza.service';
import { AuthService } from '../../core/services/session/auth.service';
import { DispositivoService } from '../shared/services/dispositivo.service';
import { CommandService } from '../../shared/command-service/command.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ApiService } from '../../core/services/restClient/api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RestHandlerService } from '../../core/services/restClient/restHandler.service';
import { RequestOptionsService } from '../../core/services/restClient/requestOptions.service';
import { HotkeyModule } from 'angular2-hotkeys';
import { NavigationService } from '../../core/services/navigationService/navigation.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('RegistrarPesoComponent', () => {
  let component: RegistrarPesoComponent;
  let fixture: ComponentFixture<RegistrarPesoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrarPesoComponent],
      imports: [
        HttpClientTestingModule,
        HotkeyModule.forRoot(),
        PopupModule,
        RouterTestingModule
      ],
      providers: [
        ApiService,
        RestHandlerService,
        RequestOptionsService,
        FormBuilder,
        FormComponentService,
        BusquedaMovimientoPesajeService,
        MovimientoService,
        CircuitoService,
        RegistrarPesadaService,
        MotivosNoDescargaService,
        BalanzaService,
        AuthService,
        DispositivoService,
        CommandService,
        NavigationService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarPesoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
