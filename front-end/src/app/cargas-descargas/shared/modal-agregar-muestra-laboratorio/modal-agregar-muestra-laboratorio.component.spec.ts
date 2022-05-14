import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgregarMuestraLaboratorioComponent } from './modal-agregar-muestra-laboratorio.component';
import { TestModule } from '../../../core/mocks/test.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from '../../../core/components/modal/modal.component';
import { TextoConEtiquetaComponent } from '../../../core/controls/texto-con-etiqueta/texto-con-etiqueta.component';
import { TextAreaConEtiquetaComponent } from '../../../core/controls/text-area-con-etiqueta/text-area-con-etiqueta.component';
import { FocusDirective } from '../../../core/directives/focus/focus.directive';
import { MaxLengthDirective } from '../../../core/directives/max-length/max-length.directive';
import { HotkeyModule } from 'angular2-hotkeys';
import { configureTestSuite } from '../../../core/mocks/testing';

describe('ModalAgregarMuestraLaboratorioComponent', () => {
  let component: ModalAgregarMuestraLaboratorioComponent;
  let fixture: ComponentFixture<ModalAgregarMuestraLaboratorioComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        ModalAgregarMuestraLaboratorioComponent,
        ModalComponent,
        TextoConEtiquetaComponent,
        TextAreaConEtiquetaComponent,
        FocusDirective,
        MaxLengthDirective
       ],
      imports: [
        TestModule,
        ReactiveFormsModule,
        HotkeyModule.forRoot()
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAgregarMuestraLaboratorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
