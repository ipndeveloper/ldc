import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarPesoVagonComponent } from './registrar-peso-vagon.component';
import { TestModule } from '../../core/mocks/test.module';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HotkeyModule } from 'angular2-hotkeys';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CondicionManipuleoService } from '../registrar-peso/situacion-entrada/condicion-manipuleo.service';
import { BusquedaMovimientoPesajeService } from '../registrar-peso/busqueda-movimiento-pesaje/busqueda-movimiento-pesaje.service';
import { MovimientoService } from '../shared/services/movimiento.service';
import { CircuitoService } from '../shared/services/circuito.service';
import { VagonService } from '../../shared/autocomplete-vagon/vagon.service';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { RegistrarPesadaVagonService } from './registrar-pesada-vagon.service';
import { AutorizarcionService } from '../shared/modals/modal-autorizacion/autorizacion.service';
import { DispositivoService } from '../shared/services/dispositivo.service';
import { BalanzaService } from '../shared/services/balanza.service';
import { DispositivoDataView } from '../../shared/data-models/dispositivo-data-view';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DesplegableCondicionManipuleoComponent } from '../registrar-peso/situacion-entrada/desplegable-condicion-manipuleo/desplegable-condicion-manipuleo.component';
import { configureTestSuite } from '../../core/mocks/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';
import { NavigationService } from '../../core/services/navigationService/navigation.service';

describe('RegistrarPesoVagonComponent', () => {
  let component: RegistrarPesoVagonComponent;
  let fixture: ComponentFixture<RegistrarPesoVagonComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        RegistrarPesoVagonComponent,
        DesplegableCondicionManipuleoComponent
      ],
      imports: [
        BrowserModule,
        TestModule,
        ReactiveFormsModule,
        HotkeyModule.forRoot(),
        ToastrModule.forRoot(),
        RouterTestingModule,
        RouterModule,
        NgbModule
      ],
      providers: [
        CondicionManipuleoService,
        BusquedaMovimientoPesajeService,
        MovimientoService,
        CircuitoService,
        VagonService,
        FormComponentService,
        RegistrarPesadaVagonService,
        BalanzaService,
        AutorizarcionService,
        DispositivoService,
        NavigationService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarPesoVagonComponent);
    component = fixture.componentInstance;
    component.balanza = new DispositivoDataView();
    component.balanza.nombre = 'Balanza 1';
    component.balanza.id = 1;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
