import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosPesajeComponent } from './datos-pesaje.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TestModule } from '../../../core/mocks/test.module';
import { HotkeyModule } from 'angular2-hotkeys';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CondicionManipuleoService } from '../../registrar-peso/situacion-entrada/condicion-manipuleo.service';
import { BalanzaService } from '../services/balanza.service';
import { PopupService } from '../../../core/services/popupService/popup.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { configureTestSuite } from '../../../core/mocks/testing';

describe('DatosPesajeComponent', () => {
  let component: DatosPesajeComponent;
  let fixture: ComponentFixture<DatosPesajeComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        DatosPesajeComponent,
      ],
      imports: [
        BrowserModule,
        TestModule,
        ReactiveFormsModule,
        HotkeyModule.forRoot(),
        ToastrModule.forRoot(),
        NgbModule
      ],
      providers: [
        CondicionManipuleoService,
        BalanzaService,
        FormBuilder,
        PopupService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosPesajeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
