import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAutorizacionComponent } from './modal-autorizacion.component';

import { HotkeyModule } from 'angular2-hotkeys';
import { ModalComponent } from '../../../../core/components/modal/modal.component';
import { PasswordConEtiquetaComponent } from '../../../../core/controls/password-con-etiqueta/password-con-etiqueta.component';
import { TextoConEtiquetaComponent } from '../../../../core/controls/texto-con-etiqueta/texto-con-etiqueta.component';
import { TextAreaConEtiquetaComponent } from '../../../../core/controls/text-area-con-etiqueta/text-area-con-etiqueta.component';
import { FocusDirective } from '../../../../core/directives/focus/focus.directive';
import { TestModule } from '../../../../core/mocks/test.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AutorizarcionService } from './autorizacion.service';
import { configureTestSuite } from '../../../../core/mocks/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LecturaTarjetaService } from '../../services/lectura-tarjeta.service';

describe('ModalAutorizacionComponent', () => {
  let component: ModalAutorizacionComponent;
  let fixture: ComponentFixture<ModalAutorizacionComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        ModalAutorizacionComponent,
        ModalComponent,
        PasswordConEtiquetaComponent,
        TextoConEtiquetaComponent,
        TextAreaConEtiquetaComponent,
        FocusDirective
      ],
      imports: [
        TestModule,
        ReactiveFormsModule,
        HotkeyModule.forRoot()
      ],
      providers: [
        AutorizarcionService,
        LecturaTarjetaService
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAutorizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
