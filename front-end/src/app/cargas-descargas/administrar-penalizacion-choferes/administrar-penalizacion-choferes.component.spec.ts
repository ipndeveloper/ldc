import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AdministrarPenalizacionChoferesComponent } from './administrar-penalizacion-choferes.component';
import { TestModule } from '../../core/mocks/test.module';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { FormBuilder } from '@angular/forms';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AdministrarPenalizacionChoferesService } from './administrar-penalizacion-choferes.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { ExcelService } from '../../core/services/excelService/excel.service';


describe('AdministrarPenalizacionChoferesComponent', () => {
  let component: AdministrarPenalizacionChoferesComponent;
  let fixture: ComponentFixture<AdministrarPenalizacionChoferesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarPenalizacionChoferesComponent ],
      imports: [TestModule],
      providers: [
        AdministrarPenalizacionChoferesService,
        SearchFormActionsNotifierService,
        PopupService,
        FormBuilder,
        FormComponentService,
        ExcelService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarPenalizacionChoferesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
