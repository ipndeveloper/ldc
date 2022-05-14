import { TestBed, inject } from '@angular/core/testing';

import { AdministrarCircuitoService } from './administrar-circuito.service';
import { TestModule } from '../../core/mocks/test.module';

describe('AdministrarCircuitoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdministrarCircuitoService],
      imports: [TestModule],
    });
  });

  it('should be created', inject([AdministrarCircuitoService], (service: AdministrarCircuitoService) => {
    expect(service).toBeTruthy();
  }));
});
