import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { RubrosCalidadComponent } from './rubros-calidad.component';
import { TestModule } from '../../../core/mocks/test.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { IngresarCalidadCaladoService } from '../ingresar-calidad-calado.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HotkeyModule } from 'angular2-hotkeys';
import { DecimalSeparatorPipe } from '../../../core/pipes/decimal-separator.pipe';
import { PositiveDecimalSeparatorPipe } from '../../../core/pipes/positive-decimal-separator.pipe';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { configureTestSuite } from '../../../core/mocks/testing';

describe('RubrosCalidadComponent', () => {
  let component: RubrosCalidadComponent;
  let fixture: ComponentFixture<RubrosCalidadComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        RubrosCalidadComponent,
      ],
      imports: [
        BrowserModule,
        ReactiveFormsModule,
        TestModule,
        NgxDatatableModule,
        HotkeyModule.forRoot(),
      ],
      providers: [
        FormComponentService,
        IngresarCalidadCaladoService,
        DecimalSeparatorPipe,
        PositiveDecimalSeparatorPipe
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RubrosCalidadComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
