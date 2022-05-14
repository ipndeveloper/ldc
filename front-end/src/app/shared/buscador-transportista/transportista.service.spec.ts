import { TestBed, inject } from '@angular/core/testing';
import { TransportistaService } from './transportista.service';
import { TestModule } from '../../core/mocks/test.module';

describe('TransportistaService', () => {

  const apiservice = jasmine.createSpyObj('ApiService', ['']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [
        TransportistaService]
    });
  });

  it('should be created', inject([TransportistaService], (service: TransportistaService) => {
    expect(service).toBeTruthy();
  }));
  describe('Test del construcctor', () => {

    it('Chequea que el nombre del api service sea correcto', () => {

      // arrange
      let testService: TransportistaService;
      // act
      testService = new TransportistaService(apiservice);

      // assert
      expect(testService.apiRoute).toEqual('transportistas');
    });

  });
});
