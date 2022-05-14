import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarCircuitosComponent } from './administrar-circuitos.component';
import { configureTestSuite } from '../../core/mocks/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestModule } from '../../core/mocks/test.module';
import { AdministrarCircuitoService } from './administrar-circuito.service';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { FormBuilder } from '@angular/forms';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { ExcelService } from '../../core/services/excelService/excel.service';

describe('AdministrarCircuitosComponent', () => {
  let component: AdministrarCircuitosComponent;
  let fixture: ComponentFixture<AdministrarCircuitosComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarCircuitosComponent ],
      imports: [TestModule],
      providers: [
        AdministrarCircuitoService,
        SearchFormActionsNotifierService,
        FormBuilder,
        FormComponentService,
        ExcelService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarCircuitosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
