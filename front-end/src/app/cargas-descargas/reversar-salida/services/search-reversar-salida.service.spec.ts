import { TestBed, inject } from '@angular/core/testing';

import { SearchReversarSalidaService } from './search-reversar-salida.service';
import { TestModule } from '../../../core/mocks/test.module';

describe('SearchReversarSalidaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule
      ],
      providers: [
        SearchReversarSalidaService
      ]
    });
  });

  it('should be created', inject([SearchReversarSalidaService], (service: SearchReversarSalidaService) => {
    expect(service).toBeTruthy();
  }));

});
