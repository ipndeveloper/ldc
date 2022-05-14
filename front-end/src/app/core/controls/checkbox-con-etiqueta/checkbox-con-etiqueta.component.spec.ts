import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxConEtiquetaComponent } from './checkbox-con-etiqueta.component';
import { configureTestSuite } from '../../mocks/testing';
import { FocusDirective } from '../../directives/focus/focus.directive';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestModule } from '../../mocks/test.module';
import { ReactiveFormsModule } from '@angular/forms';

describe('CheckboxConEtiquetaComponent', () => {
  let component: CheckboxConEtiquetaComponent;
  let fixture: ComponentFixture<CheckboxConEtiquetaComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckboxConEtiquetaComponent, FocusDirective ],
      imports: [TestModule, ReactiveFormsModule],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxConEtiquetaComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
