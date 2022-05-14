import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdministrarLecturaHumedimetroComponent } from './administrar-lectura-humedimetro.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestModule } from '../../core/mocks/test.module';
import { configureTestSuite } from '../../core/mocks/testing';
import { AdministrarLecturaHumedimetroService } from './administrar-lectura-humedimetro.service';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { FormBuilder } from '@angular/forms';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { RubrosCalidadService } from '../ingresar-calidad-calado/rubros-calidad/rubros-calidad.service';
import { ExcelService } from '../../core/services/excelService/excel.service';

describe('AdministrarLecturaHumedimetroComponent', () => {
  let component: AdministrarLecturaHumedimetroComponent;
  let fixture: ComponentFixture<AdministrarLecturaHumedimetroComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarLecturaHumedimetroComponent ],
      imports: [TestModule],
      providers: [
        AdministrarLecturaHumedimetroService,
        SearchFormActionsNotifierService,
        PopupService,
        FormBuilder,
        FormComponentService,
        RubrosCalidadService,
        ExcelService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarLecturaHumedimetroComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
