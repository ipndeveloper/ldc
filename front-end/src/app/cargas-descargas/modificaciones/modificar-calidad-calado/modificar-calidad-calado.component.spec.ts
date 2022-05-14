import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarCalidadCaladoComponent } from './modificar-calidad-calado.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { TestModule } from '../../../core/mocks/test.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HotkeyModule } from 'angular2-hotkeys';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule, Routes } from '@angular/router';
import { IngresarCalidadCaladoService } from '../../ingresar-calidad-calado/ingresar-calidad-calado.service';
import { CircuitoService } from '../../shared/services/circuito.service';
import { RubrosCalidadService } from '../../ingresar-calidad-calado/rubros-calidad/rubros-calidad.service';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { ConfirmacionProductoCalado } from '../../ingresar-calidad-calado/confirmaciones/confirmacionProductoCalado.service';
import { PatenteService } from '../../shared/services/patente.service';
import { TipoProductoService } from '../../../shared/desplegable-tipo-producto/tipo-producto.service';
import { ReferenciaDestinoService } from '../../../shared/desplegable-referencia-destino/referencia-destino.service';
import { NavigationService } from '../../../core/services/navigationService/navigation.service';
import { GrupoRubroAnalisisService } from '../../../shared/desplegable-grupo-rubro-analisis/grupo-rubro-analisis.service';
import { DropdownNotificationService } from '../../../core/shared/super/dropdown-notification.service';
import { CalidadMovimientoCerealService } from '../../shared/services/calidad-movimiento-cereal.service';
import { DescargaEventsNotifierService } from '../../shared/services/descarga-events-notifier.service';
import { DecisionLaboratorioService } from '../../gestionar-calidad-por-laboratorio/service/decision-laboratorio.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CaladoService } from '../../ingresar-calidad-calado/calado.service';
import { configureTestSuite } from '../../../core/mocks/testing';
import { CommandService } from '../../../shared/command-service/command.service';
import { MovimientoService } from '../../shared/services/movimiento.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Terminal } from '../../../shared/data-models/terminal';

export const MockRoutes: Routes = [
  {
      path: '',
      component: ModificarCalidadCaladoComponent,
      data: {
          title: 'ModificarCalidadFueraDePuesto'
      },
      pathMatch: 'full'
  }
];

describe('ModificarCalidadCaladoComponent', () => {
  let component: ModificarCalidadCaladoComponent;
  let fixture: ComponentFixture<ModificarCalidadCaladoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        ModificarCalidadCaladoComponent,
      ],
      imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        TestModule,
        NgbModule,
        HotkeyModule.forRoot(),
        NgxDatatableModule,
        RouterTestingModule.withRoutes(MockRoutes),
        RouterModule
      ],
      providers: [
        IngresarCalidadCaladoService,
        CircuitoService,
        RubrosCalidadService,
        FormComponentService,
        ConfirmacionProductoCalado,
        PatenteService,
        TipoProductoService,
        ReferenciaDestinoService,
        NavigationService,
        GrupoRubroAnalisisService,
        DropdownNotificationService,
        CalidadMovimientoCerealService,
        DescargaEventsNotifierService,
        DecisionLaboratorioService,
        CaladoService,
        CommandService,
        MovimientoService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  class TerminalMock extends Terminal {
    constructor(descripcion: string) {
      super(1, descripcion, false, {} as any, {} as any, {} as any, '1', false, true, false, false);
    }
  }

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarCalidadCaladoComponent);
    component = fixture.componentInstance;

    component.filtroMovimiento.setFocus = jasmine.createSpy('setFocus');
    component.terminal = new TerminalMock('Terminal');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
