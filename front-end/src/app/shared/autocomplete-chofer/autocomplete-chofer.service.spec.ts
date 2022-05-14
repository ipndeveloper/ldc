import { TestBed } from '@angular/core/testing';
import { AutocompleteChoferService } from './autocomplete-chofer.service';
import { TestModule } from '../../core/mocks/test.module';

describe('AutocompleteRemitenteComercialService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutocompleteChoferService],
      imports: [TestModule]
    });
  });

  it('should be created', () => {
    const service: AutocompleteChoferService = TestBed.get(AutocompleteChoferService);
    expect(service).toBeTruthy();
  });
});
