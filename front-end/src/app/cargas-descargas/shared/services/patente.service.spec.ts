import { TestBed, inject } from '@angular/core/testing';

import { PatenteService } from './patente.service';
import { TestModule } from '../../../core/mocks/test.module';

describe('PatenteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
            TestModule
        ],
        providers: [PatenteService]
    });
  });

  it('should be created', inject([PatenteService], (service: PatenteService) => {
    expect(service).toBeTruthy();
  }));
});
