import { TestBed, inject } from '@angular/core/testing';

import { BuscadorSociedadService } from './buscador-sociedad.service';
import { TestModule } from '../../core/mocks/test.module';

describe('BuscadorSociedadService', () => {

  const apiservice = jasmine.createSpyObj('ApiService', ['']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BuscadorSociedadService],
      imports: [TestModule]
    });
  });

  it('should be created', inject([BuscadorSociedadService], (service: BuscadorSociedadService) => {
    expect(service).toBeTruthy();
  }));

  describe('Test del construcctor', () => {

    it('Chequea que el nombre del api service sea correcto', () => {

      // arrange
      let testService: BuscadorSociedadService;
      // act
      testService = new BuscadorSociedadService(apiservice);

      // assert
      expect(testService.apiRoute).toEqual('titulares');
    });

  });
});
