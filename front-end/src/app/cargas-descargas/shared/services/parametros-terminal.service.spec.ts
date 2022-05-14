import { TestBed, inject } from '@angular/core/testing';

import { ParametrosTerminalService } from './parametros-terminal.service';
import { TestModule } from '../../../core/mocks/test.module';

describe('ParametrosTerminalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [
        TestModule
    ],
      providers: [ParametrosTerminalService]
    });
  });

  it('should be created', inject([ParametrosTerminalService], (service: ParametrosTerminalService) => {
    expect(service).toBeTruthy();
  }));
});
