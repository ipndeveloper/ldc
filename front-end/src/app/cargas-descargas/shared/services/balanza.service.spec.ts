import { TestBed, inject } from '@angular/core/testing';

import { BalanzaService } from './balanza.service';
import { TestModule } from '../../../core/mocks/test.module';

describe('BalanzaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BalanzaService],
      imports: [TestModule]
    });
  });

  it('should be created', inject([BalanzaService], (service: BalanzaService) => {
    expect(service).toBeTruthy();
  }));
});
