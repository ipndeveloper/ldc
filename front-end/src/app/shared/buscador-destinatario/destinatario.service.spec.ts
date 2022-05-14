import { TestBed, inject } from '@angular/core/testing';

import { DestinatarioService } from './destinatario.service';
import { TestModule } from '../../core/mocks/test.module';

describe('DestinatarioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [
        DestinatarioService]
    });
  });

  it('should be created', inject([DestinatarioService], (service: DestinatarioService) => {
    expect(service).toBeTruthy();
  }));

  describe('Test del construcctor', () => {

    it('Chequea que el nombre del api service sea correcto', () => {

      // arrange
      let testService: DestinatarioService;
      const apiservice = jasmine.createSpyObj('ApiService', ['']);

      // act
      testService = new DestinatarioService(apiservice);

      // assert
      expect(testService.apiRoute).toEqual('destinatarios');
    });

  });

});
