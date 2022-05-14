import { TestBed } from '@angular/core/testing';
import { AutocompleteEntregadorService } from './autocomplete-entregador.service';
import { TestModule } from '../../core/mocks/test.module';

describe('AutocompleteRemitenteComercialService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutocompleteEntregadorService],
      imports: [TestModule]
    });
  });

  it('should be created', () => {
    const service: AutocompleteEntregadorService = TestBed.get(AutocompleteEntregadorService);
    expect(service).toBeTruthy();
  });
});
