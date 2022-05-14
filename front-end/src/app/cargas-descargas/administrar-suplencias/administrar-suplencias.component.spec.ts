import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarSuplenciasComponent } from './administrar-suplencias.component';
import { configureTestSuite } from '../../core/mocks/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestModule } from '../../core/mocks/test.module';
import { AdministrarSuplenciasService } from './administrar-suplencias.service';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { ExcelService } from '../../core/services/excelService/excel.service';

describe('AdministrarSuplenciasComponent', () => {
  let component: AdministrarSuplenciasComponent;
  let fixture: ComponentFixture<AdministrarSuplenciasComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarSuplenciasComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [TestModule],
      providers: [
        AdministrarSuplenciasService,
        SearchFormActionsNotifierService,
        FormComponentService,
        ExcelService
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarSuplenciasComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
