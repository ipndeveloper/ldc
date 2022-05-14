import { TestBed, inject } from '@angular/core/testing';

import { AdministrarParametrosPorTerminalService } from './administrar-parametros-por-terminal.service';
import { TestModule } from '../../core/mocks/test.module';

describe('AdministrarParametrosPorTerminalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdministrarParametrosPorTerminalService],
      imports: [TestModule]
    });
  });

  it('should be created', inject([AdministrarParametrosPorTerminalService], (service: AdministrarParametrosPorTerminalService) => {
    expect(service).toBeTruthy();
  }));
});
