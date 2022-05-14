import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarProductosHabilitadosPorTerminalComponent } from './administrar-productos-habilitados-por-terminal.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ApiService } from '../../core/services/restClient/api.service';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { FiltroAdministrarProductosHabilitadosPorTerminalComponent } from './filtro-administrar-productos-habilitados-por-terminal/filtro-administrar-productos-habilitados-por-terminal.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RestHandlerService } from '../../core/services/restClient/restHandler.service';
import { PopupModule } from '../../core/services/popupService/popup.module';
import { RequestOptionsService } from '../../core/services/restClient/requestOptions.service';
import { AuthService } from '../../core/services/session/auth.service';
import { FormBuilder } from '@angular/forms';

describe('AdministrarProductosHabilitadosPorTerminalComponent', () => {
  let component: AdministrarProductosHabilitadosPorTerminalComponent;
  let fixture: ComponentFixture<AdministrarProductosHabilitadosPorTerminalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarProductosHabilitadosPorTerminalComponent ],
      imports: [HttpClientTestingModule,
                PopupModule],
      providers: [ApiService,
                  SearchFormActionsNotifierService,
                  FiltroAdministrarProductosHabilitadosPorTerminalComponent,
                  FormComponentService,
                  ExcelService,
                  RestHandlerService,
                  RequestOptionsService,
                  AuthService,
                  FormBuilder],
      schemas: [NO_ERRORS_SCHEMA],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarProductosHabilitadosPorTerminalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.filtro = TestBed.get(FiltroAdministrarProductosHabilitadosPorTerminalComponent);
    component.filtro.setFocus = jasmine.createSpy('setFocus');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
