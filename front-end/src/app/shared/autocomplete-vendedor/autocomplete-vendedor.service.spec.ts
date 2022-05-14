import { inject, TestBed } from '@angular/core/testing';
import { TestModule } from '../../core/mocks/test.module';

import { AutocompleteVendedorService } from './autocomplete-vendedor.service';

describe('AutocompleteVendedorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutocompleteVendedorService],
      imports: [TestModule]
    });
  });

  it('should be created', inject([AutocompleteVendedorService], (service: AutocompleteVendedorService) => {
    expect(service).toBeTruthy();
  }));
});
