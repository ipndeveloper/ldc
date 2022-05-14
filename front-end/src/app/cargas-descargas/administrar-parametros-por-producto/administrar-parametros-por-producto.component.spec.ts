import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdministrarParametrosPorProductoComponent } from './administrar-parametros-por-producto.component';
import { configureTestSuite } from '../../core/mocks/testing';
import { TestModule } from '../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AdministrarParametrosPorProductoService } from './administrar-parametros-por-producto.service';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { FormBuilder } from '@angular/forms';

describe('AdministrarParametrosPorProductoComponent', () => {
  let component: AdministrarParametrosPorProductoComponent;
  let fixture: ComponentFixture<AdministrarParametrosPorProductoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarParametrosPorProductoComponent ],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
          AdministrarParametrosPorProductoService,
          SearchFormActionsNotifierService,
          FormComponentService,
          FormBuilder,
          ExcelService
        ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarParametrosPorProductoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
