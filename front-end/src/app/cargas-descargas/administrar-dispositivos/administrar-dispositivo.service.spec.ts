import { TestBed, inject } from '@angular/core/testing';

import { AdministrarDispositivoService } from './administrar-dispositivo.service';
import { TestModule } from '../../core/mocks/test.module';

describe('AdministrarDispositivoService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdministrarDispositivoService],
      imports: [TestModule],
    });
  });

  it('should be created', inject([AdministrarDispositivoService], (service: AdministrarDispositivoService) => {
    expect(service).toBeTruthy();
  }));
});
