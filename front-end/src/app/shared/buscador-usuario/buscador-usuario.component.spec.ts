import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorUsuarioComponent } from './buscador-usuario.component';
import { TestModule } from '../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { configureTestSuite } from '../../core/mocks/testing';
import { UsuarioService } from './usuario.service';

describe('BuscadorUsuarioComponent', () => {
  let component: BuscadorUsuarioComponent;
  let fixture: ComponentFixture<BuscadorUsuarioComponent>;
  let fakeUsuarioService;


  configureTestSuite(() => {
    fakeUsuarioService = jasmine.createSpyObj('UsuarioService', ['getByNombreUsuario']);
    TestBed.configureTestingModule({
      declarations: [BuscadorUsuarioComponent],
      imports: [TestModule],
      providers: [{ provide: UsuarioService, useValue: fakeUsuarioService }],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorUsuarioComponent);
    component = fixture.componentInstance;

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
      expect(spiedFunction).toHaveBeenCalledTimes(1);

    });

    it('Inicializa correctamente advancedSearchForm', () => {

      // arrange
      console.log(component.advancedSearchForm);

      // act
      component.ngOnInit();

      // assert
      expect(component.advancedSearchForm).toBeTruthy();
    });

  });

});
