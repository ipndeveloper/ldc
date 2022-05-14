import { TestBed, inject } from '@angular/core/testing';

import { MercadoTerminoService } from './mercado-termino.service';
import { TestModule } from '../../core/mocks/test.module';

describe('MercadoTerminoService', () => {
  const apiservice = jasmine.createSpyObj('ApiService', ['get']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [
        MercadoTerminoService]
    });
  });

  it('should be created', inject([MercadoTerminoService], (service: MercadoTerminoService) => {
    expect(service).toBeTruthy();
  }));


  describe('Test del construcctor', () => {

    it('Chequea que el nombre del api service sea correcto', () => {

      // arrange
      let testService: MercadoTerminoService;
      // act
      testService = new MercadoTerminoService(apiservice);

      // assert
      expect(testService.apiRoute).toEqual('mercado-termino');
    });
  });
});
