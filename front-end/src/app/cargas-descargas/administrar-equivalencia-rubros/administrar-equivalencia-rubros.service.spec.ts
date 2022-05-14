import { TestBed, inject } from '@angular/core/testing';

import { AdministrarEquivalenciaRubrosService } from './administrar-equivalencia-rubros.service';
import { TestModule } from '../../core/mocks/test.module';

describe('AdministrarEquivalenciaRubrosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdministrarEquivalenciaRubrosService],
      imports: [TestModule],
    });
  });

  it('should be created', inject([AdministrarEquivalenciaRubrosService], (service: AdministrarEquivalenciaRubrosService) => {
    expect(service).toBeTruthy();
  }));
});
