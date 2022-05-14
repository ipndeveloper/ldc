import {  ComponentFixture, TestBed } from '@angular/core/testing';
import { HotkeyModule } from 'angular2-hotkeys';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiService } from '../../core/services/restClient/api.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { GestionarManipuleoComponent } from './gestionar-manipuleo.component';
import { GestionarManipuleoService } from './gestionar-manipuleo.service';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { configureTestSuite } from '../../core/mocks/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PopupModule } from '../../core/services/popupService/popup.module';
import { RestHandlerService } from '../../core/services/restClient/restHandler.service';
import { AuthService } from '../../core/services/session/auth.service';
import { RequestOptionsService } from '../../core/services/restClient/requestOptions.service';
import { FormBuilder } from '@angular/forms';

export const MockRoutes: Routes = [
  {
      path: '',
      component: GestionarManipuleoComponent,
      data: {
          title: 'GestionarCalidadCalado'
      },
      pathMatch: 'full'
  }
];

describe('GestionarCalidadCaladoComponent', () => {
  let component: GestionarManipuleoComponent;
  let fixture: ComponentFixture<GestionarManipuleoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        GestionarManipuleoComponent,
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        SearchFormActionsNotifierService,
        ExcelService,
        GestionarManipuleoService,
        ApiService,
        FormComponentService,
        RestHandlerService,
        RequestOptionsService,
        AuthService,
        FormBuilder
      ],
      imports: [
        HttpClientTestingModule,
        PopupModule,
        HotkeyModule.forRoot(),
        RouterTestingModule.withRoutes(MockRoutes)
    ],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarManipuleoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('El metodo comparatorPlataforma', () => {

    it('retorna -1 si el numero de plataforma del primer parametro es menor', () => {
      // Arrange
      const plataforma1 = 'Plataforma 1';
      const plataforma2 = 'Plataforma 2';
      // Act
      const resultado = component['comparatorPlataforma'](plataforma1, plataforma2);
      // Assert
      expect(resultado).toEqual(-1);
    });

    it('retorna 1 si el numero de plataforma del primer parametro es mayor', () => {
      // Arrange
      const plataforma11 = 'Plataforma 11';
      const plataforma2 = 'Plataforma 2';
      // Act
      const resultado = component['comparatorPlataforma'](plataforma11, plataforma2);
      // Assert
      expect(resultado).toEqual(1);
    });
  });
});
