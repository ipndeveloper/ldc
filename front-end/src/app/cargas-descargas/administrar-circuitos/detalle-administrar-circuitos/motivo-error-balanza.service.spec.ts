import { TestBed, inject } from '@angular/core/testing';

import { MotivoErrorBalanzaService } from './motivo-error-balanza.service';
import { TestModule } from '../../../core/mocks/test.module';

describe('MotivoErrorBalanzaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MotivoErrorBalanzaService],
      imports: [TestModule],
    });
  });

  it('should be created', inject([MotivoErrorBalanzaService], (service: MotivoErrorBalanzaService) => {
    expect(service).toBeTruthy();
  }));
});
