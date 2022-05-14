import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdministrarActividadesCircuitoComponent } from './administrar-actividades-circuito.component';
import { configureTestSuite } from '../../core/mocks/testing';
import { AdministrarActividadesCircuitoService } from './administrar-actividades-circuito.service';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { FormBuilder } from '@angular/forms';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ApiService } from '../../core/services/restClient/api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RestHandlerService } from '../../core/services/restClient/restHandler.service';
import { RequestOptionsService } from '../../core/services/restClient/requestOptions.service';
import { AuthService } from '../../core/services/session/auth.service';
import { PopupModule } from '../../core/services/popupService/popup.module';

describe('AdministrarActividadesCircuitoComponent', () => {
  let component: AdministrarActividadesCircuitoComponent;
  let fixture: ComponentFixture<AdministrarActividadesCircuitoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [AdministrarActividadesCircuitoComponent],
      imports: [
        HttpClientTestingModule,
        PopupModule
      ],
      providers: [
        ApiService,
        RestHandlerService,
        RequestOptionsService,
        AuthService,
        AdministrarActividadesCircuitoService,
        SearchFormActionsNotifierService,
        FormComponentService,
        FormBuilder,
        ExcelService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarActividadesCircuitoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
