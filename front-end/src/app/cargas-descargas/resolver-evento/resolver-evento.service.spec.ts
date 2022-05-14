import { inject, TestBed } from '@angular/core/testing';
import { TestModule } from '../../core/mocks/test.module';

import { ResolverEventoService } from './resolver-evento.service';

describe('ResolverEventoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResolverEventoService],
      imports: [TestModule]
    });
  });

  it('should be created', inject([ResolverEventoService], (service: ResolverEventoService) => {
    expect(service).toBeTruthy();
  }));
});
