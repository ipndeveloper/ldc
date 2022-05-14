import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorLocalidadComponent } from './buscador-localidad.component';
import { LocalidadService } from './localidad.service';
import { TestModule } from '../../core/mocks/test.module';
import { configureTestSuite } from '../../core/mocks/testing';
import { FormBuilder } from '@angular/forms';
import { PopupService } from '../../core/services/popupService/popup.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('BuscadorLocalidadComponent', () => {
  let component: BuscadorLocalidadComponent;
  let fixture: ComponentFixture<BuscadorLocalidadComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [BuscadorLocalidadComponent],
      imports: [TestModule],
      providers: [
        PopupService,
        FormBuilder,
        LocalidadService],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorLocalidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Test del onInit', () => {

    it('inicializa columnas', () => {
      // arrange
      component.columns = null;

      // act
      component.ngOnInit();

      // assert
      expect(!!component.columns).toBeTruthy();
    });

    it('Llama al metodo subscribeToAdvancedSearchFormChanges', () => {

      // arrange
      const spiedFunction = spyOn<any>(component, 'subscribeToAdvancedSearchFormChanges');

      // act
      component.ngOnInit();

      // assert
      expect(spiedFunction).toHaveBeenCalledTimes(2);

    });

    it('Inicializa correctamente advancedSearchForm', () => {

      // arrange
      component.advancedSearchForm.controls = {};

      // act
      component.ngOnInit();

      // assert
      expect(Object.keys(component.advancedSearchForm.controls).length === 0).toBeFalsy();
    });

    it('setea baseElement segun inputElement', () => {

      // act
      component.ngOnInit();

      // assert
      expect(component.baseElement).toEqual(component.inputElement);
    });

  });

});
