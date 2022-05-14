import { TestBed } from '@angular/core/testing';

import { PermisoService } from './permiso.service';
import { TestModule } from '../../../core/mocks/test.module';

describe('PermisoService', () => {
  let service: PermisoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PermisoService],
      imports: [TestModule]
    });

    service = TestBed.get(PermisoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
