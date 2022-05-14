import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { configureTestSuite } from '../../core/mocks/testing';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { PopupModule } from '../../core/services/popupService/popup.module';
import { ApiService } from '../../core/services/restClient/api.service';
import { RequestOptionsService } from '../../core/services/restClient/requestOptions.service';
import { RestHandlerService } from '../../core/services/restClient/restHandler.service';
import { AuthService } from '../../core/services/session/auth.service';
import { AdministrarEventoService } from './administrar-evento.service';

import { AdministrarEventosComponent } from './administrar-eventos.component';

describe('AdministrarEventosComponent', () => {
  let component: AdministrarEventosComponent;
  let fixture: ComponentFixture<AdministrarEventosComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [AdministrarEventosComponent],
      imports: [
        HttpClientTestingModule,
        PopupModule
      ],
      providers: [
        AdministrarEventoService,
        SearchFormActionsNotifierService,
        FormComponentService,
        FormBuilder,
        ExcelService,
        ApiService,
        RestHandlerService,
        RequestOptionsService,
        AuthService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarEventosComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
