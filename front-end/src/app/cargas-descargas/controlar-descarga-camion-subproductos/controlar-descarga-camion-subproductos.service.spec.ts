import { TestBed, inject } from '@angular/core/testing';

import { ControlarDescargaCamionSubproductosService } from './controlar-descarga-camion-subproductos.service';
import { TestModule } from '../../core/mocks/test.module';

describe('ControlarDescargaCamionSubproductosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ControlarDescargaCamionSubproductosService],
      imports: [TestModule]
    });
  });

  it('should be created', inject([ControlarDescargaCamionSubproductosService], (service: ControlarDescargaCamionSubproductosService) => {
    expect(service).toBeTruthy();
  }));
});
