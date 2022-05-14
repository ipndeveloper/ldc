import { TestBed, inject } from '@angular/core/testing';

import { FormatoPatenteService } from './formato-patente.service';
import { TestModule } from '../../../core/mocks/test.module';

describe('FormatoPatenteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormatoPatenteService],
      imports: [
        TestModule
    ],
    });
  });

  it('should be created', inject([FormatoPatenteService], (service: FormatoPatenteService) => {
    expect(service).toBeTruthy();
  }));
});
