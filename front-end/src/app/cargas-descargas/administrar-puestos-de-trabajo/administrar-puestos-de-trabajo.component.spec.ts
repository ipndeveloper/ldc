import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarPuestosDeTrabajoComponent } from './administrar-puestos-de-trabajo.component';
import { configureTestSuite } from '../../core/mocks/testing';
import { TestModule } from '../../core/mocks/test.module';
import { AdministrarPuestoDeTrabajoService } from './administrar-puesto-de-trabajo.service';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { FormBuilder } from '@angular/forms';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AdministrarPuestosDeTrabajoComponent', () => {
  let component: AdministrarPuestosDeTrabajoComponent;
  let fixture: ComponentFixture<AdministrarPuestosDeTrabajoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarPuestosDeTrabajoComponent ],
      imports: [TestModule],
      providers: [
        AdministrarPuestoDeTrabajoService,
        SearchFormActionsNotifierService,
        FormBuilder,
        FormComponentService,
        ExcelService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarPuestosDeTrabajoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
