import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdministrarRangosCodigoBarraCamaraComponent } from './administrar-rangos-codigo-barra-camara.component';
import { configureTestSuite } from '../../core/mocks/testing';
import { TestModule } from '../../core/mocks/test.module';
import { AdministrarRangosCodigoBarraCamaraService } from './administrar-rangos-codigo-barra-camara.service';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { FormBuilder } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AdministrarRangosCodigoBarraCamaraComponent', () => {
  let component: AdministrarRangosCodigoBarraCamaraComponent;
  let fixture: ComponentFixture<AdministrarRangosCodigoBarraCamaraComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarRangosCodigoBarraCamaraComponent ],
      imports: [TestModule],
      providers: [
        AdministrarRangosCodigoBarraCamaraService,
        SearchFormActionsNotifierService,
        FormBuilder,
        FormComponentService,
        ExcelService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarRangosCodigoBarraCamaraComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
