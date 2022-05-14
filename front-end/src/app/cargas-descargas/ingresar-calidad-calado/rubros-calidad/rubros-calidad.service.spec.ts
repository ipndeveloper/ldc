import { TestBed, inject } from '@angular/core/testing';

import { RubrosCalidadService } from './rubros-calidad.service';
import { TestModule } from '../../../core/mocks/test.module';

describe('RubrosCalidadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule
      ],
      providers: [RubrosCalidadService]
    });
  });

  it('should be created', inject([RubrosCalidadService], (service: RubrosCalidadService) => {
    expect(service).toBeTruthy();
  }));
});
