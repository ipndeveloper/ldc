import { TestBed, inject } from '@angular/core/testing';

import { MisImpresorasService } from './mis-impresoras.service';
import { TestModule } from '../../core/mocks/test.module';

describe('MisImpresorasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MisImpresorasService],
      imports: [TestModule]
    });
  });

  it('should be created', inject([MisImpresorasService], (service: MisImpresorasService) => {
    expect(service).toBeTruthy();
  }));
});
