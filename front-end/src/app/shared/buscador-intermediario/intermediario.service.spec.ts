import { TestBed, inject } from '@angular/core/testing';
import { IntermediarioService } from './intermediario.service';
import { TestModule } from '../../core/mocks/test.module';
import { PopupService } from '../../core/services/popupService/popup.service';

describe('IntermediarioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [
        IntermediarioService,
        PopupService
      ]
    });
  });

  it('should be created', inject([IntermediarioService], (service: IntermediarioService) => {
    expect(service).toBeTruthy();
  }));

  describe('Test del construcctor', () => {

    it('Chequea que el nombre del api service sea correcto', () => {

      // arrange
      let testService: IntermediarioService;
      const apiservice = jasmine.createSpyObj('ApiService', ['']);

      // act
      testService = new IntermediarioService(apiservice);

      // assert
      expect(testService.apiRoute).toEqual('intermediarios');
    });

  });
});
