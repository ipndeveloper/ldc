import { TestBed, inject } from '@angular/core/testing';

import { AmbienteService } from './ambiente.service';
import { TestModule } from '../../core/mocks/test.module';

describe('AmbienteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AmbienteService],
      imports: [TestModule]
    });
  });

  it('should be created', inject([AmbienteService], (service: AmbienteService) => {
    expect(service).toBeTruthy();
  }));
});
