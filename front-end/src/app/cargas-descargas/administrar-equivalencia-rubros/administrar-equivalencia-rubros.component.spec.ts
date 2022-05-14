import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdministrarEquivalenciaRubrosComponent } from './administrar-equivalencia-rubros.component';
import { configureTestSuite } from '../../core/mocks/testing';
import { TestModule } from '../../core/mocks/test.module';
import { AdministrarEquivalenciaRubrosService } from './administrar-equivalencia-rubros.service';
import { FormBuilder } from '@angular/forms';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';

describe('AdministrarEquivalenciaRubrosComponent', () => {
  let component: AdministrarEquivalenciaRubrosComponent;
  let fixture: ComponentFixture<AdministrarEquivalenciaRubrosComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarEquivalenciaRubrosComponent ],
      imports: [TestModule],
      providers: [
        AdministrarEquivalenciaRubrosService,
        SearchFormActionsNotifierService,
        FormBuilder,
        FormComponentService,
        ExcelService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarEquivalenciaRubrosComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
