import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarControlDescargaCamionSubproductosNogranosComponent } from './modificar-control-descarga-camion-subproductos-nogranos.component';
import { TestModule } from '../../../core/mocks/test.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NavigationService } from '../../../core/services/navigationService/navigation.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Routes } from '@angular/router';
import { HotkeyModule } from 'angular2-hotkeys';
import { ControlarDescargaCamionSubproductosService } from '../../controlar-descarga-camion-subproductos/controlar-descarga-camion-subproductos.service';
import { DescargaEventsNotifierService } from '../../shared/services/descarga-events-notifier.service';
import { ParametrosTerminalService } from '../../shared/services/parametros-terminal.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { CircuitoService } from '../../shared/services/circuito.service';
import { MovimientoService } from '../../shared/services/movimiento.service';
import { configureTestSuite } from '../../../core/mocks/testing';
import { CommandService } from '../../../shared/command-service/command.service';

export const MockRoutes: Routes = [
  {
      path: '',
      component: ModificarControlDescargaCamionSubproductosNogranosComponent,
      data: {
          title: 'ModificarControlDescargaCamionSubProductosNoGranos'
      },
      pathMatch: 'full'
  }
];

describe('ModificarControlDescargaCamionSubproductosNogranosComponent', () => {
  let component: ModificarControlDescargaCamionSubproductosNogranosComponent;
  let fixture: ComponentFixture<ModificarControlDescargaCamionSubproductosNogranosComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        ModificarControlDescargaCamionSubproductosNogranosComponent,
      ],
      imports: [
        TestModule,
        ReactiveFormsModule,
        HotkeyModule.forRoot(),
        RouterTestingModule.withRoutes(MockRoutes)
      ],
      providers: [
        FormComponentService,
        NavigationService,
        ControlarDescargaCamionSubproductosService,
        DescargaEventsNotifierService,
        ParametrosTerminalService,
        CircuitoService,
        MovimientoService,
        CommandService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarControlDescargaCamionSubproductosNogranosComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
