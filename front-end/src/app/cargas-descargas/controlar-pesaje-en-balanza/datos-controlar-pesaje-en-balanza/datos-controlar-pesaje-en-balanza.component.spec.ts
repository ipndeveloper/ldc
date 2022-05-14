import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosControlarPesajeEnBalanzaComponent } from './datos-controlar-pesaje-en-balanza.component';
import { ExcelService } from '../../../core/services/excelService/excel.service';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HotkeyModule } from 'angular2-hotkeys';
import { TestModule } from '../../../core/mocks/test.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { configureTestSuite } from '../../../core/mocks/testing';

describe('DatosControlarPesajeEnBalanzaComponent', () => {
  let component: DatosControlarPesajeEnBalanzaComponent;
  let fixture: ComponentFixture<DatosControlarPesajeEnBalanzaComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        DatosControlarPesajeEnBalanzaComponent,
      ],
      providers: [
        ExcelService
      ],
      imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        HotkeyModule.forRoot(),
        TestModule,
        NgbModule,
        NgxDatatableModule,
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosControlarPesajeEnBalanzaComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
