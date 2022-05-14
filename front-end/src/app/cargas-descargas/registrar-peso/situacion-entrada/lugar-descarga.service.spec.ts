import { TestBed, inject } from '@angular/core/testing';

import { LugarDescargaService } from './lugar-descarga.service';
import { TestModule } from '../../../core/mocks/test.module';

describe('LugarDescargaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [LugarDescargaService]
    });
  });

  it('should be created', inject([LugarDescargaService], (service: LugarDescargaService) => {
    expect(service).toBeTruthy();
  }));
});
