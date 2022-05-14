import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HotkeyModule } from 'angular2-hotkeys';
import { TestModule } from '../../../core/mocks/test.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from '../../../core/components/modal/modal.module';
import { FiltroBusquedaGestionarManipuleoComponent } from './filtro-busqueda-gestionar-manipuleo.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { configureTestSuite } from '../../../core/mocks/testing';

describe('FiltroBusquedaGestionarManipuleoComponent', () => {
  let component: FiltroBusquedaGestionarManipuleoComponent;
  let fixture: ComponentFixture<FiltroBusquedaGestionarManipuleoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        FiltroBusquedaGestionarManipuleoComponent,
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
      providers : [
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroBusquedaGestionarManipuleoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
