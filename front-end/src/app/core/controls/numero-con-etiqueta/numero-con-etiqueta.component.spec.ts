import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { NumeroConEtiquetaComponent } from './numero-con-etiqueta.component';
import { FocusDirective } from '../../directives/focus/focus.directive';
import { TextMaskModule } from 'angular2-text-mask';
import { configureTestSuite } from '../../mocks/testing';

describe('NumeroConEtiquetaComponent', () => {
  let component: NumeroConEtiquetaComponent;
  let fixture: ComponentFixture<NumeroConEtiquetaComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        NumeroConEtiquetaComponent,
        FocusDirective,
      ],
      imports: [TextMaskModule]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumeroConEtiquetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
