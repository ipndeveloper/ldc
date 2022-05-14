import { TestBed, inject } from '@angular/core/testing';

import { AutocompleteProductoService } from './autocomplete-producto.service';
import { TestModule } from '../../../core/mocks/test.module';

describe('AutocompleteProductoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutocompleteProductoService],
      imports: [TestModule]
    });
  });

  it('should be created', inject([AutocompleteProductoService], (service: AutocompleteProductoService) => {
    expect(service).toBeTruthy();
  }));
});
