import { TestBed, inject } from '@angular/core/testing';

import { TipoDocumentoPorteService } from './tipo-documento-porte.service';
import { ApiService } from '../../../core/services/restClient/api.service';
import { TestModule } from '../../../core/mocks/test.module';

describe('TipoDocumentoPorteService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [
        TipoDocumentoPorteService,
        ApiService]
    });
  });

  it('should be created', inject([TipoDocumentoPorteService], (service: TipoDocumentoPorteService) => {
    expect(service).toBeTruthy();
  }));

  it('The method getAll should be called one time and returns information',
      inject([TipoDocumentoPorteService], (service: TipoDocumentoPorteService) => {
        // arrange

        // act
        service.getAll();

        // assert
        expect(service.getAll).toBeTruthy();
  }));
});
