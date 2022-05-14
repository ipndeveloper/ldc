import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleAdministrarProductosHabilitadosPorTerminalComponent } from './detalle-administrar-productos-habilitados-por-terminal.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SiloService } from '../../../shared/desplegable-silo/desplegable-silo.service';
import { GradoService } from '../../../shared/desplegable-grado/desplegable-grado.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PopupModule } from '../../../core/services/popupService/popup.module';
import { ApiService } from '../../../core/services/restClient/api.service';
import { RestHandlerService } from '../../../core/services/restClient/restHandler.service';
import { RequestOptionsService } from '../../../core/services/restClient/requestOptions.service';
import { AuthService } from '../../../core/services/session/auth.service';
import { FormBuilder } from '@angular/forms';

describe('DetalleAdministrarProductosHabilitadosPorTerminalComponent', () => {
  let component: DetalleAdministrarProductosHabilitadosPorTerminalComponent;
  let fixture: ComponentFixture<DetalleAdministrarProductosHabilitadosPorTerminalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleAdministrarProductosHabilitadosPorTerminalComponent ],
      imports: [ HttpClientTestingModule,
                  PopupModule],
      providers: [SiloService,
                  GradoService,
                  ApiService,
                  RestHandlerService,
                  RequestOptionsService,
                  AuthService,
                  FormBuilder],
      schemas: [NO_ERRORS_SCHEMA]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleAdministrarProductosHabilitadosPorTerminalComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
