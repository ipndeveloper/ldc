import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosMovimientoComponent } from './datos-movimiento.component';
import { TestModule } from '../../../core/mocks/test.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { configureTestSuite } from '../../../core/mocks/testing';

describe('DatosMovimientoComponent', () => {
  let component: DatosMovimientoComponent;
  let fixture: ComponentFixture<DatosMovimientoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        DatosMovimientoComponent,
      ],
      imports: [
        BrowserModule,
        ReactiveFormsModule,
        TestModule
      ],
      providers: [
        FormComponentService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosMovimientoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
