import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdministrarTarjetaAutorizacionComponent } from './administrar-tarjeta-autorizacion.component';
import { configureTestSuite } from '../../core/mocks/testing';
import { TestModule } from '../../core/mocks/test.module';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { ConfirmationService } from '@jaspero/ng-confirmations';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AdministrarTarjetaAutorizacionComponent', () => {
  let component: AdministrarTarjetaAutorizacionComponent;
  let fixture: ComponentFixture<AdministrarTarjetaAutorizacionComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        AdministrarTarjetaAutorizacionComponent
      ],
      imports: [TestModule],
      providers: [
        FormComponentService,
        SearchFormActionsNotifierService,
        ExcelService,
        ConfirmationService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarTarjetaAutorizacionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
