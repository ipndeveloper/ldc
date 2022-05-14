import { TestBed, inject } from '@angular/core/testing';

import { GestionarCalidadPorLaboratorioService } from './gestionar-calidad-por-laboratorio.service';
import { TestModule } from '../../../core/mocks/test.module';

describe('GestionarCalidadPorLaboratorioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GestionarCalidadPorLaboratorioService],
      imports: [TestModule]
    });
  });

  it('should be created', inject([GestionarCalidadPorLaboratorioService], (service: GestionarCalidadPorLaboratorioService) => {
    expect(service).toBeTruthy();
  }));
});
