import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgregarTrabajoGeneracionArchivosMuestraComponent } from './modal-agregar-trabajo-generacion-archivos-muestra.component';
import { ModalComponent } from '../../../../core/components/modal/modal.component';
import { TestModule } from '../../../../core/mocks/test.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FechaConEtiquetaComponent } from '../../../../core/controls/fecha-con-etiqueta/fecha-con-etiqueta.component';
import { HotkeyModule } from 'angular2-hotkeys';
import { FocusDirective } from '../../../../core/directives/focus/focus.directive';
import { configureTestSuite } from '../../../../core/mocks/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ModalGenerarArchivosMuestraComponent', () => {
  let component: ModalAgregarTrabajoGeneracionArchivosMuestraComponent;
  let fixture: ComponentFixture<ModalAgregarTrabajoGeneracionArchivosMuestraComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        ModalAgregarTrabajoGeneracionArchivosMuestraComponent,
        ModalComponent,
        FechaConEtiquetaComponent,
        FocusDirective
      ],
      imports: [
        TestModule,
        ReactiveFormsModule,
        HotkeyModule.forRoot()
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAgregarTrabajoGeneracionArchivosMuestraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
