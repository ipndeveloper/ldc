import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ModalImportarExcelComponent } from './modal-importar-excel.component';
import { TestModule } from '../../../core/mocks/test.module';
import { configureTestSuite } from '../../../core/mocks/testing';
import { PopupService } from '../../../core/services/popupService/popup.service';
import { FormGroup, Validators } from '@angular/forms';

describe('ModalImportarExcelComponent', () => {
  let component: ModalImportarExcelComponent;
  let fixture: ComponentFixture<ModalImportarExcelComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalImportarExcelComponent ],
      imports: [TestModule],
      providers: [PopupService],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalImportarExcelComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup({});
    component.form.controls = jasmine.createSpyObj('AbstractControl', ['archivos']);
    component.form.controls.archivos.updateValueAndValidity = jasmine.createSpy('updateValueAndValidity');
    component.accepted.emit = jasmine.createSpy('emit');
    spyOn<any>(component['fcService'], 'initialize');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('El metodo onAccept()', () => {
    beforeEach(() => {
      spyOn<any>(component['fcService'], 'validateForm');
      spyOn<any>(component['fcService'], 'showValidationError');
    });

    it('ejecuta metodos de fcService y el form es valido', () => {
      spyOn<any>(component['fcService'], 'isValidForm').and.returnValue(true);

      component.onAccept();

      expect(component['fcService'].initialize).toHaveBeenCalledWith(component.form);
      expect(component['fcService'].validateForm).toHaveBeenCalled();
      expect(component['fcService'].showValidationError).toHaveBeenCalled();
      expect(component['fcService'].isValidForm).toHaveBeenCalled();
      expect(component.accepted.emit).toHaveBeenCalled();
    });

    it('ejecuta metodos de fcService y el form es invalido', () => {
      spyOn<any>(component['fcService'], 'isValidForm').and.returnValue(false);

      component.onAccept();

      expect(component['fcService'].initialize).toHaveBeenCalledWith(component.form);
      expect(component['fcService'].validateForm).toHaveBeenCalled();
      expect(component['fcService'].showValidationError).toHaveBeenCalled();
      expect(component['fcService'].isValidForm).toHaveBeenCalled();
      expect(component.accepted.emit).not.toHaveBeenCalled();
    });
  });

  describe('El metodo onClosing()', () => {
    it('accede a metodos del form del componente satisfactoriamente', () => {
      component.form.controls.archivos.clearValidators = jasmine.createSpy('clearValidators');
      component.form.reset = jasmine.createSpy('reset');
      component.closing.emit = jasmine.createSpy('emit');

      component.onClosing();

      expect(component.form.controls.archivos.clearValidators).toHaveBeenCalled();
      expect(component.form.controls.archivos.updateValueAndValidity).toHaveBeenCalled();
      expect(component.form.reset).toHaveBeenCalled();
      expect(component.closing.emit).toHaveBeenCalled();
    });
  });

  describe('El metodo open()', () => {
    it('invoca al metodo initialice del fcService y a metodos del form del componente', () => {
      component.modal.open = jasmine.createSpy('open');
      component.form.controls.archivos.setValidators = jasmine.createSpy('setValidators');

      component.open();

      expect(component['fcService'].initialize).toHaveBeenCalled();
      expect(component.modal.open).toHaveBeenCalled();
      expect(component.form.controls.archivos.setValidators).toHaveBeenCalledWith([Validators.required]);
      expect(component.form.controls.archivos.updateValueAndValidity).toHaveBeenCalled();
    });
  });

  describe('El metodo close()', () => {
    it('invoca al metodo close() del modal', () => {
      component.modal.close = jasmine.createSpy('close');

      component.close();

      expect(component.modal.close).toHaveBeenCalled();
    });
  });
});
