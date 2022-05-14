import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HotkeyModule } from 'angular2-hotkeys';
import { TestModule } from '../../../core/mocks/test.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from '../../../core/components/modal/modal.module';
import { FiltroBusquedaGestionarCalidadCaladoComponent } from './filtro-busqueda-gestionar-calidad-calado.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { configureTestSuite } from '../../../core/mocks/testing';

describe('FiltroBusquedaGestionarCalidadCaladoComponent', () => {
  let component: FiltroBusquedaGestionarCalidadCaladoComponent;
  let fixture: ComponentFixture<FiltroBusquedaGestionarCalidadCaladoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        FiltroBusquedaGestionarCalidadCaladoComponent,
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
    fixture = TestBed.createComponent(FiltroBusquedaGestionarCalidadCaladoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create and read validationMessagesTarjeta', () => {
    expect(component.validationMessagesTarjeta).toBeDefined();
  });

  it('should create and read validationMessagesPatente', () => {
    expect(component.validationMessagesPatente).toBeDefined();
  });
});
