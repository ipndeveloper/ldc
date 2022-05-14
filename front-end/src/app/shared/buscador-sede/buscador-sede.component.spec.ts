import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorSedeComponent } from './buscador-sede.component';
import { HotkeysService, HotkeyModule } from 'angular2-hotkeys';
import { TestModule } from '../../core/mocks/test.module';
import { configureTestSuite } from '../../core/mocks/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BuscadorSedeService } from './buscador-sede.service';
// import { HttpErrorResponse } from '@angular/common/http';
// import { of } from 'rxjs';
// import { ValidableControl } from '../../core/shared/super/validable-control.component';
import { PopupService } from '../../core/services/popupService/popup.service';

describe('BuscadorSedeComponent', () => {
  let component: BuscadorSedeComponent;
  let fixture: ComponentFixture<BuscadorSedeComponent>;
  let popUpService: any;
  let sedeService: any;

  configureTestSuite(() => {
    popUpService = jasmine.createSpyObj('PopupService', ['warning', 'error']);
    sedeService = jasmine.createSpyObj('BuscadorSedeService', ['getSede']);
    TestBed.configureTestingModule({
      declarations: [BuscadorSedeComponent],
      imports: [HotkeyModule.forRoot(), TestModule],
      providers: [
        { provide: BuscadorSedeService, useValue: sedeService },
        { provide: PopupService, useValue: popUpService },
        HotkeysService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorSedeComponent);
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
      expect(spiedFunction).toHaveBeenCalledTimes(2);

    });

    it('Inicializa correctamente advancedSearchForm', () => {

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

    it('setea etiqueta como sede si no esSedeOrigenODestino', () => {

      // arrange
      component.etiqueta = '';
      component.esSedeOrigenODestino = false;

      // act
      component.ngOnInit();

      // assert
      expect(component.etiqueta).toEqual('Sede');
    });

    it('setea etiqueta como sede Origen si esSedeOrigenODestino y es origen', () => {

      // arrange
      component.etiqueta = '';
      component.esSedeOrigenODestino = true;
      component.esOrigen = true;

      // act
      component.ngOnInit();

      // assert
      expect(component.etiqueta).toEqual('Sede Origen');
    });

    it('setea etiqueta como sede destino si esSedeOrigenODestino y no es origen', () => {

      // arrange
      component.etiqueta = '';
      component.esSedeOrigenODestino = true;
      component.esOrigen = false;

      // act
      component.ngOnInit();

      // assert
      expect(component.etiqueta).toEqual('Sede Destino');
    });

  });
  describe('Test del ngOnChanges', () => {
    beforeEach(() => {
      component.movimientoCarga = jasmine.createSpyObj('MovimientoCargaCamion', ['finalidad']);
      component.esOrigen = false;
    });

    it('Es carga debe setearse en true', () => {

      // arrange
      component.filters['esCarga'] = false;

      // act
      component.ngOnChanges();

      // assert
      expect(component.filters['esCarga']).toBeTruthy();
    });

    it('Es idSedeOrigenCarga debe ser igual a this.idSedeOrigen;', () => {

      // arrange
      component.filters['idSedeOrigenCarga'] = 8;
      component.idSedeOrigen = 99;

      // act
      component.ngOnChanges();

      // assert
      expect(component.filters['idSedeOrigenCarga']).toEqual(component.idSedeOrigen);
    });

  });
  //#region Test a reparar
  //  // TODO terminar test de buscar
  //   describe('Test del metodo buscar', () => {

  //     ValidableControl.prototype.onTouched = jasmine.createSpy('onTouched');

  //     describe('Test sin exepcion', () => {

  //       it('Ejecura el metodo SetcurrenteEntity', () => {

  //         // arrange
  //         const spiedFunctionn = spyOn<any>(component, 'setCurrentEntity');
  //         sedeService.getSede.and.returnValue(of([]));

  //         // act
  //         component.buscar('TEST 1');

  //         // assert
  //         expect(spiedFunctionn).toHaveBeenCalledTimes(1);

  //       });

  //       it('Ejecura el metodo notifyChange', () => {

  //         // arrange
  //         sedeService.getSede.and.returnValue(of([]));
  //         const spiedFunctionn = spyOn<any>(component, 'notifyChange');

  //         // act
  //         component.buscar('TEST 2');

  //         // assert
  //         expect(spiedFunctionn).toHaveBeenCalledTimes(1);

  //       });

  //       it('Ejecura el metodo clear', () => {

  //         // arrange
  //         const spiedFunctionn = spyOn<any>(component, 'clear');

  //         // act
  //         component.buscar('');

  //         // assert
  //         expect(spiedFunctionn).toHaveBeenCalledTimes(1);
  //       });

  //     });

  //     // TODO Arreglar testeo con exepcion
  //     // xdescribe('Test con exepcion', () => {
  //     //   it('Ejecura el metodo SetcurrenteEntity si el status code es 404', () => {

  //     //     // arrange
  //     //     const err = new HttpErrorResponse({ status: 404, statusText: 'Not Found' });
  //     //     spyOn<any>(component, 'callServiceByCode').and.returnValue(throwError(err));
  //     //     const spiedFunction = spyOn<any>(component, 'setCurrentEntity');
  //     //     spyOn<any>(component, 'notifyChange').and.callFake(() => { });

  //     //     // act
  //     //     component.buscar('TEST 2');

  //     //     // assert
  //     //     expect(spiedFunction).toHaveBeenCalledTimes(1);
  //     //     expect(component.buscar).toThrowError();

  //     //   });

  //     //   it('No ejecura el metodo SetcurrenteEntity si el status code no es 404', () => {

  //     //     // arrange
  //     //     const err = new HttpErrorResponse({ status: 555, statusText: 'Not Found' });
  //     //     spyOn<any>(component, 'callServiceByCode').and.returnValue(throwError(err));
  //     //     const spiedFunction = spyOn<any>(component, 'setCurrentEntity').and.callFake(() => { });

  //     //     // act
  //     //     component.buscar('TEST 3');

  //     //     // assert
  //     //     expect(spiedFunction).toHaveBeenCalledTimes(0);
  //     //     expect(component.buscar).toThrowError();

  //     //   });

  //     //   it('Ejecuta un mensaje error del popUp service si el status code es 404', () => {

  //     //     // arrange
  //     //     const err = new HttpErrorResponse({ status: 404, statusText: 'Not Found' });
  //     //     spyOn<any>(component, 'callServiceByCode').and.returnValue(throwError(err));
  //     //     spyOn<any>(component, 'setCurrentEntity').and.callFake(() => { });
  //     //     spyOn<any>(component, 'notifyChange');


  //     //     // act
  //     //     component.buscar('TEST 4');

  //     //     // assert
  //     //     expect(popUpService.error).toHaveBeenCalledTimes(1);
  //     //     expect(component.buscar).toThrowError();

  //     //   });
  //     //   it('No ejecuta un mensaje error del popUp service si el status code no es 404', () => {

  //     //     // arrange
  //     //     const err = new HttpErrorResponse({ status: 555, statusText: 'Not Found' });
  //     //     spyOn<any>(component, 'callServiceByCode').and.returnValue(throwError(err));
  //     //     spyOn<any>(component, 'setCurrentEntity').and.callFake(() => { });

  //     //     // act
  //     //     component.buscar('TEST 5');

  //     //     // assert
  //     //     expect(popUpService.error).toHaveBeenCalledTimes(0);
  //     //     expect(component.buscar).toThrowError();

  //     //   });
  //     //   it('Ejecuta notifyChange si el status code no es 404', () => {

  //     //     // arrange
  //     //     const err = new HttpErrorResponse({ status: 404, statusText: 'Not Found' });
  //     //     spyOn<any>(component, 'callServiceByCode').and.returnValue(throwError(err));
  //     //     spyOn<any>(component, 'setCurrentEntity').and.callFake(() => { });
  //     //     const notifyChangeSpy = spyOn<any>(component, 'notifyChange');


  //     //     // act
  //     //     component.buscar('TEST 6');

  //     //     // assert
  //     //     expect(notifyChangeSpy).toHaveBeenCalledTimes(1);
  //     //     expect(component.buscar).toThrowError();

  //     //   });
  //     //   it('No ejecuta notifyChange si el status code no es 404', () => {

  //     //     // arrange
  //     //     const err = new HttpErrorResponse({ status: 555, statusText: 'Not Found' });
  //     //     spyOn<any>(component, 'callServiceByCode').and.returnValue(throwError(err));
  //     //     spyOn<any>(component, 'setCurrentEntity').and.callFake(() => { });
  //     //     const notifyChangeSpy = spyOn<any>(component, 'notifyChange').and.callFake(() => { });


  //     //     // act
  //     //     component.buscar('TEST 7');

  //     //     // assert
  //     //     expect(notifyChangeSpy).toHaveBeenCalledTimes(0);
  //     //     expect(component.buscar).toThrowError();


  //     //   });
  //     // });


  //   });
  //#endregion

});
