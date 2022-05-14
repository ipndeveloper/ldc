import { TestBed, inject } from '@angular/core/testing';

import { RechazarDescargaService } from './rechazar-descarga.service';
import { TestModule } from '../../../../core/mocks/test.module';

describe('RechazarDescargaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule
      ],
      providers: [RechazarDescargaService]
    });
  });

  it('should be created', inject([RechazarDescargaService], (service: RechazarDescargaService) => {
    expect(service).toBeTruthy();
  }));
});
