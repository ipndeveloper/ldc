import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserModule } from '@angular/platform-browser';
import { TestModule } from '../../../core/mocks/test.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HotkeyModule } from 'angular2-hotkeys';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { CalidadMovimientoCerealService } from '../../shared/services/calidad-movimiento-cereal.service';
import { HttpClientModule } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { GrupoRubroAnalisisService } from '../../../shared/desplegable-grupo-rubro-analisis/grupo-rubro-analisis.service';
import { DropdownNotificationService } from '../../../core/shared/super/dropdown-notification.service';
import { ConsultarCalidadComponent } from './consultar-calidad.component';
import { IngresarCalidadCaladoService } from '../../ingresar-calidad-calado/ingresar-calidad-calado.service';
import { DescargaEventsNotifierService } from '../services/descarga-events-notifier.service';
import { DecisionLaboratorioService } from '../../gestionar-calidad-por-laboratorio/service/decision-laboratorio.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { configureTestSuite } from '../../../core/mocks/testing';

describe('ConsultarCalidadComponent', () => {
  let component: ConsultarCalidadComponent;
  let fixture: ComponentFixture<ConsultarCalidadComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        ConsultarCalidadComponent,
      ],
      imports: [
        BrowserModule,
        TestModule,
        ReactiveFormsModule,
        HotkeyModule.forRoot(),
        ToastrModule.forRoot(),
        NgbModule,
        HttpClientModule,
        NgxDatatableModule
      ],
      providers: [
        CalidadMovimientoCerealService,
        FormComponentService,
        IngresarCalidadCaladoService,
        GrupoRubroAnalisisService,
        DropdownNotificationService,
        DescargaEventsNotifierService,
        DecisionLaboratorioService,
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultarCalidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
