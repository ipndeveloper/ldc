import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarDestinosPostCaladoComponent } from './administrar-destinos-post-calado.component';
import { configureTestSuite } from '../../core/mocks/testing';
import { TestModule } from '../../core/mocks/test.module';
import { AdministrarDestinosPostCaladoService } from './administrar-destinos-post-calado.service';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { FormBuilder } from '@angular/forms';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AdministrarDestinosPostCaladoComponent', () => {
  let component: AdministrarDestinosPostCaladoComponent;
  let fixture: ComponentFixture<AdministrarDestinosPostCaladoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarDestinosPostCaladoComponent ],
      imports: [TestModule],
      providers: [
        AdministrarDestinosPostCaladoService,
        SearchFormActionsNotifierService,
        FormBuilder,
        FormComponentService,
        ExcelService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarDestinosPostCaladoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
