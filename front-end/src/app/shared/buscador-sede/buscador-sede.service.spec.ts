import { TestBed, inject } from '@angular/core/testing';

import { HotkeysService } from 'angular2-hotkeys';
import { TestModule } from '../../core/mocks/test.module';
import { BuscadorSedeService } from './buscador-sede.service';

describe('SedeService', () => {

  const apiservice = jasmine.createSpyObj('ApiService', ['get']);
  const service = new BuscadorSedeService(apiservice);

  beforeEach(() => {
    apiservice.get.calls.reset();
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [BuscadorSedeService,
        HotkeysService]
    });
  });

  it('should be created', inject([BuscadorSedeService], (serviceTest: BuscadorSedeService) => {
    expect(serviceTest).toBeTruthy();
  }));

  describe('Test del construcctor', () => {

    it('Chequea que el nombre del api service sea correcto', () => {

      // arrange
      let testService: BuscadorSedeService;
      // act
      testService = new BuscadorSedeService(apiservice);

      // assert
      expect(testService.apiRoute).toEqual('sede');
    });

  });

  describe('Test del getByNombreUsuario', () => {

    it('Chequea que la ruta enviada a la api sea correcta si es carga y es origen', () => {

      // arrange
      let testServiceRoute = '';
      service.esCarga = true;
      service.idSedeOrigenCarga = 66;
      service.idFinalidad = 22;
      apiservice.get.and.callFake((route: string) => {
        testServiceRoute = route;
      });

      // act
      service.getSede('codigoTest', true);

      // assert
      expect(testServiceRoute).toEqual('sede/codigoTest');
    });

    it('Chequea que la ruta enviada a la api sea correcta si no es carga y es origen', () => {

      // arrange
      let testServiceRoute = '';
      service.esCarga = false;
      service.idSedeOrigenCarga = 66;
      service.idFinalidad = 22;
      apiservice.get.and.callFake((route: string) => {
        testServiceRoute = route;
      });
      // act
      service.getSede('codigoTest', false);

      // assert
      expect(testServiceRoute).toEqual('sede/codigoTest');
    });

    it('Chequea que la ruta enviada a la api sea correcta si no es carga y no es origen', () => {

      // arrange
      let testServiceRoute = '';
      service.esCarga = false;
      service.idSedeOrigenCarga = 66;
      service.idFinalidad = 22;
      apiservice.get.and.callFake((route: string) => {
        testServiceRoute = route;
      });

      // act
      service.getSede('codigoTest', false);

      // assert
      expect(testServiceRoute).toEqual('sede/codigoTest');
    });

    it('Chequea que la ruta enviada a la api sea correcta si es carga y no es origen', () => {

      // arrange
      let testServiceRoute = '';
      service.esCarga = true;
      service.idSedeOrigenCarga = 66;
      service.idFinalidad = 22;
      apiservice.get.and.callFake((route: string) => {
        testServiceRoute = route;
      });
      // act
      service.getSede('codigoTest', false);

      // assert
      expect(testServiceRoute).toEqual('sede/codigo?codigo=codigoTest&esCarga=true&idSedeOrigenCarga=66&idFinalidad=22&');

    });

    it('Chequea llamada get', () => {

      // arrange

      // act

      service.getSede('codigoTest', true);

      // assert
      expect(apiservice.get).toHaveBeenCalledTimes(1);
    });

  });

});
