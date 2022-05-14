import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosLaboratorioComponent } from './datos-laboratorio.component';
import { TestModule } from '../../../core/mocks/test.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HotkeyModule } from 'angular2-hotkeys';
import { DecisionLaboratorioService } from '../../gestionar-calidad-por-laboratorio/service/decision-laboratorio.service';
import { DropdownNotificationService } from '../../../core/shared/super/dropdown-notification.service';
import { configureTestSuite } from '../../../core/mocks/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DatosLaboratorioComponent', () => {
  let component: DatosLaboratorioComponent;
  let fixture: ComponentFixture<DatosLaboratorioComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        DatosLaboratorioComponent,
       ],
       imports: [
         TestModule,
         ReactiveFormsModule,
         NgxDatatableModule,
         HotkeyModule.forRoot()
       ],
       providers: [
        DecisionLaboratorioService,
        DropdownNotificationService
       ],
       schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosLaboratorioComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
