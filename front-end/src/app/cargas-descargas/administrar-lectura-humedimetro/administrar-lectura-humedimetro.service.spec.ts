import { TestBed, inject } from '@angular/core/testing';

import { AdministrarLecturaHumedimetroService } from './administrar-lectura-humedimetro.service';
import { TestModule } from '../../core/mocks/test.module';

describe('AdministrarLecturaHumedimetroService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule
      ],
      providers: [AdministrarLecturaHumedimetroService]
    });
  });

  it('should be created', inject([AdministrarLecturaHumedimetroService], (service: AdministrarLecturaHumedimetroService) => {
    expect(service).toBeTruthy();
  }));
});
