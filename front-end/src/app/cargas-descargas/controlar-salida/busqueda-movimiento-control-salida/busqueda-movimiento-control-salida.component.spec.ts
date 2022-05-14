import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BusquedaMovimientoControlSalidaComponent } from './busqueda-movimiento-control-salida.component';
import { FormControl } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { configureTestSuite } from '../../../core/mocks/testing';
import { ControlarSalidaService } from '../controlar-salida.service';
import { of } from 'rxjs';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { PopupModule } from '../../../core/services/popupService/popup.module';
import { AuthService } from '../../../core/services/session/auth.service';
import { ApiService } from '../../../core/services/restClient/api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RestHandlerService } from '../../../core/services/restClient/restHandler.service';
import { RequestOptionsService } from '../../../core/services/restClient/requestOptions.service';
import { RouterTestingModule } from '@angular/router/testing';
import { NavigationService } from '../../../core/services/navigationService/navigation.service';

describe('BusquedaMovimientoControlSalidaComponent', () => {
  let component: BusquedaMovimientoControlSalidaComponent;
  let fixture: ComponentFixture<BusquedaMovimientoControlSalidaComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [BusquedaMovimientoControlSalidaComponent],
      imports: [
        HttpClientTestingModule,
        PopupModule,
        RouterTestingModule
      ],
      providers: [
        ControlarSalidaService,
        AuthService,
        ApiService,
        RestHandlerService,
        RequestOptionsService,
        FormComponentService,
        NavigationService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaMovimientoControlSalidaComponent);
    component = fixture.componentInstance;

    const controlarSalidaService = TestBed.get(ControlarSalidaService);
    spyOn(controlarSalidaService, 'getMovimientoControlSalida').and.returnValue(of({}));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('El método botonBuscarDeshabilitado', () => {
    it('Cuando botonesDeshabilitados es true y se ha seleccionado la opcion sin tarjeta devuelve false', () => {
      // Arrange
      component.botonesDeshabilitados = true;
      (component as any).fcService = TestBed.get(FormComponentService);
      spyOn((component as any).fcService, 'getControl').and.callFake((parameter: string) => {
        if (parameter === 'sinTarjeta') {
          return  { 'value': true } as FormControl;
        }
      });

      // Act
      const respuesta = component.botonBuscarDeshabilitado;

      // Assert
      expect(respuesta).toBeFalsy();
    });

    it('Cuando terminalUtilizaTarjeta es true y se ha seleccionado la opcion sin tarjeta devuelve false', () => {
      // Arrange
      component.disableButtons = false;
      (component as any).terminalUtilizaTarjeta = true;
      (component as any).fcService = TestBed.get(FormComponentService);
      spyOn((component as any).fcService, 'getControl').and.callFake((parameter: string) => {
        if (parameter === 'sinTarjeta') {
          return  { 'value': true } as FormControl;
        }
      });

      // Act
      const respuesta = component.botonBuscarDeshabilitado;

      // Assert
      expect(respuesta).toBeFalsy();
    });

    it('Cuando botonesDeshabilitados es true y NO se ha seleccionado la opcion sin tarjeta devuelve true', () => {
      // Arrange
      component.disableButtons = false;
      component.botonesDeshabilitados = true;
      (component as any).fcService = TestBed.get(FormComponentService);
      spyOn((component as any).fcService, 'getControl').and.callFake((parameter: string) => {
        if (parameter === 'sinTarjeta') {
          return  { 'value': false } as FormControl;
        }
      });

      // Act
      const respuesta = component.botonBuscarDeshabilitado;

      // Assert
      expect(respuesta).toBeTruthy();
    });

    it('Cuando terminalUtilizaTarjeta es true y NO se ha seleccionado la opcion sin tarjeta devuelve true', () => {
       // Arrange
      component.disableButtons = false;
      (component as any).terminalUtilizaTarjeta = true;
      (component as any).fcService = TestBed.get(FormComponentService);
      spyOn((component as any).fcService, 'getControl').and.callFake((parameter: string) => {
        if (parameter === 'sinTarjeta') {
          return  { 'value': false } as FormControl;
        }
      });

       // Act
       const respuesta = component.botonBuscarDeshabilitado;

       // Assert
       expect(respuesta).toBeTruthy();
    });

    it('Cuando botonesDeshabilitados es false y terminalUtilizaTarjeta es false devuelve false', () => {
      // Arrange
      component.disableButtons = false;
      component.botonesDeshabilitados = false;
      (component as any).terminalUtilizaTarjeta = false;
      (component as any).fcService = TestBed.get(FormComponentService);
      spyOn((component as any).fcService, 'getControl').and.callFake((parameter: string) => {
        if (parameter === 'sinTarjeta') {
          return  { 'value': false } as FormControl;
        }
      });

      // Act
      const respuesta = component.botonBuscarDeshabilitado;

      // Assert
      expect(respuesta).toBeFalsy();
    });
  });
});
