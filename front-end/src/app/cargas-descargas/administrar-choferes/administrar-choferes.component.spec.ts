import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarChoferesComponent } from './administrar-choferes.component';
import { configureTestSuite } from '../../core/mocks/testing';
import { TestModule } from '../../core/mocks/test.module';
import { AdministrarChoferService } from './administrar-chofer.service';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { FormBuilder } from '@angular/forms';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AdministrarChoferesComponent', () => {
  let component: AdministrarChoferesComponent;
  let fixture: ComponentFixture<AdministrarChoferesComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarChoferesComponent ],
      imports: [TestModule],
      providers: [
        AdministrarChoferService,
        SearchFormActionsNotifierService,
        FormBuilder,
        FormComponentService,
        ExcelService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarChoferesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
