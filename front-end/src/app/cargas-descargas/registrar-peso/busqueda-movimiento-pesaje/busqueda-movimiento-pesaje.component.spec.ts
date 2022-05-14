import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaMovimientoPesajeComponent } from './busqueda-movimiento-pesaje.component';
import { TestModule } from '../../../core/mocks/test.module';
import { ReactiveFormsModule, FormGroup, AbstractControl } from '@angular/forms';
import { BusquedaMovimientoPesajeService } from './busqueda-movimiento-pesaje.service';
import { BrowserModule } from '@angular/platform-browser';
import { HotkeyModule } from 'angular2-hotkeys';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PatenteService } from '../../shared/services/patente.service';
import { ValorBooleanoServiceService } from '../../../shared/desplegable-valor-booleano/valor-booleano-service.service';
import { BalanzaService } from '../../shared/services/balanza.service';
import { DispositivoService } from '../../shared/services/dispositivo.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { configureTestSuite } from '../../../core/mocks/testing';
import { AuthService } from '../../../../app/core/services/session/auth.service';

describe('BusquedaMovimientoPesajeComponent', () => {
  let component: BusquedaMovimientoPesajeComponent;
  let fixture: ComponentFixture<BusquedaMovimientoPesajeComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        BusquedaMovimientoPesajeComponent
      ],
      imports: [
        BrowserModule,
        TestModule,
        ReactiveFormsModule,
        HotkeyModule.forRoot(),
        ToastrModule.forRoot(),
        NgbModule
      ],
      providers: [
        BusquedaMovimientoPesajeService,
        PatenteService,
        ValorBooleanoServiceService,
        BalanzaService,
        DispositivoService
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaMovimientoPesajeComponent);
    component = fixture.componentInstance;
    spyOn<any>(component, 'determinarAccionHabilitarPlataformaAutomatica');
    spyOn<any>(component, 'determinarSentidoBalanza');

    component.busquedaMovimientoForm = new FormGroup({});
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('El metodo ngAfterViewInit', () => {
    it('Invoca al metodo determinarAccionHabilitarPlataformaAutomatica', () => {
      // Arrange
      // Act
      component.ngAfterViewInit();
      // Assert
      expect(component['determinarAccionHabilitarPlataformaAutomatica']).toHaveBeenCalledTimes(1);
    });

    it('Invoca al metodo determinarSentidoBalanza', () => {
      // Arrange
      // Act
      component.ngAfterViewInit();
      // Assert
      expect(component['determinarSentidoBalanza']).toHaveBeenCalledTimes(1);
    });
  });

  describe('El metodo resetForm', () => {
    it('Invoca al metodo determinarAccionHabilitarPlataformaAutomatica', () => {
      // Arrange
      // Act
      component.ngAfterViewInit();
      // Assert
      expect(component['determinarAccionHabilitarPlataformaAutomatica']).toHaveBeenCalledTimes(1);
    });

    it('Invoca al metodo determinarSentidoBalanza', () => {
      // Arrange
      // Act
      component.ngAfterViewInit();
      // Assert
      expect(component['determinarSentidoBalanza']).toHaveBeenCalledTimes(1);
    });
  });

  describe('El metodo onClickIdentificarCamion', () => {

    it('Emite searchClicked cuando el form es valido', () => {
      // Arrange
      spyOnProperty(component.busquedaMovimientoForm, 'valid', 'get').and.returnValue(true);
      spyOn(component.searchClicked, 'emit');
      // Act
      component.onClickIdentificarCamion();
      // Assert
      expect(component.searchClicked.emit).toHaveBeenCalledTimes(1);
    });

    it('Invoca al metodo formIsValid cuando el form no es valido', () => {
      // Arrange
      spyOnProperty(component.busquedaMovimientoForm, 'valid', 'get').and.returnValue(false);
      spyOn<any>(component, 'formIsValid');
      // Act
      component.onClickIdentificarCamion();
      // Assert
      expect(component['formIsValid']).toHaveBeenCalledTimes(1);
    });
  });

  describe('El metodo ngOnChanges', () => {

    it('Setea disableButtons = true cuando el form esta deshabilitado', () => {
      // Arrange
      spyOnProperty(component.busquedaMovimientoForm, 'enabled', 'get').and.returnValue(false);
      // Act
      component.ngOnChanges();
      // Assert
      expect(component.disableButtons).toBe(true);
    });
  });

  describe('El metodo setFocus', () => {

    it('Invoca al metodo setFocus de desplegableValorBooleano', () => {
      // Arrange
      component.desplegableValorBooleano = {setFocus: jasmine.createSpy('setFocus')} as any;
      jasmine.clock().install();
      // Act
      component.setFocus();
      // Assert
      jasmine.clock().tick(250);
      expect(component.desplegableValorBooleano.setFocus).toHaveBeenCalledTimes(1);
      jasmine.clock().uninstall();
    });
  });

  describe('El metodo setFocusPatente', () => {

    it('Invoca al metodo setFocus de autocompletePatente', () => {
      // Arrange
      component.autocompletePatente = {setFocus: jasmine.createSpy('setFocus')} as any;
      jasmine.clock().install();
      // Act
      component.setFocusPatente();
      // Assert
      jasmine.clock().tick(250);
      expect(component.autocompletePatente.setFocus).toHaveBeenCalledTimes(1);
      jasmine.clock().uninstall();
    });
  });

  describe('El metodo botonBuscarDeshabilitado', () => {

    beforeEach(() => {

      component.busquedaMovimientoForm = new FormGroup({});
      component.busquedaMovimientoForm.controls.sinTarjeta = { 'value': null } as AbstractControl;

    });

    it('Cuando es automatico y balanza NO esta habilitada devuelve true', () => {

      // Arrange
      component.esAutomatico = true;
      component.balanzaHabilitada = false;

      // Act
      const respuesta = component.botonIdentificarCamionDeshabilitado;

      // Assert
      expect(respuesta).toBe(true);
    });

    it('Cuando terminal utiliza tarjeta y NO ha seleccionado opcion sin tarjeta devuelve true', () => {

      // Arrange
      const authService = TestBed.get(AuthService);
      spyOn(authService, 'getUserContext').and.returnValue({'terminal': {'utilizaTarjeta': true} });

      fixture = TestBed.createComponent(BusquedaMovimientoPesajeComponent);
      component = fixture.componentInstance;

      component.busquedaMovimientoForm = new FormGroup({});
      component.busquedaMovimientoForm.controls.sinTarjeta = { 'value': false } as AbstractControl;

      // Act
      const respuesta = component.botonIdentificarCamionDeshabilitado;

      // Assert
      expect(respuesta).toBe(true);
    });

  });

});
