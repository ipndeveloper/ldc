import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdministrarParametrosPorTipoAnalisisCamaraComponent } from './administrar-parametros-por-tipo-analisis-camara.component';
import { configureTestSuite } from '../../core/mocks/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { FormBuilder } from '@angular/forms';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { AdministrarParametrosPorTipoAnalisisCamaraService } from './administrar-parametros-por-tipo-analisis-camara.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PopupModule } from '../../core/services/popupService/popup.module';
import { ApiService } from '../../core/services/restClient/api.service';
import { RestHandlerService } from '../../core/services/restClient/restHandler.service';
import { RequestOptionsService } from '../../core/services/restClient/requestOptions.service';
import { AuthService } from '../../core/services/session/auth.service';

describe('AdministrarParametrosPorTipoAnalisisCamaraComponent', () => {
  let component: AdministrarParametrosPorTipoAnalisisCamaraComponent;
  let fixture: ComponentFixture<AdministrarParametrosPorTipoAnalisisCamaraComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [AdministrarParametrosPorTipoAnalisisCamaraComponent],
      imports: [
        HttpClientTestingModule,
        PopupModule
      ],
      providers: [
        ApiService,
        RestHandlerService,
        RequestOptionsService,
        AuthService,
        AdministrarParametrosPorTipoAnalisisCamaraService,
        SearchFormActionsNotifierService,
        FormComponentService,
        FormBuilder,
        ExcelService
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarParametrosPorTipoAnalisisCamaraComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
