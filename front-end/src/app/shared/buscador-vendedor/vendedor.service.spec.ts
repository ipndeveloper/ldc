import { TestBed, inject } from '@angular/core/testing';
import { VendedorService } from './vendedor.service';
import { TestModule } from '../../core/mocks/test.module';

describe('VendedorService', () => {

  const apiservice = jasmine.createSpyObj('ApiService', ['get']);
  const service = new VendedorService(apiservice);

  beforeEach(() => {
    apiservice.get.calls.reset();
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [
        VendedorService]
    });
  });

  it('should be created', inject([VendedorService], (serviceTest: VendedorService) => {
    expect(serviceTest).toBeTruthy();
  }));

  describe('Test del construcctor', () => {

    it('Chequea que el nombre del api service sea correcto', () => {

      // arrange
      let testService: VendedorService;
      // act
      testService = new VendedorService(apiservice);

      // assert
      expect(testService.apiRoute).toEqual('vendedores');
    });

  });

  describe('Test del getByCodigoRol', () => {

    it('Chequea llamada get', () => {

      // arrange

      // act

      service.getByCodigoRol('codigoTest', 'rolTest');

      // assert
      expect(apiservice.get).toHaveBeenCalledTimes(1);
    });

    it('Chequea que la ruta enviada a la api sea correcta', () => {

      // arrange
      let testServiceRoute = '';
      apiservice.get.and.callFake((route: string) => {
        testServiceRoute = route;
      });
      // act

      service.getByCodigoRol('codigoTest', 'rolTest');

      // assert
      expect(testServiceRoute).toEqual('vendedores/codigoFiscal?codigoFiscal=codigoTest&rol=rolTest');
    });

  });

});
