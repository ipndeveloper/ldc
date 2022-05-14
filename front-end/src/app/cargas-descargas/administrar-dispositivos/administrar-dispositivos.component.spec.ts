import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarDispositivosComponent } from './administrar-dispositivos.component';
import { configureTestSuite } from '../../core/mocks/testing';
import { TestModule } from '../../core/mocks/test.module';
import { AdministrarDispositivoService } from './administrar-dispositivo.service';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { FormBuilder } from '@angular/forms';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AdministrarDispositivosComponent', () => {
  let component: AdministrarDispositivosComponent;
  let fixture: ComponentFixture<AdministrarDispositivosComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarDispositivosComponent ],
      imports: [TestModule],
      providers: [
        AdministrarDispositivoService,
        SearchFormActionsNotifierService,
        FormBuilder,
        FormComponentService,
        ExcelService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarDispositivosComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
