import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCambiarTarjetaComponent } from './detalle-cambiar-tarjeta.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { configureTestSuite } from '../../../core/mocks/testing';
import { AuthService } from '../../../../app/core/services/session/auth.service';

describe('DetalleCambiarTarjetaComponent', () => {
  let component: DetalleCambiarTarjetaComponent;
  let fixture: ComponentFixture<DetalleCambiarTarjetaComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        DetalleCambiarTarjetaComponent
      ],
      imports: [
        ReactiveFormsModule
      ],
      providers: [
        AuthService
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  });

  beforeEach(() => {

    const authService = TestBed.get(AuthService);
    spyOn(authService, 'getUserContext').and.returnValue({'terminal': { 'utilizaTarjeta': true} } );

    fixture = TestBed.createComponent(DetalleCambiarTarjetaComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('El método aceptar', () => {
    it('debe emitir el evento aceptado', () => {
      spyOn(component.aceptado, 'emit');
      component.aceptar();
      expect(component.aceptado.emit).toHaveBeenCalled();
    });
  });

  describe('El método cancelar', () => {
    it('debe emitir el evento aceptado', () => {
      spyOn(component.cancelado, 'emit');
      component.cancelar();
      expect(component.cancelado.emit).toHaveBeenCalled();
    });
  });

  describe('El método setFocus', () => {

    beforeEach(() => {
      component.tarjetaNueva.setFocus = jasmine.createSpy('setFocus');
    });

    it('debe enfocar el componente para el ingreso de la nueva tarjeta', () => {
      component.setFocus();
      expect(component.tarjetaNueva.setFocus).toHaveBeenCalled();
    });
  });

  describe('El método botonAceptarDeshabilitado', () => {

    beforeEach(() => {
    });

    it('Cuando no es modo edicion devuelve true', () => {
      // Arrange
      component.modoEdicion = false;

      // Act
      const respuesta = component.botonAceptarDeshabilitado();

      // Assert
      expect(respuesta).toBe(true);
    });

    it('Cuando terminal utiliza tarjeta devuelve true', () => {
      // Arrange
      const authService = TestBed.get(AuthService);
      (authService.getUserContext as jasmine.Spy).and.returnValue({'terminal': { 'utilizaTarjeta': true } } );

      // Act
      const respuesta = component.botonAceptarDeshabilitado();

      // Assert
      expect(respuesta).toBe(true);
    });

    it('Cuando terminal NO utiliza tarjeta y si es modo edicion devuelve false', () => {
      // Arrange
      const authService = TestBed.get(AuthService);
      (authService.getUserContext as jasmine.Spy).and.returnValue({'terminal': { 'utilizaTarjeta': false } } );

      fixture = TestBed.createComponent(DetalleCambiarTarjetaComponent);
      component = fixture.componentInstance;

      component.modoEdicion = true;

      // Act
      const respuesta = component.botonAceptarDeshabilitado();

      // Assert
      expect(respuesta).toBe(false);
    });

    describe('El método onBlurNumeroTarjeta', () => {

      beforeEach(() => {
      });

      it('Debe emitir el evento aceptado.', () => {
        // Arrange
        spyOn(component.aceptado, 'emit');

        // Act
        component.aceptar();

        // Assert
        expect(component.aceptado.emit).toHaveBeenCalled();
      });

    });

  });
});
