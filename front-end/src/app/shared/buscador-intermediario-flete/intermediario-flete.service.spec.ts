import { TestBed, inject } from '@angular/core/testing';
import { IntermediarioFleteService } from './intermediario-flete.service';
import { TestModule } from '../../core/mocks/test.module';

describe('IntermediarioFleteService', () => {
  const apiservice = jasmine.createSpyObj('ApiService', ['get']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [
        IntermediarioFleteService]
    });
  });

  it('should be created', inject([IntermediarioFleteService], (service: IntermediarioFleteService) => {
    expect(service).toBeTruthy();
  }));

  describe('Test del construcctor', () => {

    it('Chequea que el nombre del api service sea correcto', () => {

      // arrange
      let testService: IntermediarioFleteService;
      // act
      testService = new IntermediarioFleteService(apiservice);

      // assert
      expect(testService.apiRoute).toEqual('intermediarios-flete');
    });
  });
});
