import { TestBed, inject } from '@angular/core/testing';

import { AdministrarParametrosPorRubroCalidadService } from './administrar-parametros-por-rubro-calidad.service';
import { TestModule } from '../../core/mocks/test.module';

describe('AdministrarParametrosPorRubroCalidadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdministrarParametrosPorRubroCalidadService],
      imports: [TestModule]
    });
  });

  it('should be created', inject([AdministrarParametrosPorRubroCalidadService], (service: AdministrarParametrosPorRubroCalidadService) => {
    expect(service).toBeTruthy();
  }));
});
