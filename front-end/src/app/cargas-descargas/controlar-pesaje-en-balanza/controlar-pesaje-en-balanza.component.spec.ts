import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlarPesajeEnBalanzaComponent } from './controlar-pesaje-en-balanza.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { ControlarPesajeEnBalanzaService } from './services/controlar-pesaje-en-balanza.service';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { ApiService } from '../../core/services/restClient/api.service';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HotkeyModule } from 'angular2-hotkeys';
import { TestModule } from '../../core/mocks/test.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ParametrosTerminalService } from '../shared/services/parametros-terminal.service';
import { configureTestSuite } from '../../core/mocks/testing';

describe('ControlarPesajeEnBalanzaComponent', () => {
  let component: ControlarPesajeEnBalanzaComponent;
  let fixture: ComponentFixture<ControlarPesajeEnBalanzaComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        ControlarPesajeEnBalanzaComponent,
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        FormComponentService,
        ParametrosTerminalService,
        ControlarPesajeEnBalanzaService,
        SearchFormActionsNotifierService,
        ExcelService,
        ApiService
      ],
      imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        HotkeyModule.forRoot(),
        TestModule,
        NgbModule,
        NgxDatatableModule,
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlarPesajeEnBalanzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
