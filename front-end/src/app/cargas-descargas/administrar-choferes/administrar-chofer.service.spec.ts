import { TestBed, inject } from '@angular/core/testing';

import { AdministrarChoferService } from './administrar-chofer.service';
import { TestModule } from '../../core/mocks/test.module';

describe('AdministrarChoferService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdministrarChoferService],
      imports: [TestModule],
    });
  });

  it('should be created', inject([AdministrarChoferService], (service: AdministrarChoferService) => {
    expect(service).toBeTruthy();
  }));
});
