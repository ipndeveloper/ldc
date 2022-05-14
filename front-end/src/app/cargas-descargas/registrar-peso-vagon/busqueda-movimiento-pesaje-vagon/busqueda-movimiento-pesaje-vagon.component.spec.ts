import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaMovimientoPesajeVagonComponent } from './busqueda-movimiento-pesaje-vagon.component';
import { TestModule } from '../../../core/mocks/test.module';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AutocompleteVagonComponent } from '../../../shared/autocomplete-vagon/autocomplete-vagon.component';
import { VagonService } from '../../../shared/autocomplete-vagon/vagon.service';
import { AutocompletePatenteComponent } from '../../../shared/autocomplete-patente/autocomplete-patente.component';
import { PatenteService } from '../../shared/services/patente.service';
import { NumeroConEtiquetaComponent } from '../../../core/controls/numero-con-etiqueta/numero-con-etiqueta.component';
import { configureTestSuite } from '../../../core/mocks/testing';
import { AuthService } from '../../../../app/core/services/session/auth.service';

describe('BusquedaMovimientoPesajeVagonComponent', () => {
  let component: BusquedaMovimientoPesajeVagonComponent;
  let fixture: ComponentFixture<BusquedaMovimientoPesajeVagonComponent>;

  const formBuilder: FormBuilder = new FormBuilder();

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        BusquedaMovimientoPesajeVagonComponent,
        AutocompleteVagonComponent,
        AutocompletePatenteComponent,
        NumeroConEtiquetaComponent
      ],
      imports: [
        TestModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        VagonService,
        PatenteService
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaMovimientoPesajeVagonComponent);
    component = fixture.componentInstance;

    component.busquedaMovimientoForm = formBuilder.group({
      numeroVagon: null,
      tarjeta: null
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('El método botonIdentificarVagonDeshabilitado', () => {

    it('Cuando terminal utiliza tarjeta devuelve true', () => {

      // Arrange
      const authService = TestBed.get(AuthService);
      spyOn(authService, 'getUserContext').and.returnValue({'terminal': {'utilizaTarjeta': true } });

      fixture = TestBed.createComponent(BusquedaMovimientoPesajeVagonComponent);
      component = fixture.componentInstance;

      // Act
      const respuesta = component.botonIdentificarVagonDeshabilitado;

      // Assert
      expect(respuesta).toBe(true);
    });

    it('Cuando terminal utiliza tarjeta devuelve true', () => {

      // Arrange
      const authService = TestBed.get(AuthService);
      spyOn(authService, 'getUserContext').and.returnValue({'terminal': {'utilizaTarjeta': false } });

      fixture = TestBed.createComponent(BusquedaMovimientoPesajeVagonComponent);
      component = fixture.componentInstance;

      // Act
      const respuesta = component.botonIdentificarVagonDeshabilitado;

      // Assert
      expect(respuesta).toBe(false);
    });

  });

});
