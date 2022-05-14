import { TestBed, inject } from '@angular/core/testing';

import { AutocompleteService } from './autocomplete.service';
import { TestModule } from '../../mocks/test.module';

describe('AutocompleteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutocompleteService],
      imports: [TestModule]
    });
  });

  it('should be created', inject([AutocompleteService], (service: AutocompleteService<any>) => {
    expect(service).toBeTruthy();
  }));
});
