import { TestBed, inject } from '@angular/core/testing';

import { GestionarMuestrasService } from './gestionar-muestras.service';
import { TestModule } from '../../../core/mocks/test.module';

describe('GestionarMuestrasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GestionarMuestrasService
      ],
      imports: [
        TestModule
      ]
    });
  });

  it('should be created', inject([GestionarMuestrasService], (service: GestionarMuestrasService) => {
    expect(service).toBeTruthy();
  }));
});
