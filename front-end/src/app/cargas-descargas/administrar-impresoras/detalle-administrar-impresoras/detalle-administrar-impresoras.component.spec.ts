import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { DetalleAdministrarImpresorasComponent } from './detalle-administrar-impresoras.component';
import { configureTestSuite } from '../../../core/mocks/testing';
import { TestModule } from '../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Resources } from '../../../../locale/artifacts/resources';

describe('DetalleAdministrarImpresorasComponent', () => {
  let component: DetalleAdministrarImpresorasComponent;
  let fixture: ComponentFixture<DetalleAdministrarImpresorasComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleAdministrarImpresorasComponent ],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleAdministrarImpresorasComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('La propiedad detalleDeshabilitado', () => {
    beforeEach(() => {
      component.form = new FormGroup({});
    });

    it('retorna true si el status del form es "DISABLED"', () => {
      component.form.disable();

      expect(component.detalleDeshabilitado).toBe(true);
    });

    it('retorna false si el status del form no es "DISABLED"', () => {
      expect(component.detalleDeshabilitado).toBe(false);
    });
  });

  describe('El metodo setFocus()', () => {
    beforeEach(() => {
      component.nombre.setFocus = jasmine.createSpy('setFocus');
    });

    it('invoca al metodo setFocus() del nombre', fakeAsync(() => {
      component.setFocus();
      tick(3);
      expect(component.nombre.setFocus).toHaveBeenCalled();
    }));
  });

  describe('La propiedad validationMessagesNombre', () => {
    it('devuelve el string correcto', () => {
      expect(component.validationMessagesNombre.required).toBe(Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Nombre));
    });
  });

  describe('La propiedad validationMessagesTerminale', () => {
    it('devuelve el string correcto', () => {
      expect(component.validationMessagesTerminal.required).toBe(Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Terminal));
    });
  });

  describe('La propiedad validationMessagesUncPath', () => {
    it('devuelve el string correcto', () => {
      expect(component.validationMessagesUncPath.required).toBe(Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.UncPath));
    });
  });
});
