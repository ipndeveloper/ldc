import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosMovimientoControlSalidaComponent } from './datos-movimiento-control-salida.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { configureTestSuite } from '../../../core/mocks/testing';
import { PopupModule } from '../../../core/services/popupService/popup.module';
import { ParametrosTerminalService } from '../../shared/services/parametros-terminal.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from '../../../core/services/restClient/api.service';
import { RestHandlerService } from '../../../core/services/restClient/restHandler.service';
import { RequestOptionsService } from '../../../core/services/restClient/requestOptions.service';
import { AuthService } from '../../../core/services/session/auth.service';

describe('DatosMovimientoControlSalidaComponent', () => {
  let component: DatosMovimientoControlSalidaComponent;
  let fixture: ComponentFixture<DatosMovimientoControlSalidaComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [DatosMovimientoControlSalidaComponent],
      imports: [PopupModule, HttpClientTestingModule],
      providers: [
        ParametrosTerminalService,
        ApiService,
        RestHandlerService,
        RequestOptionsService,
        AuthService],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosMovimientoControlSalidaComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
