import { inject, TestBed } from '@angular/core/testing';
import { TestModule } from '../../core/mocks/test.module';

import { AutocompletePlantaService } from './autocomplete-planta.service';

describe('AutocompletePlantaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutocompletePlantaService],
      imports: [TestModule]
    });
  });

  it('should be created', inject([AutocompletePlantaService], (service: AutocompletePlantaService) => {
    expect(service).toBeTruthy();
  }));
});
