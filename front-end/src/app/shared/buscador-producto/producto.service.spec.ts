import { TestBed, inject } from '@angular/core/testing';

import { ProductoService } from './producto.service';
import { TestModule } from '../../core/mocks/test.module';

describe('ProductoService', () => {

  const apiservice = jasmine.createSpyObj('ApiService', ['get']);
  const service = new ProductoService(apiservice);

  let testServiceRoute: String;
  apiservice.get.and.callFake((route: string) => {
    testServiceRoute = route;
  });
  beforeEach(() => {
    testServiceRoute = '';
    apiservice.get.calls.reset();
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [
        ProductoService]
    });
  });

  it('should be created', inject([ProductoService], (serviceTest: ProductoService) => {
    expect(serviceTest).toBeTruthy();
  }));

  describe('Test del construcctor', () => {

    it('Chequea que el nombre del api service sea correcto', () => {

      // arrange
      let testService: ProductoService;
      // act
      testService = new ProductoService(apiservice);

      // assert
      expect(testService.apiRoute).toEqual('producto');
    });

  });


  describe('Test del getPorCodigoPorTipoProducto', () => {

    it('Chequea que llame al get', () => {

      // arrange

      // act
      service.getPorCodigoPorTipoProducto('codigoTest', 11);

      // assert
      expect(apiservice.get).toHaveBeenCalledTimes(1);
    });

    it('Chequea que el nombre del api service sea correcto', () => {

      // arrange

      // act
      service.getPorCodigoPorTipoProducto('codigoTest', 11);

      // assert
      expect(testServiceRoute).toEqual('producto/codigoTest?idTipoProducto=11');
    });

  });

  describe('Test del getSinTipo', () => {

    it('Chequea que llame al get', () => {

      // arrange

      // act
      service.getSinTipo('getSinTipo', true);

      // assert
      expect(apiservice.get).toHaveBeenCalledTimes(1);
    });

    it('Chequea que el nombre del api service sea correcto', () => {

      // arrange

      // act
      service.getSinTipo('getSinTipo', true);

      // assert
      expect(testServiceRoute).toEqual('producto/todos/getSinTipo?filtraPorImputacionStock=true');
    });

  });

  describe('Test del getProductosPorGrupo', () => {

    it('Chequea que llame al get', () => {

      // arrange

      // act
      service.getProductosPorGrupo(6);

      // assert
      expect(apiservice.get).toHaveBeenCalledTimes(1);
    });

    it('Chequea que el nombre del api service sea correcto', () => {

      // arrange

      // act
      service.getProductosPorGrupo(6);

      // assert
      expect(testServiceRoute).toEqual('producto/grupo/6');
    });

  });

  describe('Test del getProductosPorGrupo', () => {

    it('Chequea que llame al get', () => {

      // arrange

      // act
      service.getProductosPorTipoProducto(6);

      // assert
      expect(apiservice.get).toHaveBeenCalledTimes(1);
    });

    it('Chequea que el nombre del api service sea correcto', () => {

      // arrange

      // act
      service.getProductosPorTipoProducto(6);

      // assert
      expect(testServiceRoute).toEqual('producto/tipo-producto/6');
    });

  });

});
