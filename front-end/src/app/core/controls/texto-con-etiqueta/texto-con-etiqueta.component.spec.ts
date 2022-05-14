import {  ComponentFixture, TestBed } from '@angular/core/testing';
import { TextoConEtiquetaComponent } from './texto-con-etiqueta.component';
import { FocusDirective } from '../../directives/focus/focus.directive';
import { configureTestSuite } from '../../mocks/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('TextoConEtiquetaComponent', () => {
  let component: TextoConEtiquetaComponent;
  let fixture: ComponentFixture<TextoConEtiquetaComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        TextoConEtiquetaComponent,
        FocusDirective
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextoConEtiquetaComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
