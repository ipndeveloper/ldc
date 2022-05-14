import { TestBed, inject } from '@angular/core/testing';
import { ChoferService } from './chofer.service';
import { TestModule } from '../../core/mocks/test.module';

describe('ChoferService', () => {

  const apiservice = jasmine.createSpyObj('ApiService', ['get']);
  const service = new ChoferService(apiservice);

  beforeEach(() => {
    apiservice.get.calls.reset();
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [
        ChoferService]
    });
  });

  it('should be created', inject([ChoferService], (serviceTest: ChoferService) => {
    expect(serviceTest).toBeTruthy();
  }));

  describe('Test del construcctor', () => {

    it('Chequea que el nombre del api service sea correcto', () => {

      // arrange
      let testService: ChoferService;
      // act
      testService = new ChoferService(apiservice);

      // assert
      expect(testService.apiRoute).toEqual('choferes');
    });

  });

  describe('Test metodo get', () => {

    it('Chequea que la ruta enviada a la api sea correcta si es carga y no es origen', () => {

      // arrange
      let testServiceRoute = '';
      apiservice.get.and.callFake((route: string) => {
        testServiceRoute = route;
      });
      // act
      service.get('codigoTest');

      // assert
      expect(testServiceRoute).toEqual('choferes/codigo?cuil=codigoTest');

    });

    it('Chequea llamada get', () => {

      // arrange

      // act
      service.get('codigoTest');

      // assert
      expect(apiservice.get).toHaveBeenCalledTimes(1);
    });
  });

  // TODO ver si se puede moquear entities
});
