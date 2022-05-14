import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordConEtiquetaComponent } from './password-con-etiqueta.component';
import { FocusDirective } from '../../directives/focus/focus.directive';
import { configureTestSuite } from '../../mocks/testing';

describe('PasswordConEtiquetaComponent', () => {
  let component: PasswordConEtiquetaComponent;
  let fixture: ComponentFixture<PasswordConEtiquetaComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordConEtiquetaComponent, FocusDirective ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordConEtiquetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
