import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgregarImpresoraComponent } from './modal-agregar-impresora.component';
import { configureTestSuite } from '../../../../core/mocks/testing';
import { TestModule } from '../../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ApiService } from '../../../../core/services/restClient/api.service';
import { of } from 'rxjs';
import { FormComponentService } from '../../../../core/services/formComponent/formComponent.service';
import { ImpresoraUsuarioDataView } from '../../../../shared/data-models/usuario-data-view';

describe('ModalAgregarImpresoraComponent', () => {
  let component: ModalAgregarImpresoraComponent;
  let fixture: ComponentFixture<ModalAgregarImpresoraComponent>;
  let formComponentService: any;

  configureTestSuite(() => {
    formComponentService = jasmine.createSpyObj('FormComponentService', ['initialize', 'setValue', 'enableControl', 'validateForm', 'showValidationError', 'isValidForm']);
    TestBed.configureTestingModule({
      declarations: [ModalAgregarImpresoraComponent],
      providers: [{ provide: FormComponentService, useValue: formComponentService }],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAgregarImpresoraComponent);
    component = fixture.componentInstance;

    const apiService = fixture.debugElement.injector.get(ApiService);
    spyOn(apiService, 'get').and.returnValue(of([{} as any]));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Test metodo open', () => {


    beforeEach(() => {
      spyOn<any>(component['fcService'], 'setValue');
      spyOn<any>(component['fcService'], 'enableControl');
      spyOn<any>(component['fcService'], 'initialize');
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
    it('Llama al metodo setValuev sin tener definida impresoraUsuario', () => {

      // arrange

      // act
      component.open();

      // assert
      expect(component['fcService'].setValue).toHaveBeenCalledTimes(2);

    });

    it('Llama al metodo enableControl sin tener definida impresoraUsuario', () => {

      // arrange

      // act
      component.open();

      // assert
      expect(component['fcService'].enableControl).toHaveBeenCalledTimes(1);

    });
    it('Llama al metodo initialize', () => {

      // arrange

      // act
      component.open();

      // assert
      expect(component['fcService'].initialize).toHaveBeenCalledTimes(1);

    });

    it('Llama al metodo setValue definida impresoraUsuario', () => {

      // arrange
      component['impresoraUsuario'] = jasmine.createSpyObj('ImpresoraUsuarioDataView', ['']);

      // act
      component.open();

      // assert
      expect(component['fcService'].setValue).toHaveBeenCalledTimes(3);

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
      spyOn<any>(component['fcService'], 'validateForm').and.callFake(() => true);
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
      spyOn<any>(component['fcService'], 'isValidForm').and.callFake(() => false);

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

  describe('Test del metodo onClosing', () => {

    beforeEach(() => {
      spyOn<any>(component, 'updateValidators').calls.reset();
      component.form = jasmine.createSpyObj('FormGroup', ['reset', 'valid']);
      spyOn<any>(component.closing, 'emit').calls.reset();
    });

    it('RolTerminal debe ser null', () => {

      // arrange
      component['impresoraUsuario'] = jasmine.createSpyObj('ImpresoraUsuarioDataView', ['']);

      // act
      component.onClosing();

      // assert
      expect(component['impresoraUsuario']).toBeNull();
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

  describe('Test del emtodo modificar', () => {

    it('Valida la correcta asignacion de rol Terminal', () => {

      // arrange
      const impresoraMock = new ImpresoraUsuarioDataView();
      impresoraMock.id = 88;
      spyOn<any>(component, 'open');

      // act
      component.modificar(impresoraMock);

      // assert
      expect(component['impresoraUsuario']).toBe(impresoraMock);
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
      component.modal = jasmine.createSpyObj('ModalComponent', ['open']);
      //#endregion

      component.form = jasmine.createSpyObj('FormGroup', ['controls', 'reset']);
      component.form.controls = jasmine.createSpyObj('AbstractControl', ['impresora']);
      component.form.controls.impresora = jasmine.createSpyObj('AbstractControl', ['setValidators']);

      // act
      component.open();

      // assert
      expect(component.form.controls.impresora.setValidators).toHaveBeenCalledTimes(1);
    });

    it('Llama al metodo clearValidators cuando el campo es requerido', () => {

      // arrange
      component.form = jasmine.createSpyObj('FormGroup', ['controls', 'reset']);
      component.form.controls = jasmine.createSpyObj('AbstractControl', ['impresora']);
      component.form.controls.impresora = jasmine.createSpyObj('AbstractControl', ['clearValidators']);

      // act
      component.onClosing();

      // assert
      expect(component.form.controls.impresora.clearValidators).toHaveBeenCalledTimes(1);
    });

  });

});
