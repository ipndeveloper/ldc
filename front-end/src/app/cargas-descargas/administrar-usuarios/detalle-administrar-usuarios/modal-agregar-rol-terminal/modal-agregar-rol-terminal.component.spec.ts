import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgregarRolTerminalComponent } from './modal-agregar-rol-terminal.component';
import { TestModule } from '../../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { configureTestSuite } from '../../../../core/mocks/testing';
import { ApiService } from '../../../../core/services/restClient/api.service';
import { of } from 'rxjs';
import { RolTerminalDataView } from '../../../../shared/data-models/usuario-data-view';
import { FormComponentService } from '../../../../core/services/formComponent/formComponent.service';

describe('ModalAgregarRolTerminalComponent', () => {
  let component: ModalAgregarRolTerminalComponent;
  let fixture: ComponentFixture<ModalAgregarRolTerminalComponent>;
  let formComponentService: any;

  configureTestSuite(() => {

    formComponentService = jasmine.createSpyObj('FormComponentService', ['initialize', 'setValue', 'enableControl', 'validateForm', 'showValidationError', 'isValidForm']);
    TestBed.configureTestingModule({
      declarations: [ModalAgregarRolTerminalComponent],
      providers: [{ provide: FormComponentService, useValue: formComponentService }],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAgregarRolTerminalComponent);
    component = fixture.componentInstance;

    const apiService = fixture.debugElement.injector.get(ApiService);
    spyOn(apiService, 'get').and.returnValue(of([{} as any]));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Test del emtodo modificar', () => {

    it('Valida la correcta asignacion de rol Terminal', () => {

      // arrange
      const rolTerminalMock = new RolTerminalDataView();
      rolTerminalMock.id = 88;
      spyOn<any>(component, 'open');

      // act
      component.modificar(rolTerminalMock);

      // assert
      expect(component['rolTerminal']).toBe(rolTerminalMock);
    });

    it('Ejecuta metodo open', () => {

      // arrange
      const rolTerminalMock = jasmine.createSpyObj('RolTerminalDataView', ['']);
      const openSpy = spyOn<any>(component, 'open');
      openSpy.calls.reset();

      // act
      component.modificar(rolTerminalMock);

      // assert
      expect(openSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Test del metodo onClosing', () => {

    beforeEach(() => {
      spyOn<any>(component, 'updateValidators').calls.reset();
      component.form = jasmine.createSpyObj('FormGroup', ['reset']);
      spyOn<any>(component.closing, 'emit').calls.reset();
    });

    it('RolTerminal debe ser null', () => {

      // arrange
      component['rolTerminal'] = jasmine.createSpyObj('RolTerminalDataView', ['']);

      // act
      component.onClosing();

      // assert
      expect(component['rolTerminal']).toBeNull();
    });

    it('Llama al metodo reset del form', () => {

      // arrange
      // act
      component.onClosing();

      // assert
      expect(component.form.reset).toHaveBeenCalledTimes(1);
    });

    it('Llama al metodo emit del clisign', () => {

      // arrange
      // act
      component.onClosing();

      // assert
      expect(component.closing.emit).toHaveBeenCalledTimes(1);
    });

    it('Llama al metodo emit del updateValidators', () => {

      // arrange
      // act
      component.onClosing();

      // assert
      expect(component['updateValidators']).toHaveBeenCalledTimes(1);
    });

  });

  describe('Test metodo close', () => {

    beforeEach(() => {
      spyOn<any>(component, 'updateValidators').calls.reset();
      component.modal = jasmine.createSpyObj('ModalComponent', ['close']);
    });

    it('Llama al metodo emit del updateValidators', () => {

      // arrange
      // act
      component.close();

      // assert
      expect(component['updateValidators']).toHaveBeenCalledTimes(1);
    });

    it('Llama al metodo emit del updateValidators', () => {

      // arrange
      // act
      component.close();

      // assert
      expect(component.modal.close).toHaveBeenCalledTimes(1);
    });
  });

  describe('Test metodo open', () => {


    beforeEach(() => {

      spyOn<any>(component['fcService'], 'setValue');
      spyOn<any>(component['fcService'], 'enableControl');
      spyOn<any>(component['fcService'], 'initialize');

      component.terminal = jasmine.createSpyObj('DesplegableTerminalComponent', ['setFocus']);
      spyOn<any>(component, 'updateValidators').calls.reset();
      component.modal = jasmine.createSpyObj('ModalComponent', ['open']);

    });

    it('Llama al metodo updateValidator', () => {

      // arrange

      // act
      component.open();

      // assert
      expect(component['updateValidators']).toHaveBeenCalledTimes(1);

    });
    it('Llama al metodo setValuev sin tener definido Rol Terminal', () => {

      // arrange

      // act
      component.open();

      // assert
      expect(component['fcService'].setValue).toHaveBeenCalledTimes(2);

    });

    it('Llama al metodo enableControl sin tener definido Rol Terminal', () => {

      // arrange

      // act
      component.open();

      // assert
      expect(component['fcService'].enableControl).toHaveBeenCalledTimes(2);

    });
    it('Llama al metodo initialize', () => {

      // arrange

      // act
      component.open();

      // assert
      expect(component['fcService'].initialize).toHaveBeenCalledTimes(1);

    });

    it('Llama al metodo enableControl definido Rol Terminal', () => {

      // arrange
      component['rolTerminal'] = jasmine.createSpyObj('RolTerminalDataView', ['']);

      // act
      component.open();

      // assert
      expect(component['fcService'].setValue).toHaveBeenCalledTimes(4);

    });
    it('Llama al metodo open del modal', () => {

      // arrange

      // act
      component.open();

      // assert
      expect(component.modal.open).toHaveBeenCalledTimes(1);

    });

  });

  describe('Test del metodo onAccept', () => {

    beforeEach(() => {
      component.form = jasmine.createSpyObj('FormGroup', ['controls', 'valid']);
      spyOn<any>(component['fcService'], 'showValidationError');
      spyOn<any>(component['fcService'], 'validateForm');

    });

    it('Ejecuta el metodo validateForm', () => {

      // arrange
      spyOn<any>(component['fcService'], 'isValidForm').and.callFake(() => false);

      // act
      component.onAccept();

      // assert
      expect(component['fcService'].validateForm).toHaveBeenCalledTimes(1);

    });

    it('Ejecuta el metodo showValidationError', () => {

      // arrange
      spyOn<any>(component['fcService'], 'isValidForm').and.callFake(() => true);

      // act
      component.onAccept();

      // assert
      expect(component['fcService'].showValidationError).toHaveBeenCalledTimes(1);

    });

    it('Ejecuta el metodo emit si el formulario es valido', () => {

      // arrange
      spyOn<any>(component['fcService'], 'isValidForm').and.callFake(() => true);
      spyOn<any>(component.accepted, 'emit');
      // act
      component.onAccept();

      // assert
      expect(component.accepted.emit).toHaveBeenCalledTimes(1);

    });
    it('No ejecuta el metodo emit si el formulario es valido', () => {

      // arrange
      spyOn<any>(component['fcService'], 'isValidForm').and.callFake(() => false);
      spyOn<any>(component.accepted, 'emit');
      // act
      component.onAccept();

      // assert
      expect(component.accepted.emit).toHaveBeenCalledTimes(0);

    });

  });


  describe('Test metodo updateValidators', () => {
    beforeEach(() => {
      component.form = jasmine.createSpyObj('FormGroup', ['terminal', 'rol']);
    });

    it('Llama al etodo Set validator cuando el campo es requerido', () => {

      // arrange
      //#region  Base del metodo open
      spyOn<any>(component['fcService'], 'setValue');
      spyOn<any>(component['fcService'], 'enableControl');
      spyOn<any>(component['fcService'], 'initialize');
      component.terminal = jasmine.createSpyObj('DesplegableTerminalComponent', ['setFocus']);
      component.modal = jasmine.createSpyObj('ModalComponent', ['open']);
      //#endregion

      component.form = jasmine.createSpyObj('FormGroup', ['controls', 'reset']);
      component.form.controls = jasmine.createSpyObj('AbstractControl', ['rol', 'termional']);
      component.form.controls.terminal = jasmine.createSpyObj('AbstractControl', ['setValidators']);
      component.form.controls.rol = jasmine.createSpyObj('AbstractControl', ['setValidators']);

      // act
      component.open();

      // assert
      expect(component.form.controls.rol.setValidators).toHaveBeenCalledTimes(1);
      expect(component.form.controls.terminal.setValidators).toHaveBeenCalledTimes(1);
    });

    it('Llama al etodo clearValidators cuando el campo no es requerido', () => {

      // arrange
      component.form = jasmine.createSpyObj('FormGroup', ['controls', 'reset']);
      component.form.controls = jasmine.createSpyObj('AbstractControl', ['rol', 'termional']);
      component.form.controls.terminal = jasmine.createSpyObj('AbstractControl', ['clearValidators']);
      component.form.controls.rol = jasmine.createSpyObj('AbstractControl', ['clearValidators']);

      // act
      component.onClosing();

      // assert
      expect(component.form.controls.rol.clearValidators).toHaveBeenCalledTimes(1);
      expect(component.form.controls.terminal.clearValidators).toHaveBeenCalledTimes(1);
    });

  });

});
