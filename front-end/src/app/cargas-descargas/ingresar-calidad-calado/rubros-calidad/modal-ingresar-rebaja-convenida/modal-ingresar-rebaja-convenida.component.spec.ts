import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalIngresarRebajaConvenidaComponent } from './modal-ingresar-rebaja-convenida.component';
import { TestModule } from '../../../../core/mocks/test.module';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { HotkeyModule } from 'angular2-hotkeys';
import { NO_ERRORS_SCHEMA, ElementRef } from '@angular/core';
import { configureTestSuite } from '../../../../core/mocks/testing';

describe('ModalIngresarRebajaConvenidaComponent', () => {
  let component: ModalIngresarRebajaConvenidaComponent;
  let fixture: ComponentFixture<ModalIngresarRebajaConvenidaComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        ModalIngresarRebajaConvenidaComponent,
       ],
      imports: [
        TestModule,
        ReactiveFormsModule,
        HotkeyModule.forRoot(),
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalIngresarRebajaConvenidaComponent);
    component = fixture.componentInstance;

    component.modal.close = jasmine.createSpy('close');
    component.modal.open = jasmine.createSpy('open');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('El metodo onAccept', () => {

    beforeEach(() => {
      spyOn<any>(component, 'validateForm').and.returnValue(true);
      spyOn<any>(component, 'getRubroModificado').and.returnValue({});
      spyOn<any>(component, 'setRebajaConvenida');
    });

    it('emite accepted cuando el form es valido', () => {
      // Arrange
      spyOn(component.accepted, 'emit');

      // Act
      component.onAccept();

      // Assert
      expect(component.accepted.emit).toHaveBeenCalledTimes(1);
    });

    it('invoca a close del modal cuando el from es valido', () => {
      // Arrange

      // Act
      component.onAccept();

      // Assert
      expect(component.modal.close).toHaveBeenCalledTimes(1);
    });
  });

  describe('El metodo ngOnInit', () => {
    it('crea el formulario', () => {
      // Arrange

      // Act
      component.ngOnInit();

      // Assert
      expect(component.rebajaConvenidaForm).not.toBeNull();
    });
  });

  describe('El metodo open', () => {

    beforeEach(() => {
      spyOn<any>(component, 'subscribeToRubroChanges');
      spyOn<any>(component, 'setDefaultValue');
      spyOn(component, 'setFocus');
    });

    it('invoca al open del modal', () => {
      // Arrange

      // Act
      component.open();

      // Assert
      expect(component.modal.open).toHaveBeenCalled();
    });

    it('invoca al subscribeToRubroChanges', () => {
      // Arrange

      // Act
      component.open();

      // Assert
      expect(component['subscribeToRubroChanges']).toHaveBeenCalled();
    });

    it('invoca al setDefaultValue', () => {
      // Arrange

      // Act
      component.open();

      // Assert
      expect(component['setDefaultValue']).toHaveBeenCalled();
    });

    it('invoca al setFocus', () => {
      // Arrange

      // Act
      component.open();

      // Assert
      expect(component['setFocus']).toHaveBeenCalled();
    });

  });

  describe('El metodo setFocus', () => {

    beforeEach(() => {
      const nativeElement = { focus: jasmine.createSpy('focus') };
      component.element = { nativeElement: nativeElement } as ElementRef<any>;
    });

    it('invoca al metodo focus del nativeElement cuando el element no es nulo', () => {
      // Arrange
      jasmine.clock().install();

      // Act
      component.setFocus();

      // Assert
      jasmine.clock().tick(250);
      expect(component.element.nativeElement.focus).toHaveBeenCalled();
      jasmine.clock().uninstall();
    });
  });

  describe('El metodo onClosing', () => {
    it('invoca al rest del form', () => {
      // Arrange
      spyOn(component.rebajaConvenidaForm, 'reset');

      // Act
      component.onClosing();

      // Assert
      expect(component.rebajaConvenidaForm.reset).toHaveBeenCalled();
    });
  });

  describe('El metodo getRubroModificado', () => {
    it('devuelve el control del rubro que corresponde con el rubro del formulario', () => {
      // Arrange
      const esperado = new FormGroup({id: new FormControl(1)});
      component.rubrosCalidad = [esperado];
      component.rebajaConvenidaForm.patchValue({rubro: 1});

      // Act
      const resultado = component['getRubroModificado']();

      // Assert
      expect(resultado).toBe(esperado);
    });
  });

  describe('El metodo setDefaultValue', () => {
    it('setea por defecto el primer rubro calidad', () => {
      // Arrange
      component.rubrosCalidad = [new FormGroup({id: new FormControl(1)})];
      const control = new FormControl();
      spyOn(component.rebajaConvenidaForm, 'get').and.returnValue(control);
      spyOn(control, 'setValue');

      // Act
      component['setDefaultValue']();

      // Assert
      expect(control.setValue).toHaveBeenCalled();
      expect(control.setValue).toHaveBeenCalledWith(1);
    });
  });

  describe('El metodo setRebajaConvenida', () => {
    it('setea la rebaja convenida al rubro en negativo si el valor era positivo', () => {
      // Arrange
      const porcentajeRebajaConvenida = new FormControl();
      spyOn(porcentajeRebajaConvenida, 'setValue');
      const rubro = new FormGroup({porcentajeRebajaConvenida: porcentajeRebajaConvenida});
      component.rebajaConvenidaForm.patchValue({porcentajeRebajaConvenida: 10});

      // Act
      component['setRebajaConvenida'](rubro);

      // Assert
      expect(porcentajeRebajaConvenida.setValue).toHaveBeenCalledWith(-10);
    });

    it('setea la rebaja convenida al rubro en negativo si el valor era negativo', () => {
      // Arrange
      const porcentajeRebajaConvenida = new FormControl();
      spyOn(porcentajeRebajaConvenida, 'setValue');
      const rubro = new FormGroup({porcentajeRebajaConvenida: porcentajeRebajaConvenida});
      component.rebajaConvenidaForm.patchValue({porcentajeRebajaConvenida: -10});

      // Act
      component['setRebajaConvenida'](rubro);

      // Assert
      expect(porcentajeRebajaConvenida.setValue).toHaveBeenCalledWith(-10);
    });
  });

  describe('El metodo subscribeToRubroChanges', () => {
    let valorControl;
    let rebajaConvenidaControl;

    beforeEach(() => {
      valorControl = new FormControl();
      rebajaConvenidaControl = new FormControl();
      spyOn(component.rebajaConvenidaForm, 'get').and.callFake((token: string | string[]) => {
        if (token === 'valor' || token[0] === 'valor') {
          return valorControl;
        } else if (token === 'porcentajeRebajaConvenida' || token[0] === 'porcentajeRebajaConvenida') {
          return rebajaConvenidaControl;
        } else {
          return new FormControl();
        }
      });
      component.rubrosCalidad = [new FormGroup({
        id: new FormControl(10),
        valorMedido: new FormControl(100),
        porcentajeRebajaConvenida: new FormControl(11)
      })];

    });

    it('setea el valor del rubro seleccionado', () => {
      // Arrange
      spyOn(valorControl, 'setValue');

      // Act
      component['subscribeToRubroChanges']();
      component.rebajaConvenidaForm.patchValue({rubro: 10});

      // Assert
      expect(valorControl.setValue).toHaveBeenCalledWith(100);
    });

    it('setea la reabaja convenida con el valor del form si es positivo', () => {
      // Arrange
      spyOn(rebajaConvenidaControl, 'setValue');

      // Act
      component['subscribeToRubroChanges']();
      component.rebajaConvenidaForm.patchValue({rubro: 10});

      // Assert
      expect(rebajaConvenidaControl.setValue).toHaveBeenCalledWith('11');
    });

    it('setea la reabaja convenida con el valor positivo del form si es negativo', () => {
      // Arrange
      component.rubrosCalidad = [new FormGroup({
        id: new FormControl(10),
        valorMedido: new FormControl(100),
        porcentajeRebajaConvenida: new FormControl(-11)
      })];
      spyOn(rebajaConvenidaControl, 'setValue');

      // Act
      component['subscribeToRubroChanges']();
      component.rebajaConvenidaForm.patchValue({rubro: 10});

      // Assert
      expect(rebajaConvenidaControl.setValue).toHaveBeenCalledWith('11');
    });
  });

});
