import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HotkeyModule } from 'angular2-hotkeys';
import { TextMaskModule } from 'angular2-text-mask';

import { ModalAutorizarMuestraAgilComponent } from './modal-autorizar-muestra-agil.component';
import { NumeroConEtiquetaComponent } from '../../../../core/controls/numero-con-etiqueta/numero-con-etiqueta.component';
import { MaxLengthDirective } from '../../../../core/directives/max-length/max-length.directive';
import { FocusDirective } from '../../../../core/directives/focus/focus.directive';
import { ModalComponent } from '../../../../core/components/modal/modal.component';
import { configureTestSuite } from '../../../../core/mocks/testing';

describe('ModalAutorizarMuestraAgilComponent', () => {
  let component: ModalAutorizarMuestraAgilComponent;
  let fixture: ComponentFixture<ModalAutorizarMuestraAgilComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        ModalAutorizarMuestraAgilComponent,
        NumeroConEtiquetaComponent,
        MaxLengthDirective,
        FocusDirective,
        ModalComponent
      ],
      imports: [
        ReactiveFormsModule,
        HotkeyModule.forRoot(),
        TextMaskModule
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAutorizarMuestraAgilComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
