import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSeleccionarBalanzasComponent } from './modal-seleccionar-balanzas.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ConfirmationService } from '@jaspero/ng-confirmations';
import { SearchFormActionsNotifierService } from '../../../core/components/search-form/services/search-form-actions-notifier.service';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { ExcelService } from '../../../core/services/excelService/excel.service';
import { TestModule } from '../../../core/mocks/test.module';
import { configureTestSuite } from '../../../core/mocks/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NavigationService } from '../../../core/services/navigationService/navigation.service';

describe('ModalSeleccionarBalanzasComponent', () => {
  let component: ModalSeleccionarBalanzasComponent;
  let fixture: ComponentFixture<ModalSeleccionarBalanzasComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        ModalSeleccionarBalanzasComponent
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


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSeleccionarBalanzasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSeleccionarBalanzasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
