import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorEntregadorComponent } from './buscador-entregador.component';
import { EntregadorService } from './entregador.service';
import { TestModule } from '../../core/mocks/test.module';
import { PopupService } from '../../core/services/popupService/popup.service';
import { configureTestSuite } from '../../core/mocks/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Entregador } from '../data-models/entregador';

describe('BuscadorEntregadorComponent', () => {
  let component: BuscadorEntregadorComponent;
  let fixture: ComponentFixture<BuscadorEntregadorComponent>;
  let popUpService: any;

  configureTestSuite(() => {
    popUpService = jasmine.createSpyObj('PopupService', ['warning', 'error']);
    TestBed.configureTestingModule({
      declarations: [BuscadorEntregadorComponent],
      imports: [TestModule],
      providers: [
        { provide: PopupService, useValue: popUpService },
        EntregadorService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorEntregadorComponent);
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
      component.setCurrentEntity(new Entregador(1, 'TEST', 'sinNd', 'sinNd', 1));

      // assert
      expect(!!component.currentEntity).toBeTruthy();

    });

    it('Setea codigo y el codigoAnterior', () => {

      // act
      component.setCurrentEntity(new Entregador(1, 'TEST', 'sinNd', 'sinNd', 1));

      // assert
      expect(!!component.codigo && !!component.codigoAnterior).toBeTruthy();

    });

    it('Ejecuta limpiarCodigo() si el Entregador es undefined', () => {

      // arrange
      const spiedFunction = spyOn<any>(component, 'limpiarCodigo');

      // act
      component.setCurrentEntity(undefined);

      // assert
      expect(spiedFunction.calls.any()).toBeTruthy();

    });

    it('Ejecuta pop-up si existe mensaje de error oncca', () => {

      // arrange
      const entregador: Entregador = new Entregador(1, 'TEST', 'sinNd', 'sinNd', 1);
      entregador.mensajeErrorOncca = 'error Oncca';
      // act
      component.setCurrentEntity(entregador);

      // assert
      expect(popUpService.warning).toHaveBeenCalled();

    });

  });

});
