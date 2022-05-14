import { TestBed, inject } from '@angular/core/testing';
import { TestModule } from '../../core/mocks/test.module';
import { AutocompleteFerrocarrilService } from './autocomplete-ferrocarril.service';

describe('AutocompleteFerrocarrilService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutocompleteFerrocarrilService],
      imports: [TestModule]
    });
  });

  it('should be created', inject([AutocompleteFerrocarrilService], (service: AutocompleteFerrocarrilService) => {
    expect(service).toBeTruthy();
  }));
});
