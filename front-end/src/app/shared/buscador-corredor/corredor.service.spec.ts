import { TestBed, inject } from '@angular/core/testing';
import { CorredorService } from './corredor.service';
import { TestModule } from '../../core/mocks/test.module';

describe('CorredorCompradorService', () => {

  const apiservice = jasmine.createSpyObj('ApiService', ['get']);
  const service = new CorredorService(apiservice);

  beforeEach(() => {
    apiservice.get.calls.reset();
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [
        CorredorService]
    });
  });

  it('should be created', inject([CorredorService], (serviceTest: CorredorService) => {
    expect(serviceTest).toBeTruthy();
  }));

  describe('Test del construcctor', () => {

    it('Chequea que el nombre del api service sea correcto', () => {

      // arrange
      let testService: CorredorService;
      // act
      testService = new CorredorService(apiservice);

      // assert
      expect(testService.apiRoute).toEqual('corredores');
    });

  });

  describe('Test metodo getByCodigoRol', () => {

    it('Chequea que la ruta enviada a la api sea correcta si es carga y no es origen', () => {

      // arrange
      let testServiceRoute = '';
      apiservice.get.and.callFake((route: string) => {
        testServiceRoute = route;
      });
      // act
      service.getByCodigoRol('codigoTest', 'rolTest');

      // assert
      expect(testServiceRoute).toEqual('corredores/codigoFiscal?codigoFiscal=codigoTest&rol=rolTest');

    });

    it('Chequea llamada get', () => {

      // arrange

      // act
      service.getByCodigoRol('codigoTest', 'rolTest');

      // assert
      expect(apiservice.get).toHaveBeenCalledTimes(1);
    });
  });

});
