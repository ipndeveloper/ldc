import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsultaDatosStockComponent } from './consulta-datos-stock.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HotkeyModule } from 'angular2-hotkeys';
import { ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TestModule } from '../../../core/mocks/test.module';
import { DescargaEventsNotifierService } from '../../shared/services/descarga-events-notifier.service';
import { CalidadMovimientoCerealService } from '../../shared/services/calidad-movimiento-cereal.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { configureTestSuite } from '../../../core/mocks/testing';

describe('ConsultaDatosStockComponent', () => {
  let component: ConsultaDatosStockComponent;
  let fixture: ComponentFixture<ConsultaDatosStockComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        ConsultaDatosStockComponent,
      ],
      imports: [
        BrowserModule,
        ReactiveFormsModule,
        HotkeyModule.forRoot(),
        ToastrModule.forRoot(),
        RouterTestingModule,
        NgxDatatableModule,
        TestModule
      ],
      providers : [
        DescargaEventsNotifierService,
        CalidadMovimientoCerealService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaDatosStockComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
