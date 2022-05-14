import { TestBed, inject } from '@angular/core/testing';

import { AgregarAlSobreTransporteService } from './agregar-al-sobre-transporte.service';
import { configureTestSuite } from '../../../core/mocks/testing';
import { TestModule } from '../../../core/mocks/test.module';

describe('AgregarAlSobreTransporteService', () => {
  configureTestSuite(() => {
    TestBed.configureTestingModule({
      providers: [AgregarAlSobreTransporteService],
      imports: [TestModule]
    });
  });

  it('should be created', inject([AgregarAlSobreTransporteService], (service: AgregarAlSobreTransporteService) => {
    expect(service).toBeTruthy();
  }));
});
