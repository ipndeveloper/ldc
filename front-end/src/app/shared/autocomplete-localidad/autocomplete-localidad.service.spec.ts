import { TestBed, inject } from '@angular/core/testing';
import { AutocompleteLocalidadService } from './autocomplete-localidad.service';
import { TestModule } from '../../core/mocks/test.module';


describe('AutocompleteLocalidadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutocompleteLocalidadService],
      imports: [TestModule]
    });
  });

  it('should be created', inject([AutocompleteLocalidadService], (service: AutocompleteLocalidadService) => {
    expect(service).toBeTruthy();
  }));
});
