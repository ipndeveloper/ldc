import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroBusquedaReimpresionTicketCalidadComponent } from './filtro-busqueda-reimpresion-ticket-calidad.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HotkeyModule } from 'angular2-hotkeys';
import { TestModule } from '../../../core/mocks/test.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReimpresionTicketCalidadService } from '../services/reimpresion-ticket-calidad.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { configureTestSuite } from '../../../core/mocks/testing';

describe('FiltroBusquedaReimpresionTicketCalidadComponent', () => {
  let component: FiltroBusquedaReimpresionTicketCalidadComponent;
  let fixture: ComponentFixture<FiltroBusquedaReimpresionTicketCalidadComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        FiltroBusquedaReimpresionTicketCalidadComponent,
      ],
      imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        HotkeyModule.forRoot(),
        TestModule,
        NgbModule
      ],
      providers : [
        ReimpresionTicketCalidadService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroBusquedaReimpresionTicketCalidadComponent);
    component = fixture.componentInstance;

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
