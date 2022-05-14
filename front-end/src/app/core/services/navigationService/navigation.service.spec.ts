import { TestBed } from '@angular/core/testing';
import { NavigationService } from './navigation.service';
import { Routes, Router, Route } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { configureTestSuite } from '../../mocks/testing';
import { ApiService } from '../restClient/api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RestHandlerService } from '../restClient/restHandler.service';
import { PopupModule } from '../popupService/popup.module';
import { RequestOptionsService } from '../restClient/requestOptions.service';
import { AuthService } from '../session/auth.service';

export const MockRoutes: Routes = [
  {
      path: '',
      component: NavigationService,
      data: {
          title: 'GestionarCalidadCalado'
      },
      pathMatch: 'full'
  }
];
describe('NavigationService', () => {
  let service: NavigationService;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(MockRoutes),
        PopupModule
      ],
      providers: [
        NavigationService,
        ApiService,
        RestHandlerService,
        RequestOptionsService,
        AuthService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });


  beforeEach(() => {
    service = TestBed.get(NavigationService);

    const router = TestBed.get(Router);
    spyOn(router, 'navigate');

    // const storage = TestBed.get(Storage);
    // spyOn(storage, 'setItem');

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('El metodo navigate', () => {

    let fromIdentifier: string;
    let toIdentifier: string;

    beforeEach(() => {
      fromIdentifier = 'fromIdentifier';
      toIdentifier = 'toIdentifier';
     });

    it('Cuando fromIdentifier es vacio arroja un error', () => {
      // Arrange
      fromIdentifier = '';

      let mensajeRecibido = '';
      try {
        // Act
        service.navigate(fromIdentifier, toIdentifier);

      } catch (error) {
        mensajeRecibido = error.message;
      }

      // Assert
      const mensajeEsperado = 'The parameter "fromIdentifier" can not be  null.';
      expect(mensajeRecibido).toBe(mensajeEsperado);
    });

    it('Cuando toIdentifier es vacio arroja un error', () => {
      // Arrange
      toIdentifier = '';

      let mensajeRecibido = '';
      try {
        // Act
        service.navigate(fromIdentifier, toIdentifier);

      } catch (error) {
        mensajeRecibido = error.message;
      }

      // Assert
      const mensajeEsperado = 'The parameter "toIdentifier" can not be  null.';
      expect(mensajeRecibido).toBe(mensajeEsperado);
    });

  });

  describe('El metodo navigateBack', () => {
  });

  describe('El metodo requestExtras', () => {
  });

  describe('El metodo getPathByIdentifier', () => {
  });

  describe('El metodo getDataByPath', () => {
    let routes: Route[];
    const data = { title: 'Ruta1.1' };

    beforeEach(() => {
      routes = [
        {
          path: 'ruta1',
          children: [
            {
              path: 'ruta1-1',
              data: data
            },
            {
              path: 'ruta1-2',
              data: {
                title: 'Ruta1.2'
              }
            }
          ]
        },
        {
          path: 'ruta2',
          children: [
            {
              path: 'ruta2-1',
              data: {
                title: 'Ruta1.1'
              }
            }
          ]
        },
      ];
    });

    it('retorna el data de la url suministrada', () => {
      // Arrange
      const url = '/ruta1/ruta1-1';

      // Act
      const resultado = service.getDataByPath(routes, url);

      // Assert
      expect(resultado).toEqual(data);
    });

    it('retorna un objeto vacio cuando no se encuentra la url', () => {
      // Arrange
      const url = '/ruta1/pepe';

      // Act
      const resultado = service.getDataByPath(routes, url);

      // Assert
      expect(resultado).toEqual({});
    });
  });
});
