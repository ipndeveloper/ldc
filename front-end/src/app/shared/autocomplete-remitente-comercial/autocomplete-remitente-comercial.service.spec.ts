import { TestBed } from '@angular/core/testing';
import { AutocompleteRemitenteComercialService } from './autocomplete-remitente-comercial.service';
import { TestModule } from '../../core/mocks/test.module';

describe('AutocompleteRemitenteComercialService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutocompleteRemitenteComercialService],
      imports: [TestModule]
    });
  });

  it('should be created', () => {
    const service: AutocompleteRemitenteComercialService = TestBed.get(AutocompleteRemitenteComercialService);
    expect(service).toBeTruthy();
  });
});
