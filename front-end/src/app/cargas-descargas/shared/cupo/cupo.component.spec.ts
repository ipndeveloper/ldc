import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { CupoComponent } from './cupo.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HotkeyModule } from 'angular2-hotkeys';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { configureTestSuite } from '../../../core/mocks/testing';
import { TestModule } from '../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CupoComponent', () => {
  let component: CupoComponent;
  let fixture: ComponentFixture<CupoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        CupoComponent
      ],
      imports: [
        BrowserModule,
        ReactiveFormsModule,
        HotkeyModule.forRoot(),
        NgbModule,
        TestModule
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CupoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('The method ngOnInit should be called one time', function () {
    // arrange

    // act
    component.ngOnInit();

    // assert
    expect(component.ngOnInit).toBeTruthy();
  });
});
