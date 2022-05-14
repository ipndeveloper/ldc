import { TestBed, inject } from '@angular/core/testing';

import { RegistrarPesadaVagonService } from './registrar-pesada-vagon.service';
import { TestModule } from '../../core/mocks/test.module';

describe('RegistrarPesadaVagonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [RegistrarPesadaVagonService]
    });
  });

  it('should be created', inject([RegistrarPesadaVagonService], (service: RegistrarPesadaVagonService) => {
    expect(service).toBeTruthy();
  }));
});
