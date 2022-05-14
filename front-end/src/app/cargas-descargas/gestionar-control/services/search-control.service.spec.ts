import { TestBed, inject } from '@angular/core/testing';

import { SearchControlService } from './search-control.service';
import { TestModule } from '../../../core/mocks/test.module';

describe('SearchControlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchControlService],
      imports: [
        TestModule
      ]
    });
  });

  it('should be created', inject([SearchControlService], (service: SearchControlService) => {
    expect(service).toBeTruthy();
  }));
});
