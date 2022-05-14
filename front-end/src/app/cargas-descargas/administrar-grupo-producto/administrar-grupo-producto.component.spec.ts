import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarGrupoProductoComponent } from './administrar-grupo-producto.component';
import { configureTestSuite } from '../../core/mocks/testing';
import { TestModule } from '../../core/mocks/test.module';
import { AdministrarGrupoProductoService } from './administrar-grupo-producto.service';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { FormBuilder } from '@angular/forms';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AdministrarGrupoProductoComponent', () => {
  let component: AdministrarGrupoProductoComponent;
  let fixture: ComponentFixture<AdministrarGrupoProductoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarGrupoProductoComponent ],
      imports: [TestModule],
      providers: [
        AdministrarGrupoProductoService,
        SearchFormActionsNotifierService,
        PopupService,
        FormBuilder,
        FormComponentService,
        ExcelService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarGrupoProductoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
