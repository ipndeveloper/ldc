import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarParametrosPorRubroCalidadComponent } from './administrar-parametros-por-rubro-calidad.component';
import { configureTestSuite } from '../../core/mocks/testing';
import { TestModule } from '../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AdministrarParametrosPorRubroCalidadService } from './administrar-parametros-por-rubro-calidad.service';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { FormBuilder } from '@angular/forms';
import { ExcelService } from '../../core/services/excelService/excel.service';

describe('AdministrarParametrosPorRubroCalidadComponent', () => {
  let component: AdministrarParametrosPorRubroCalidadComponent;
  let fixture: ComponentFixture<AdministrarParametrosPorRubroCalidadComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarParametrosPorRubroCalidadComponent ],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        AdministrarParametrosPorRubroCalidadService,
        SearchFormActionsNotifierService,
        FormBuilder,
        FormComponentService,
        ExcelService
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarParametrosPorRubroCalidadComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
