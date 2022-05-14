import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMostrarMensajeComponent } from './modal-mostrar-mensaje.component';
import { TestModule } from '../../../../core/mocks/test.module';
import { CoreSharedModule } from '../../../../core/core-shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HotkeyModule } from 'angular2-hotkeys';
import { configureTestSuite } from '../../../../core/mocks/testing';

describe('ModalMostrarMensajeComponent', () => {
  let component: ModalMostrarMensajeComponent;
  let fixture: ComponentFixture<ModalMostrarMensajeComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
          ModalMostrarMensajeComponent
        ],
      imports: [
          TestModule,
          CoreSharedModule,
          ReactiveFormsModule,
          HotkeyModule.forRoot()
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalMostrarMensajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
