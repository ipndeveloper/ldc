import { TestBed } from '@angular/core/testing';
import { AutocompleteIntermediarioFleteService } from './autocomplete-intermediario-flete.service';
import { TestModule } from '../../core/mocks/test.module';

describe('AutocompleteRemitenteComercialService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutocompleteIntermediarioFleteService],
      imports: [TestModule]
    });
  });

  it('should be created', () => {
    const service: AutocompleteIntermediarioFleteService = TestBed.get(AutocompleteIntermediarioFleteService);
    expect(service).toBeTruthy();
  });
});
