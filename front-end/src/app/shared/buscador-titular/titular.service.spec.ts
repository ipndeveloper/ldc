import { TestBed, inject } from '@angular/core/testing';
import { TitularService } from './titular.service';
import { TestModule } from '../../core/mocks/test.module';

describe('TitularService', () => {

  const apiservice = jasmine.createSpyObj('ApiService', ['']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [
        TitularService]
    });
  });

  it('should be created', inject([TitularService], (service: TitularService) => {
    expect(service).toBeTruthy();
  }));

  describe('Test del construcctor', () => {

    it('Chequea que el nombre del api service sea correcto', () => {

      // arrange
      let testService: TitularService;
      // act
      testService = new TitularService(apiservice);

      // assert
      expect(testService.apiRoute).toEqual('titulares');
    });

  });

});
