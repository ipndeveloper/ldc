import { TestBed } from '@angular/core/testing';

import { ReimprimirDocumentoPorteService } from './reimprimir-documento-porte.service';
import { TestModule } from '../../core/mocks/test.module';

describe('ReimprimirDocumentoPorteService', () => {
  let service: ReimprimirDocumentoPorteService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [ReimprimirDocumentoPorteService]
    });
    service = TestBed.get(ReimprimirDocumentoPorteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
