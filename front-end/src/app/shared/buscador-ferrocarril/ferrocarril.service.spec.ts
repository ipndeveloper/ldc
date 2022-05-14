import { TestBed, inject } from '@angular/core/testing';

import { FerrocarrilService } from './ferrocarril.service';
import { TestModule } from '../../core/mocks/test.module';

describe('FerrocarrilService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [
        FerrocarrilService]
    });
  });

  it('should be created', inject([FerrocarrilService], (service: FerrocarrilService) => {
    expect(service).toBeTruthy();
  }));

  describe('Test del construcctor', () => {

    it('Chequea que el nombre del api service sea correcto', () => {

      // arrange
      let testService: FerrocarrilService;
      const apiservice = jasmine.createSpyObj('ApiService', ['']);

      // act
      testService = new FerrocarrilService(apiservice);

      // assert
      expect(testService.apiRoute).toEqual('ferrocarriles');
    });

  });

});
