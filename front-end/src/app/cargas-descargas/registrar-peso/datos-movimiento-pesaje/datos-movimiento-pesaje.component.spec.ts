import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosMovimientoPesajeComponent } from './datos-movimiento-pesaje.component';
import { BrowserModule } from '@angular/platform-browser';
import { TestModule } from '../../../core/mocks/test.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HotkeyModule } from 'angular2-hotkeys';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { configureTestSuite } from '../../../core/mocks/testing';

describe('DatosMovimientoPesajeComponent', () => {
  let component: DatosMovimientoPesajeComponent;
  let fixture: ComponentFixture<DatosMovimientoPesajeComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosMovimientoPesajeComponent ],
      imports: [
        BrowserModule,
        TestModule,
        ReactiveFormsModule,
        HotkeyModule.forRoot(),
        ToastrModule.forRoot(),
        NgbModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosMovimientoPesajeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
