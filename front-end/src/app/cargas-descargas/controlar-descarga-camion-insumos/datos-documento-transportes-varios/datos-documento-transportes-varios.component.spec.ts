import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosDocumentoTransportesVariosComponent } from './datos-documento-transportes-varios.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HotkeyModule } from 'angular2-hotkeys';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TestModule } from '../../../core/mocks/test.module';
import { DescargaEventsNotifierService } from '../../shared/services/descarga-events-notifier.service';
import { ParametrosTerminalService } from '../../shared/services/parametros-terminal.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { configureTestSuite } from '../../../core/mocks/testing';

describe('DatosDocumentoTransportesVariosComponent', () => {
  let component: DatosDocumentoTransportesVariosComponent;
  let fixture: ComponentFixture<DatosDocumentoTransportesVariosComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        DatosDocumentoTransportesVariosComponent,
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
        DescargaEventsNotifierService,
        ParametrosTerminalService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosDocumentoTransportesVariosComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
