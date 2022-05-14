import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { AccionComponent } from './ingresar-calidad-accion.component';
import { TestModule } from '../../../core/mocks/test.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { configureTestSuite } from '../../../core/mocks/testing';

describe('AccionComponent', () => {
  let component: AccionComponent;
  let fixture: ComponentFixture<AccionComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ AccionComponent ],
      imports: [
        BrowserModule,
        ReactiveFormsModule,
        TestModule
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
