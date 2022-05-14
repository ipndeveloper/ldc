import { TestBed, inject } from '@angular/core/testing';
import { AutocompleteSedeService } from './autocomplete-sede.service';
import { TestModule } from '../../../core/mocks/test.module';

describe('AutocompleteSedeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutocompleteSedeService],
      imports: [TestModule]
    });
  });

  it('should be created', inject([AutocompleteSedeService], (service: AutocompleteSedeService) => {
    expect(service).toBeTruthy();
  }));
});
