import { inject, TestBed } from '@angular/core/testing';
import { TestModule } from '../../core/mocks/test.module';

import { ReimprimirObleaLaboratorioService } from './reimprimir-oblea-laboratorio.service';

describe('ReimprimirObleaLaboratorioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
    providers: [ReimprimirObleaLaboratorioService],
      imports: [
        TestModule
      ]
  });
});

  it('should be created', inject([ReimprimirObleaLaboratorioService], (service: ReimprimirObleaLaboratorioService) => {
    expect(service).toBeTruthy();
  }));
});
