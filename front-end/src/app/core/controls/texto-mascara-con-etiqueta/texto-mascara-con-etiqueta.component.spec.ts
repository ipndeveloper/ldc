import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextoMascaraConEtiquetaComponent } from './texto-mascara-con-etiqueta.component';
import { FocusDirective } from '../../directives/focus/focus.directive';
import { MaskedInputDirective } from 'angular2-text-mask';

describe('TextoMascaraConEtiquetaComponent', () => {
  let component: TextoMascaraConEtiquetaComponent;
  let fixture: ComponentFixture<TextoMascaraConEtiquetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TextoMascaraConEtiquetaComponent,
        FocusDirective,
        MaskedInputDirective ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextoMascaraConEtiquetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
