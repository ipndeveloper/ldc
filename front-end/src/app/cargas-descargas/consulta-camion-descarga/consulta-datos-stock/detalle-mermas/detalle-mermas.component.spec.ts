import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleMermasComponent } from './detalle-mermas.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HotkeyModule } from 'angular2-hotkeys';
import { ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TestModule } from '../../../../core/mocks/test.module';
import { DescargaEventsNotifierService } from '../../../shared/services/descarga-events-notifier.service';
import { CalidadMovimientoCerealService } from '../../../shared/services/calidad-movimiento-cereal.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { configureTestSuite } from '../../../../core/mocks/testing';
import { DecimalSeparatorPipe } from '../../../../core/pipes/decimal-separator.pipe';

describe('DetalleMermasComponent', () => {
  let component: DetalleMermasComponent;
  let fixture: ComponentFixture<DetalleMermasComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        DetalleMermasComponent,
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
        CalidadMovimientoCerealService,
        DecimalSeparatorPipe
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleMermasComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
