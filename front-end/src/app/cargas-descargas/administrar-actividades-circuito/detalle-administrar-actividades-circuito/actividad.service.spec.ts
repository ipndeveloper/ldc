import { TestBed, inject } from '@angular/core/testing';

import { ActividadService } from './actividad.service';
import { TestModule } from '../../../core/mocks/test.module';

describe('ActividadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActividadService],
      imports: [TestModule],
    });
  });

  it('should be created', inject([ActividadService], (service: ActividadService) => {
    expect(service).toBeTruthy();
  }));
});
