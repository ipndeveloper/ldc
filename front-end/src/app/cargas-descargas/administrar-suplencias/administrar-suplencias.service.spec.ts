import { TestBed, inject } from '@angular/core/testing';

import { AdministrarSuplenciasService } from './administrar-suplencias.service';
import { TestModule } from '../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AdministrarSuplenciasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdministrarSuplenciasService],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  it('should be created', inject([AdministrarSuplenciasService], (service: AdministrarSuplenciasService) => {
    expect(service).toBeTruthy();
  }));
});
