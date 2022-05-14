import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { TextAreaConEtiquetaComponent } from './text-area-con-etiqueta.component';
import { FocusDirective } from '../../directives/focus/focus.directive';
import { configureTestSuite } from '../../mocks/testing';

describe('TextAreaConEtiquetaComponent', () => {
  let component: TextAreaConEtiquetaComponent;
  let fixture: ComponentFixture<TextAreaConEtiquetaComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        TextAreaConEtiquetaComponent,
        FocusDirective
       ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextAreaConEtiquetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
