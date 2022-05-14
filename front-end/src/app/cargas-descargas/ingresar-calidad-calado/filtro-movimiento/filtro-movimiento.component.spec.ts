import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroMovimientoComponent } from './filtro-movimiento.component';
import { TestModule } from '../../../core/mocks/test.module';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { IngresarCalidadCaladoService } from '../ingresar-calidad-calado.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { configureTestSuite } from '../../../core/mocks/testing';
import { AuthService } from '../../../../app/core/services/session/auth.service';

describe('FiltroMovimientoComponent', () => {
  let component: FiltroMovimientoComponent;
  let fixture: ComponentFixture<FiltroMovimientoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        FiltroMovimientoComponent,
      ],
      imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        TestModule,
        NgbModule
      ],
      providers: [
        IngresarCalidadCaladoService,
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroMovimientoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('El método botonBuscarDeshabilitado', () => {

    beforeEach(() => {
    });

    it('Cuando el formulario del filtro esta deshabilitado devuelve true', () => {

      // Arrange
      component.filtroMovimientoForm = new FormGroup({});
      spyOnProperty(component.filtroMovimientoForm, 'disabled', 'get').and.returnValue(true);

      // Act
      const respuesta = component.botonBuscarDeshabilitado;

      // Assert
      expect(respuesta).toBe(true);
    });

    it('Cuando la terminal utiliza tarjeta devuelve true', () => {

      // Arrange
      const authService = TestBed.get(AuthService);
      spyOn(authService, 'getUserContext').and.returnValue({'terminal': { 'utilizaTarjeta': true} } );

      fixture = TestBed.createComponent(FiltroMovimientoComponent);
      component = fixture.componentInstance;
      component.filtroMovimientoForm = new FormGroup({});

      // Act
      const respuesta = component.botonBuscarDeshabilitado;

      // Assert
      expect(respuesta).toBe(true);
    });

    it('Cuando el formulario del filtro NO esta deshabilitado y terminal NO utiliza tarjeta devuelve false', () => {

      // Arrange
      const authService = TestBed.get(AuthService);
      spyOn(authService, 'getUserContext').and.returnValue({'terminal': { 'utilizaTarjeta': false} } );

      fixture = TestBed.createComponent(FiltroMovimientoComponent);
      component = fixture.componentInstance;

      component.filtroMovimientoForm = new FormGroup({});
      spyOnProperty(component.filtroMovimientoForm, 'disabled', 'get').and.returnValue(false);

      // Act
      const respuesta = component.botonBuscarDeshabilitado;

      // Assert
      expect(respuesta).toBe(false);
    });

  });

});
