import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { FechaPeriodoStockSanComponent } from './fecha-periodo-stock-san.component';
import { FechaConEtiquetaComponent } from '../../../core/controls/fecha-con-etiqueta/fecha-con-etiqueta.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TestModule } from '../../../core/mocks/test.module';
import { HotkeyModule } from 'angular2-hotkeys';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FocusDirective } from '../../../core/directives/focus/focus.directive';
import { configureTestSuite } from '../../../core/mocks/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FechaPeriodoStockSanComponent', () => {
  let component: FechaPeriodoStockSanComponent;
  let fixture: ComponentFixture<FechaPeriodoStockSanComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        FechaPeriodoStockSanComponent,
        FechaConEtiquetaComponent,
        FocusDirective
      ],
      imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        HotkeyModule.forRoot(),
        TestModule,
        NgbModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FechaPeriodoStockSanComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
