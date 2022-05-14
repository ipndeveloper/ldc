import { TestBed, inject } from '@angular/core/testing';

import { LocalidadService } from './localidad.service';
import { TestModule } from '../../core/mocks/test.module';

describe('LocalidadService', () => {
  const apiservice = jasmine.createSpyObj('ApiService', ['get']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [LocalidadService]
    });
  });

  it('should be created', inject([LocalidadService], (service: LocalidadService) => {
    expect(service).toBeTruthy();
  }));

  describe('Test del construcctor', () => {

    it('Chequea que el nombre del api service sea correcto', () => {

      // arrange
      let testService: LocalidadService;
      // act
      testService = new LocalidadService(apiservice);

      // assert
      expect(testService.apiRoute).toEqual('localidad');
    });
  });
});
