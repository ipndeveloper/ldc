import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDocumentoControlarDescargaCerealesComponent } from './datos-documento-controlar-descarga-cereales.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HotkeyModule } from 'angular2-hotkeys';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DescargaEventsNotifierService } from '../../shared/services/descarga-events-notifier.service';
import { ParametrosTerminalService } from '../../shared/services/parametros-terminal.service';
import { DispositivoService } from '../../shared/services/dispositivo.service';
import { configureTestSuite } from '../../../core/mocks/testing';
import { CorredorService } from '../../../shared/buscador-corredor/corredor.service';
import { FinalidadService } from '../../../shared/desplegable-finalidad/finalidad.service';
import { ApiService } from '../../../core/services/restClient/api.service';
import { RestHandlerService } from '../../../core/services/restClient/restHandler.service';
import { RequestOptionsService } from '../../../core/services/restClient/requestOptions.service';
import { AuthService } from '../../../core/services/session/auth.service';
import { PopupModule } from '../../../core/services/popupService/popup.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DatosDocumentoControlarDescargaCerealesComponent', () => {
  let component: DatosDocumentoControlarDescargaCerealesComponent;
  let fixture: ComponentFixture<DatosDocumentoControlarDescargaCerealesComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        DatosDocumentoControlarDescargaCerealesComponent,
      ],
      imports: [
        BrowserModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        HotkeyModule.forRoot(),
        ToastrModule.forRoot(),
        NgbModule,
        PopupModule
      ],
      providers : [
        ApiService,
        RestHandlerService,
        RequestOptionsService,
        AuthService,
        ParametrosTerminalService,
        DispositivoService,
        DescargaEventsNotifierService,
        CorredorService,
        FinalidadService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosDocumentoControlarDescargaCerealesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
