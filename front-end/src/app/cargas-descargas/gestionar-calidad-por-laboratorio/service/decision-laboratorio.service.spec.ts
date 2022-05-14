import { TestBed, inject } from '@angular/core/testing';

import { DecisionLaboratorioService } from './decision-laboratorio.service';
import { TestModule } from '../../../core/mocks/test.module';

describe('DecisionLaboratorioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DecisionLaboratorioService],
      imports: [TestModule]
    });
  });

  it('should be created', inject([DecisionLaboratorioService], (service: DecisionLaboratorioService) => {
    expect(service).toBeTruthy();
  }));
});
