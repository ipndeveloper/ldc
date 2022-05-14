import { TestBed, inject } from '@angular/core/testing';

import { ReversarSalidaService } from './reversar-salida.service';
import { TestModule } from '../../../core/mocks/test.module';

describe('ReversarSalidaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule
      ],
      providers: [ReversarSalidaService]
    });
  });

  it('should be created', inject([ReversarSalidaService], (service: ReversarSalidaService) => {
    expect(service).toBeTruthy();
  }));
});
