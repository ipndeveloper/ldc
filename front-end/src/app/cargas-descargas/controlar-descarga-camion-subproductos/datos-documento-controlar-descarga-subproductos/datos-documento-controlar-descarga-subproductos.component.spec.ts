import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosDocumentoControlarDescargaSubproductosComponent } from './datos-documento-controlar-descarga-subproductos.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HotkeyModule } from 'angular2-hotkeys';
import { ToastrModule } from 'ngx-toastr';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { DescargaEventsNotifierService } from '../../shared/services/descarga-events-notifier.service';
import { ParametrosTerminalService } from '../../shared/services/parametros-terminal.service';
import { TestModule } from '../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { configureTestSuite } from '../../../core/mocks/testing';
import { FinalidadService } from '../../../shared/desplegable-finalidad/finalidad.service';

describe('DatosDocumentoControlarDescargaSubproductosComponent', () => {
  let component: DatosDocumentoControlarDescargaSubproductosComponent;
  let fixture: ComponentFixture<DatosDocumentoControlarDescargaSubproductosComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        DatosDocumentoControlarDescargaSubproductosComponent,
      ],
      imports: [
        TestModule,
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        HotkeyModule.forRoot(),
        ToastrModule.forRoot()
      ],
      providers : [
        FormComponentService,
        DescargaEventsNotifierService,
        ParametrosTerminalService,
        FinalidadService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosDocumentoControlarDescargaSubproductosComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
