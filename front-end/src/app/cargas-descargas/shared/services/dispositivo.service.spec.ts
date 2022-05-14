import { TestBed, inject } from '@angular/core/testing';

import { DispositivoService } from './dispositivo.service';
import { TestModule } from '../../../core/mocks/test.module';

describe('DispositivoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DispositivoService],
      imports: [TestModule]
    });
  });

  it('should be created', inject([DispositivoService], (service: DispositivoService) => {
    expect(service).toBeTruthy();
  }));
});
