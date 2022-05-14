import { TestBed, inject } from '@angular/core/testing';

import { ServicioAfipService } from './servicio-afip.service';
import { TestModule } from '../../../core/mocks/test.module';

describe('ServicioAfipService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [ServicioAfipService]
    });
  });

  it('should be created', inject([ServicioAfipService], (service: ServicioAfipService) => {
    expect(service).toBeTruthy();
  }));
});
