import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { EstablecimientoComponent } from './establecimiento.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HotkeyModule } from 'angular2-hotkeys';
import { TestModule } from '../../core/mocks/test.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaxLengthDirective } from '../../core/directives/max-length/max-length.directive';
import { configureTestSuite } from '../../core/mocks/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('EstablecimientoComponent', () => {
  let component: EstablecimientoComponent;
  let fixture: ComponentFixture<EstablecimientoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        EstablecimientoComponent,
        MaxLengthDirective
      ],
      imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        HotkeyModule.forRoot(),
        TestModule,
        NgbModule
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstablecimientoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
