import { TestBed } from '@angular/core/testing';
import { AutocompleteDestinatarioService } from './autocomplete-destinatario.service';
import { TestModule } from '../../core/mocks/test.module';

describe('AutocompleteDestinatarioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutocompleteDestinatarioService],
      imports: [TestModule]
    });
  });

  it('should be created', () => {
    const service: AutocompleteDestinatarioService = TestBed.get(AutocompleteDestinatarioService);
    expect(service).toBeTruthy();
  });
});
