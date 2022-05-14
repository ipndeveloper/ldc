import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HotkeyModule } from 'angular2-hotkeys';
import { TestModule } from '../../../core/mocks/test.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from '../../../core/components/modal/modal.module';
import { DatosEdicionGestionarManipuleoComponent } from './datos-edicion-gestionar-manipuleo.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { configureTestSuite } from '../../../core/mocks/testing';

describe('DatosEdicionGestionarManipuleoComponent', () => {
  let component: DatosEdicionGestionarManipuleoComponent;
  let fixture: ComponentFixture<DatosEdicionGestionarManipuleoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        DatosEdicionGestionarManipuleoComponent,
      ],
      imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        HotkeyModule.forRoot(),
        TestModule,
        NgbModule,
        ModalModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosEdicionGestionarManipuleoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create and read validationMessagesHumedadMaxima', () => {
    expect(component.validationMessagesHumedadMaxima).toBeDefined();
  });

  it('should create and read validationMessagesProteinaMinimo', () => {
    expect(component.validationMessagesProteinaMinimo).toBeDefined();
  });

  it('should create and read validationMessagesProteinaMaximo', () => {
    expect(component.validationMessagesProteinaMaximo).toBeDefined();
  });

  it('should create and read validationMessagesHumedadMinimo', () => {
    expect(component.validationMessagesHumedadMinimo).toBeDefined();
  });
});
