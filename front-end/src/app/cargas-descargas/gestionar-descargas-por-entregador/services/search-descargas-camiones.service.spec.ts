import { TestBed, inject } from '@angular/core/testing';

import { SearchDescargasCamionesService } from './search-descargas-camiones.service';
import { TestModule } from '../../../core/mocks/test.module';

describe('SearchDescargasCamionesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SearchDescargasCamionesService
      ],
      imports: [
        TestModule
      ]
    });
  });

  it('should be created', inject([SearchDescargasCamionesService], (service: SearchDescargasCamionesService) => {
    expect(service).toBeTruthy();
  }));
});
