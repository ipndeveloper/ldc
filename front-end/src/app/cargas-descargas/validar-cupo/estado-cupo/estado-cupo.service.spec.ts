import { TestBed, inject } from '@angular/core/testing';

import { EstadoCupoService } from './estado-cupo.service';
import { TestModule } from '../../../core/mocks/test.module';

describe('EstadoCupoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [EstadoCupoService]
    });
  });

  it('should be created', inject([EstadoCupoService], (service: EstadoCupoService) => {
    expect(service).toBeTruthy();
  }));
});
