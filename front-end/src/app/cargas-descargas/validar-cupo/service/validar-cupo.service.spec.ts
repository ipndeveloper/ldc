import { TestBed, inject } from '@angular/core/testing';

import { ValidarCupoService } from './validar-cupo.service';
import { TestModule } from '../../../core/mocks/test.module';

describe('ValidarCupoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValidarCupoService],
      imports: [
        TestModule
      ]
    });
  });

  it('should be created', inject([ValidarCupoService], (service: ValidarCupoService) => {
    expect(service).toBeTruthy();
  }));
});
