import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CorredorService } from './corredor.service';
import { BuscadorCorredorComponent } from './buscador-corredor.component';
import { TestModule } from '../../core/mocks/test.module';
import { PopupService } from '../../core/services/popupService/popup.service';
import { configureTestSuite } from '../../core/mocks/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
// import { HttpErrorResponse } from '@angular/common/http';
// import { of } from 'rxjs';
// import { ValidableControl } from '../../core/shared/super/validable-control.component';
import { Corredor } from '../data-models/corredor';

describe('BuscadorCorredorCompradorComponent', () => {
  let component: BuscadorCorredorComponent;
  let fixture: ComponentFixture<BuscadorCorredorComponent>;
  let popUpService: any;

  configureTestSuite(() => {
    popUpService = jasmine.createSpyObj('PopupService', ['warning', 'error']);
    TestBed.configureTestingModule({
      declarations: [BuscadorCorredorComponent],
      imports: [TestModule],
      providers: [
        CorredorService,
        { provide: PopupService, useValue: popUpService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorCorredorComponent);
    component = fixture.componentInstance;
    popUpService.warning.calls.reset();
    popUpService.error.calls.reset();
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

    it('setea filters segun rol', () => {

      // act
      component.ngOnInit();

      // assert
      expect(component.filters['rol']).toEqual(component.rol);
    });

  });

  describe('Test del metodo setCurrentEntity', () => {

    it('Setea una nueva instancia de entity actual el codigo y el codigoAnterior', () => {

      // act
      component.setCurrentEntity(new Corredor(1, 'TEST', 'sinNd', 'sinNd', 1));

      // assert
      expect(!!component.currentEntity).toBeTruthy();

    });

    it('Setea el valor del Elemento HTML con el codigo del titular', () => {

      // act
      component.setCurrentEntity(new Corredor(1, 'TEST', 'sinNd', 'sinNd', 1));

      // assert
      expect(component.baseElement.nativeElement.value).toEqual('TEST');

    });

    it('Setea codigo y el codigoAnterior', () => {

      // act
      component.setCurrentEntity(new Corredor(1, 'TEST', 'sinNd', 'sinNd', 1));

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

    it('Ejecuta pop-up si existe mensaje de error oncca ', () => {

      // arrange
      const corredor: Corredor = new Corredor(1, 'TEST', 'sinNd', 'sinNd', 1);
      corredor.mensajeErrorOncca = 'error Oncca';

      // act
      component.setCurrentEntity(corredor);

      // assert
      expect(popUpService.warning).toHaveBeenCalledTimes(1);

    });
  });
  //#region Test a reparar
  // // TODO terminar test de buscar
  // describe('Test del metodo buscar', () => {
  //   ValidableControl.prototype.onTouched = jasmine.createSpy('onTouched');
  //   describe('Test sin exepcion', () => {

  //     it('Ejecura el metodo SetcurrenteEntity', () => {

  //       // arrange
  //       const spiedFunctionn = spyOn<any>(component, 'setCurrentEntity');
  //       spyOn<any>(component, 'callServiceByCode').and.returnValue(of([]));

  //       // act
  //       component.buscar('TEST 1');

  //       // assert
  //       expect(spiedFunctionn).toHaveBeenCalledTimes(1);
  //     });

  //     it('Ejecura el metodo notifyChange', () => {

  //       // arrange
  //       spyOn<any>(component, 'callServiceByCode').and.returnValue(of([]));
  //       const spiedFunctionn = spyOn<any>(component, 'notifyChange');


  //       // act
  //       component.buscar('TEST 2');

  //       // assert
  //       expect(spiedFunctionn).toHaveBeenCalledTimes(1);
  //     });

  //     it('Ejecura el metodo clear', () => {

  //       // arrange
  //       const spiedFunctionn = spyOn<any>(component, 'clear');

  //       // act
  //       component.buscar('');

  //       // assert
  //       expect(spiedFunctionn).toHaveBeenCalledTimes(1);
  //     });

  //   });

  //   // TODO Arreglar testeo con exepcion
  //   // xdescribe('Test con exepcion', () => {
  //   //   it('Ejecura el metodo SetcurrenteEntity si el status code es 404', () => {

  //   //     // arrange
  //   //     const err = new HttpErrorResponse({ status: 404, statusText: 'Not Found' });
  //   //     spyOn<any>(component, 'callServiceByCode').and.returnValue(throwError(err));
  //   //     const spiedFunction = spyOn<any>(component, 'setCurrentEntity');
  //   //     spyOn<any>(component, 'notifyChange').and.callFake(() => { });

  //   //     // act
  //   //     component.buscar('TEST 2');

  //   //     // assert
  //   //     expect(spiedFunction).toHaveBeenCalledTimes(1);
  //   //     expect(component.buscar).toThrowError();

  //   //   });

  //   //   it('No ejecura el metodo SetcurrenteEntity si el status code no es 404', () => {

  //   //     // arrange
  //   //     const err = new HttpErrorResponse({ status: 555, statusText: 'Not Found' });
  //   //     spyOn<any>(component, 'callServiceByCode').and.returnValue(throwError(err));
  //   //     const spiedFunction = spyOn<any>(component, 'setCurrentEntity').and.callFake(() => { });

  //   //     // act
  //   //     component.buscar('TEST 3');

  //   //     // assert
  //   //     expect(spiedFunction).toHaveBeenCalledTimes(0);
  //   //     expect(component.buscar).toThrowError();

  //   //   });

  //   //   it('Ejecuta un mensaje error del popUp service si el status code es 404', () => {

  //   //     // arrange
  //   //     const err = new HttpErrorResponse({ status: 404, statusText: 'Not Found' });
  //   //     spyOn<any>(component, 'callServiceByCode').and.returnValue(throwError(err));
  //   //     spyOn<any>(component, 'setCurrentEntity').and.callFake(() => { });
  //   //     spyOn<any>(component, 'notifyChange');


  //   //     // act
  //   //     component.buscar('TEST 4');

  //   //     // assert
  //   //     expect(popUpService.error).toHaveBeenCalledTimes(1);
  //   //     expect(component.buscar).toThrowError();

  //   //   });
  //   //   it('No ejecuta un mensaje error del popUp service si el status code no es 404', () => {

  //   //     // arrange
  //   //     const err = new HttpErrorResponse({ status: 555, statusText: 'Not Found' });
  //   //     spyOn<any>(component, 'callServiceByCode').and.returnValue(throwError(err));
  //   //     spyOn<any>(component, 'setCurrentEntity').and.callFake(() => { });

  //   //     // act
  //   //     component.buscar('TEST 5');

  //   //     // assert
  //   //     expect(popUpService.error).toHaveBeenCalledTimes(0);
  //   //     expect(component.buscar).toThrowError();

  //   //   });
  //   //   it('Ejecuta notifyChange si el status code no es 404', () => {

  //   //     // arrange
  //   //     const err = new HttpErrorResponse({ status: 404, statusText: 'Not Found' });
  //   //     spyOn<any>(component, 'callServiceByCode').and.returnValue(throwError(err));
  //   //     spyOn<any>(component, 'setCurrentEntity').and.callFake(() => { });
  //   //     const notifyChangeSpy = spyOn<any>(component, 'notifyChange');


  //   //     // act
  //   //     component.buscar('TEST 6');

  //   //     // assert
  //   //     expect(notifyChangeSpy).toHaveBeenCalledTimes(1);
  //   //     expect(component.buscar).toThrowError();

  //   //   });
  //   //   it('No ejecuta notifyChange si el status code no es 404', () => {

  //   //     // arrange
  //   //     const err = new HttpErrorResponse({ status: 555, statusText: 'Not Found' });
  //   //     spyOn<any>(component, 'callServiceByCode').and.returnValue(throwError(err));
  //   //     spyOn<any>(component, 'setCurrentEntity').and.callFake(() => { });
  //   //     const notifyChangeSpy = spyOn<any>(component, 'notifyChange').and.callFake(() => { });


  //   //     // act
  //   //     component.buscar('TEST 7');

  //   //     // assert
  //   //     expect(notifyChangeSpy).toHaveBeenCalledTimes(0);
  //   //     expect(component.buscar).toThrowError();


  //   //   });
  //   // });


  // });
  //#endregion

});
