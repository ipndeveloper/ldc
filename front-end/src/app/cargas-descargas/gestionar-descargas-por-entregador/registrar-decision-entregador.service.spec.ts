import { TestBed, inject } from '@angular/core/testing';

import { RegistrarDecisionEntregadorService } from './registrar-decision-entregador.service';
import { TestModule } from '../../core/mocks/test.module';

describe('RegistrarDecisionEntregadorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [RegistrarDecisionEntregadorService]
    });
  });

  it('should be created', inject([RegistrarDecisionEntregadorService], (service: RegistrarDecisionEntregadorService) => {
    expect(service).toBeTruthy();
  }));
});
