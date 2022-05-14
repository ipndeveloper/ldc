import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { FechaConEtiquetaComponent } from './fecha-con-etiqueta.component';
import { FocusDirective } from '../../directives/focus/focus.directive';
import { TestModule } from '../../mocks/test.module';
import { configureTestSuite } from '../../mocks/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FechaConEtiquetaComponent', () => {
  let component: FechaConEtiquetaComponent;
  let fixture: ComponentFixture<FechaConEtiquetaComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        FechaConEtiquetaComponent,
        FocusDirective
       ],
       imports: [
        TestModule
       ],
       schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FechaConEtiquetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
