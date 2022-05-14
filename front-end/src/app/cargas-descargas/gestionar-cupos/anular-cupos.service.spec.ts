import { TestBed, inject } from '@angular/core/testing';

import { AnularCuposService } from './anular-cupos.service';
import { TestModule } from '../../core/mocks/test.module';

describe('AnularCuposService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [AnularCuposService]
    });
  });

  it('should be created', inject([AnularCuposService], (service: AnularCuposService) => {
    expect(service).toBeTruthy();
  }));
});
