import { TestBed, inject } from '@angular/core/testing';

import { AdministrarSobresTransporteService } from './administrar-sobres-transporte.service';
import { TestModule } from '../../core/mocks/test.module';

describe('AdministrarSobresTransporteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdministrarSobresTransporteService],
      imports: [TestModule]
    });
  });

  it('should be created', inject([AdministrarSobresTransporteService], (service: AdministrarSobresTransporteService) => {
    expect(service).toBeTruthy();
  }));
});
