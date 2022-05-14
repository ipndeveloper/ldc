import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroBusquedaEntregadoresComponent } from './filtro-busqueda-entregadores.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HotkeyModule } from 'angular2-hotkeys';
import { TestModule } from '../../../core/mocks/test.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from '../../../core/components/modal/modal.module';
import { TipoDocumentoPorteService } from '../../shared/desplegable-tipo-documento-porte/tipo-documento-porte.service';
import { EstadoMovimientoService } from '../../../shared/desplegable-estado-movimiento/estado-movimiento.service';
import { DropdownNotificationService } from '../../../core/shared/super/dropdown-notification.service';
import { PatenteService } from '../../shared/services/patente.service';
import { VagonService } from '../../../shared/autocomplete-vagon/vagon.service';
import { TipoTransporteService } from '../../../shared/desplegable-tipo-transporte/desplegable-tipo-transporte.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { configureTestSuite } from '../../../core/mocks/testing';

describe('FiltroBusquedaEntregadoresComponent', () => {
  let component: FiltroBusquedaEntregadoresComponent;
  let fixture: ComponentFixture<FiltroBusquedaEntregadoresComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        FiltroBusquedaEntregadoresComponent,
      ],
      imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        HotkeyModule.forRoot(),
        TestModule,
        NgbModule,
        ModalModule
      ],
      providers : [
        TipoDocumentoPorteService,
        EstadoMovimientoService,
        DropdownNotificationService,
        PatenteService,
        VagonService,
        TipoTransporteService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroBusquedaEntregadoresComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
