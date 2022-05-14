import { TestBed, inject } from '@angular/core/testing';

import { AutorizarMuestrasAgilService } from './autorizar-muestras-agil.service';
import { TestModule } from '../../../core/mocks/test.module';

describe('AutorizarMuestrasAgilService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule
      ],
      providers: [AutorizarMuestrasAgilService]
    });
  });

  it('should be created', inject([AutorizarMuestrasAgilService], (service: AutorizarMuestrasAgilService) => {
    expect(service).toBeTruthy();
  }));
});
