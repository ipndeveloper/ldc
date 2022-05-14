import { TestBed, inject } from '@angular/core/testing';

import { GestionarCuposService } from './gestionar-cupos.service';
import { TestModule } from '../../core/mocks/test.module';

describe('GestionarCuposService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [GestionarCuposService]
    });
  });

  it('should be created', inject([GestionarCuposService], (service: GestionarCuposService) => {
    expect(service).toBeTruthy();
  }));
});
