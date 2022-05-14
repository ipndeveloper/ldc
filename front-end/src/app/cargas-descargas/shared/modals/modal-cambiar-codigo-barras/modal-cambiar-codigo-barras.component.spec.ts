import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HotkeyModule } from 'angular2-hotkeys';
import { TextMaskModule } from 'angular2-text-mask';

import { ModalCambiarCodigoBarrasComponent } from './modal-cambiar-codigo-barras.component';
import { NumeroConEtiquetaComponent } from '../../../../core/controls/numero-con-etiqueta/numero-con-etiqueta.component';
import { ModalComponent } from '../../../../core/components/modal/modal.component';
import { FocusDirective } from '../../../../core/directives/focus/focus.directive';
import { MaxLengthDirective } from '../../../../core/directives/max-length/max-length.directive';
import { configureTestSuite } from '../../../../core/mocks/testing';

describe('ModalCambiarCodigoBarrasComponent', () => {
  let component: ModalCambiarCodigoBarrasComponent;
  let fixture: ComponentFixture<ModalCambiarCodigoBarrasComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        ModalCambiarCodigoBarrasComponent,
        NumeroConEtiquetaComponent,
        ModalComponent,
        FocusDirective,
        MaxLengthDirective
       ],
      imports: [
        ReactiveFormsModule,
        HotkeyModule.forRoot(),
        TextMaskModule
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCambiarCodigoBarrasComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
