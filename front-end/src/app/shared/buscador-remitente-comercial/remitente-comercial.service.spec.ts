import { TestBed, inject } from '@angular/core/testing';

import { RemitenteComercialService } from './remitente-comercial.service';
import { TestModule } from '../../core/mocks/test.module';
import { PopupService } from '../../core/services/popupService/popup.service';

describe('RemitenteComercialService', () => {

  const apiservice = jasmine.createSpyObj('ApiService', ['']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [
        RemitenteComercialService,
        PopupService
      ]
    });
  });

  it('should be created', inject([RemitenteComercialService], (serviceTest: RemitenteComercialService) => {
    expect(serviceTest).toBeTruthy();
  }));

  describe('Test del construcctor', () => {

    it('Chequea que el nombre del api service sea correcto', () => {

      // arrange
      let testService: RemitenteComercialService;
      // act
      testService = new RemitenteComercialService(apiservice);

      // assert
      expect(testService.apiRoute).toEqual('remitentes-comerciales');
    });

  });
});
