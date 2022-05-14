import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorSociedadComponent } from './buscador-sociedad.component';
import { configureTestSuite } from '../../core/mocks/testing';
import { TestModule } from '../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BuscadorSociedadService } from './buscador-sociedad.service';

describe('BuscadorSociedadComponent', () => {
  let component: BuscadorSociedadComponent;
  let fixture: ComponentFixture<BuscadorSociedadComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [BuscadorSociedadComponent],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [BuscadorSociedadService]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorSociedadComponent);
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
