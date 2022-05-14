import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleBalanzaComponent } from './detalle-balanza.component';
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
import { BalanzaDashboard } from '../../../shared/data-models/balanza-dashboard';

describe('DetalleBalanzaComponent', () => {
  let component: DetalleBalanzaComponent;
  let fixture: ComponentFixture<DetalleBalanzaComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        DetalleBalanzaComponent
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
      declarations: [ DetalleBalanzaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleBalanzaComponent);
    component = fixture.componentInstance;
    component.balanza = new BalanzaDashboard();
    component.balanza.activa = true;
    component.balanza.id = 1;
    component.balanza.nombre = 'Balanza 1';
    component.balanza.seleccionadaDefault = false;
    component.balanza.sentidoBalanza = 'Entrada';
    component.balanza.terminal = 'Bahia Blanca';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
