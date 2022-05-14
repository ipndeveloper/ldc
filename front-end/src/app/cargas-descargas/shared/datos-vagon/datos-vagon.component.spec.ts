import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosVagonComponent } from './datos-vagon.component';
import { TestModule } from '../../../core/mocks/test.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { configureTestSuite } from '../../../core/mocks/testing';

describe('DatosVagonComponent', () => {
  let component: DatosVagonComponent;
  let fixture: ComponentFixture<DatosVagonComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        DatosVagonComponent,
      ],
      imports: [
        ReactiveFormsModule,
        TestModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosVagonComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
