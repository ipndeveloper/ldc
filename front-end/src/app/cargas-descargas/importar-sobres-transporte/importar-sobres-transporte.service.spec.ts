import { TestBed, inject } from '@angular/core/testing';

import { ImportarSobresTransporteService } from './importar-sobres-transporte.service';
import { TestModule } from '../../core/mocks/test.module';

describe('ImportarSobresTransporteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImportarSobresTransporteService],
      imports: [TestModule]
    });
  });

  it('should be created', inject([ImportarSobresTransporteService], (service: ImportarSobresTransporteService) => {
    expect(service).toBeTruthy();
  }));
});
