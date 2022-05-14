import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FiltroChecklistControlPatrimonialComponent } from './filtro-checklist-control-patrimonial.component';
import { configureTestSuite } from '../../../core/mocks/testing';
import { TestModule } from '../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormGroup } from '@angular/forms';

describe('FiltroChecklistControlPatrimonialComponent', () => {
  let component: FiltroChecklistControlPatrimonialComponent;
  let fixture: ComponentFixture<FiltroChecklistControlPatrimonialComponent>;
  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroChecklistControlPatrimonialComponent ],
      imports: [ TestModule, ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroChecklistControlPatrimonialComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('El método onClickBuscar', () => {
    it('Emite el evento de búsqueda cuando el formulario es válido', () => {
      // Arrange
      const fcService = { isValidForm: () => true };
      (component as any).fcService = fcService;
      spyOn(component.buscarClicked, 'emit');
      spyOn<any>(component, 'setFocus');


      // Act
      component.onClickBuscar();

      // Assert
      expect(component.buscarClicked.emit).toHaveBeenCalledTimes(1);
    });

    it('Muestra los mensajes de error cuando es formulario es inválido', () => {
      // Arrange
      const form = { controls: {} };
      const fcService = { isValidForm: () => false,
                          showValidationError: jasmine.createSpy('showValidationError'),
                          validateForm: () => {} };
      (component as any).fcService = fcService;
      component.form = form as FormGroup;
      spyOn<any>(component, 'setFocus');


      // Act
      component.onClickBuscar();

      // Assert
      expect(fcService.showValidationError).toHaveBeenCalledTimes(1);
    });
  });

});
