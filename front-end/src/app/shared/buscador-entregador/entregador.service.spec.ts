import { TestBed, inject } from '@angular/core/testing';
import { EntregadorService } from './entregador.service';
import { TestModule } from '../../core/mocks/test.module';

describe('EntregadorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [
        EntregadorService]
    });
  });

  it('should be created', inject([EntregadorService], (service: EntregadorService) => {
    expect(service).toBeTruthy();
  }));

  describe('Test del construcctor', () => {

    it('Chequea que el nombre del api service sea correcto', () => {

      // arrange
      let testService: EntregadorService;
      const apiservice = jasmine.createSpyObj('ApiService', ['']);

      // act
      testService = new EntregadorService(apiservice);

      // assert
      expect(testService.apiRoute).toEqual('entregadores');
    });

  });

});
