import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarTarjetaComponent } from './administrar-tarjeta.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ConfirmationService } from '@jaspero/ng-confirmations';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { TestModule } from '../../core/mocks/test.module';
import { configureTestSuite } from '../../core/mocks/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NavigationService } from '../../core/services/navigationService/navigation.service';


describe('AdministrarTarjetaComponent', () => {
  let component: AdministrarTarjetaComponent;
  let fixture: ComponentFixture<AdministrarTarjetaComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        AdministrarTarjetaComponent
      ],
      imports: [
        TestModule,
        RouterModule,
        RouterTestingModule,
      ],
      providers: [
        FormComponentService,
        SearchFormActionsNotifierService,
        ExcelService,
        ConfirmationService,
        NavigationService
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarTarjetaComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
