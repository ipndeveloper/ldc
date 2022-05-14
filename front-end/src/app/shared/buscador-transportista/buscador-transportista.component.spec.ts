import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorTransportistaComponent } from './buscador-transportista.component';
import { TransportistaService } from './transportista.service';
import { TestModule } from '../../core/mocks/test.module';
import { configureTestSuite } from '../../core/mocks/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('BuscadorTransportistaComponent', () => {
  let component: BuscadorTransportistaComponent;
  let fixture: ComponentFixture<BuscadorTransportistaComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [BuscadorTransportistaComponent],
      imports: [TestModule],
      providers: [
        TransportistaService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorTransportistaComponent);
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
