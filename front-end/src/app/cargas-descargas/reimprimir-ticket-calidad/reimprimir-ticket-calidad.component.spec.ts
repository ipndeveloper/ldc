import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { ReimprimirTicketCalidadComponent } from './reimprimir-ticket-calidad.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReimpresionTicketCalidadService } from './services/reimpresion-ticket-calidad.service';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HotkeyModule } from 'angular2-hotkeys';
import { TestModule } from '../../core/mocks/test.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { configureTestSuite } from '../../core/mocks/testing';

describe('ReimprimirTicketCalidadComponent', () => {
  let component: ReimprimirTicketCalidadComponent;
  let fixture: ComponentFixture<ReimprimirTicketCalidadComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        ReimprimirTicketCalidadComponent,
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        ReimpresionTicketCalidadService,
        FormComponentService
      ],
      imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        HotkeyModule.forRoot(),
        TestModule,
        NgbModule
      ],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReimprimirTicketCalidadComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
