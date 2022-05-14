import { TestBed, inject } from '@angular/core/testing';

import { AdministrarRangosCodigoBarraCamaraService } from './administrar-rangos-codigo-barra-camara.service';
import { TestModule } from '../../core/mocks/test.module';

describe('AdministrarRangosCodigoBarraCamaraService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdministrarRangosCodigoBarraCamaraService],
      imports: [TestModule]
    });
  });

  it('should be created', inject([AdministrarRangosCodigoBarraCamaraService], (service: AdministrarRangosCodigoBarraCamaraService) => {
    expect(service).toBeTruthy();
  }));
});
