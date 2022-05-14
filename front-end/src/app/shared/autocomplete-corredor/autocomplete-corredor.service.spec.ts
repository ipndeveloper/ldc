import { TestBed } from '@angular/core/testing';
import { AutocompleteCorredorService } from './autocomplete-corredor.service';
import { TestModule } from '../../core/mocks/test.module';

describe('AutocompleteCorredorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutocompleteCorredorService],
      imports: [TestModule]
    });
  });

  it('should be created', () => {
    const service: AutocompleteCorredorService = TestBed.get(AutocompleteCorredorService);
    expect(service).toBeTruthy();
  });
});
