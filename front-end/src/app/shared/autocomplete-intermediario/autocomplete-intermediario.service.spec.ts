import { TestBed } from '@angular/core/testing';
import { AutocompleteIntermediarioService } from './autocomplete-intermediario.service';
import { TestModule } from '../../core/mocks/test.module';

describe('AutocompleteRemitenteComercialService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutocompleteIntermediarioService],
      imports: [TestModule]
    });
  });

  it('should be created', () => {
    const service: AutocompleteIntermediarioService = TestBed.get(AutocompleteIntermediarioService);
    expect(service).toBeTruthy();
  });
});
