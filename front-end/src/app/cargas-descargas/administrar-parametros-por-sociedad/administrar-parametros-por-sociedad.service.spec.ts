import { TestBed, inject } from '@angular/core/testing';

import { AdministrarParametrosPorSociedadService } from './administrar-parametros-por-sociedad.service';
import { TestModule } from '../../core/mocks/test.module';

describe('AdministrarParametrosPorSociedadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdministrarParametrosPorSociedadService],
      imports: [TestModule]
    });
  });

  it('should be created', inject([AdministrarParametrosPorSociedadService],
    (service: AdministrarParametrosPorSociedadService) => {
    expect(service).toBeTruthy();
  }));
});
