import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorTitularComponent } from './buscador-titular.component';
import { TitularService } from './titular.service';
import { TestModule } from '../../core/mocks/test.module';
import { PopupService } from '../../core/services/popupService/popup.service';
import { configureTestSuite } from '../../core/mocks/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Titular } from '../data-models/titular';

describe('BuscadorTitularComponent', () => {

  let component: BuscadorTitularComponent;
  let fixture: ComponentFixture<BuscadorTitularComponent>;
  let fakePopUpService: any;

  configureTestSuite(() => {
    fakePopUpService = jasmine.createSpyObj('PopupService', ['warning']);
    TestBed.configureTestingModule({
      declarations: [BuscadorTitularComponent],
      imports: [TestModule],
      providers: [
        TitularService,
        { provide: PopupService, useValue: fakePopUpService },
        FormBuilder
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorTitularComponent);
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

  describe('Test del metodo setCurrentEntity', () => {

    it('Setea una nueva instancia de entity actual el codigo y el codigoAnterior', () => {

      // act
      component.setCurrentEntity(new Titular(1, 'TEST', 'sinNd', 1));

      // assert
      expect(!!component.currentEntity).toBeTruthy();

    });

    it('Setea el valor del Elemento HTML con el codigo del titular', () => {

      // act
      component.setCurrentEntity(new Titular(1, 'TEST', 'sinNd', 1));

      // assert
      expect(component.baseElement.nativeElement.value).toEqual('TEST');

    });

    it('Setea codigo y el codigoAnterior', () => {

      // act
      component.setCurrentEntity(new Titular(1, 'TEST', 'sinNd', 1));

      // assert
      expect(!!component.codigo && !!component.codigoAnterior).toBeTruthy();

    });

    it('Ejecuta limpiarCodigo() si el titular es undefined', () => {

      // arrange
      const spiedFunction = spyOn<any>(component, 'limpiarCodigo');

      // act
      component.setCurrentEntity(undefined);

      // assert
      expect(spiedFunction.calls.any()).toBeTruthy();

    });

    it('Ejecuta pop-up si existe mensaje de error oncca', () => {

      // arrange
      const titular: Titular = new Titular(1, 'TEST', 'sinNd', 1);
      titular.mensajeErrorOncca = 'error Oncca';
      // act
      component.setCurrentEntity(titular);

      // assert
      expect(fakePopUpService.warning).toHaveBeenCalled();

    });

  });

});
