import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacionArriboCtgComponent } from './confirmacion-arribo-ctg.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HotkeyModule } from 'angular2-hotkeys';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { TestModule } from '../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { configureTestSuite } from '../../../core/mocks/testing';

describe('ConfirmacionArriboCtgComponent', () => {
  let component: ConfirmacionArriboCtgComponent;
  let fixture: ComponentFixture<ConfirmacionArriboCtgComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        ConfirmacionArriboCtgComponent,
      ],
      imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        HotkeyModule.forRoot(),
        NgbModule,
        TestModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmacionArriboCtgComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
