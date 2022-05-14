import { TestBed, inject } from '@angular/core/testing';

import { CircuitoService } from './circuito.service';
import { TestModule } from '../../../core/mocks/test.module';

describe('Circuito.Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [
        TestModule
    ],
      providers: [CircuitoService]
    });
  });

  it('should be created', inject([CircuitoService], (service: CircuitoService) => {
    expect(service).toBeTruthy();
  }));
});
