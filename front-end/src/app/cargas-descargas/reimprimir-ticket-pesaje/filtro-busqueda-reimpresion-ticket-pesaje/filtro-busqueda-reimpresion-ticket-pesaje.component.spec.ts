import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroBusquedaReimpresionTicketPesajeComponent } from './filtro-busqueda-reimpresion-ticket-pesaje.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HotkeyModule } from 'angular2-hotkeys';
import { TestModule } from '../../../core/mocks/test.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { configureTestSuite } from '../../../core/mocks/testing';

describe('FiltroBusquedaReimpresionTicketPesajeComponent', () => {
  let component: FiltroBusquedaReimpresionTicketPesajeComponent;
  let fixture: ComponentFixture<FiltroBusquedaReimpresionTicketPesajeComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        FiltroBusquedaReimpresionTicketPesajeComponent,
      ],
      imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        HotkeyModule.forRoot(),
        TestModule,
        NgbModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroBusquedaReimpresionTicketPesajeComponent);
    component = fixture.componentInstance;

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
