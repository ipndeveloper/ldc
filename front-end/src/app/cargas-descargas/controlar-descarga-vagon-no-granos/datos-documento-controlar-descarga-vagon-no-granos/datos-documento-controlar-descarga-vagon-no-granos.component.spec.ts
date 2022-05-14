import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosDocumentoControlarDescargaVagonNoGranosComponent } from './datos-documento-controlar-descarga-vagon-no-granos.component';
import { TestModule } from '../../../core/mocks/test.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HotkeyModule } from 'angular2-hotkeys';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DescargaEventsNotifierService } from '../../shared/services/descarga-events-notifier.service';
import { ParametrosTerminalService } from '../../shared/services/parametros-terminal.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Terminal } from '../../../shared/data-models/terminal';
import { Sociedad } from '../../../shared/data-models/sociedad';
import { Sede } from '../../../shared/data-models/sede';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { BrowserModule } from '@angular/platform-browser';
import { configureTestSuite } from '../../../core/mocks/testing';
import { Puerto } from '../../../shared/data-models/puerto';
import { FinalidadService } from '../../../shared/desplegable-finalidad/finalidad.service';

describe('DatosDocumentoControlarDescargaVagonNoGranosComponent', () => {
  let component: DatosDocumentoControlarDescargaVagonNoGranosComponent;
  let fixture: ComponentFixture<DatosDocumentoControlarDescargaVagonNoGranosComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        DatosDocumentoControlarDescargaVagonNoGranosComponent,
      ],
      imports: [
        BrowserModule,
        TestModule,
        ReactiveFormsModule,
        HotkeyModule.forRoot(),
        ToastrModule.forRoot(),
        NgbModule
      ],
      providers : [
        DescargaEventsNotifierService,
        ParametrosTerminalService,
        FormComponentService,
        FinalidadService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(DatosDocumentoControlarDescargaVagonNoGranosComponent);
    component = fixture.componentInstance;
    component.terminal = new Terminal(1, '', false,
      new Sociedad(1, ''), new Sede(1, '', ''), new Puerto(1, '', false), '1', true, true, false, false);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
