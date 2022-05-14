import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarProductoFueraCircuitoComponent } from './modificar-producto-fuera-circuito.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TestModule } from '../../../core/mocks/test.module';
import { CampoEpaSustentableService } from '../../../shared/desplegable-campo-epa-sustentable/campo-epa-sustentable.service';
import { NavigationService } from '../../../core/services/navigationService/navigation.service';
import { MovimientoService } from '../../shared/services/movimiento.service';
import { CircuitoService } from '../../shared/services/circuito.service';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Routes } from '@angular/router';
import { ModificarProductoFueraCircuitoService } from './service/modificar-producto-fuera-circuito.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RubrosCalidadService } from '../../ingresar-calidad-calado/rubros-calidad/rubros-calidad.service';
import { IngresarCalidadCaladoService } from '../../ingresar-calidad-calado/ingresar-calidad-calado.service';
import { HotkeyModule } from 'angular2-hotkeys';
import { CalidadMovimientoCerealService } from '../../shared/services/calidad-movimiento-cereal.service';
import { DecimalSeparatorPipe } from '../../../core/pipes/decimal-separator.pipe';
import { PositiveDecimalSeparatorPipe } from '../../../core/pipes/positive-decimal-separator.pipe';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { configureTestSuite } from '../../../core/mocks/testing';

export const MockRoutes: Routes = [
  {
      path: '',
      component: ModificarProductoFueraCircuitoComponent,
      data: {
          title: 'ModificarProductoFueraCircuito'
      },
      pathMatch: 'full'
  }
];

describe('ModificarProductoFueraCircuitoComponent', () => {
  let component: ModificarProductoFueraCircuitoComponent;
  let fixture: ComponentFixture<ModificarProductoFueraCircuitoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        ModificarProductoFueraCircuitoComponent,
      ],
      imports: [
        ReactiveFormsModule,
        TestModule,
        NgxDatatableModule,
        HotkeyModule.forRoot(),
        RouterTestingModule.withRoutes(MockRoutes)
      ],
      providers: [
        CampoEpaSustentableService,
        NavigationService,
        FormComponentService,
        CircuitoService,
        MovimientoService,
        ModificarProductoFueraCircuitoService,
        RubrosCalidadService,
        IngresarCalidadCaladoService,
        CalidadMovimientoCerealService,
        DecimalSeparatorPipe,
        PositiveDecimalSeparatorPipe
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarProductoFueraCircuitoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
