import { TestBed, inject } from '@angular/core/testing';

import { CalidadMovimientoCerealService } from './calidad-movimiento-cereal.service';
import { TestModule } from '../../../core/mocks/test.module';

describe('CalidadMovimientoCerealService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalidadMovimientoCerealService],
      imports: [TestModule]
    });
  });

  it('should be created', inject([CalidadMovimientoCerealService], (service: CalidadMovimientoCerealService) => {
    expect(service).toBeTruthy();
  }));
});
