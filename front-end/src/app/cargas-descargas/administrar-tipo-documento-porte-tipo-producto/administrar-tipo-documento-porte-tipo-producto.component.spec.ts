import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdministrarTipoDocumentoPorteTipoProductoComponent } from './administrar-tipo-documento-porte-tipo-producto.component';
import { configureTestSuite } from '../../core/mocks/testing';
import { TestModule } from '../../core/mocks/test.module';
import { AdministrarTipoDocumentoPorteTipoProductoService } from './administrar-tipo-documento-porte-tipo-producto.service';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { FormBuilder } from '@angular/forms';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AdministrarTipoDocumentoPorteTipoProductoComponent', () => {
  let component: AdministrarTipoDocumentoPorteTipoProductoComponent;
  let fixture: ComponentFixture<AdministrarTipoDocumentoPorteTipoProductoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarTipoDocumentoPorteTipoProductoComponent ],
      imports: [TestModule],
      providers: [
        AdministrarTipoDocumentoPorteTipoProductoService,
        SearchFormActionsNotifierService,
        FormBuilder,
        FormComponentService,
        ExcelService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarTipoDocumentoPorteTipoProductoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
