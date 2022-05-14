import { TestBed, inject } from '@angular/core/testing';

import { SearchByDateRangeService } from './search-by-date-range.service';
import { TestModule } from '../mocks/test.module';

describe('SearchByDateRangeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [SearchByDateRangeService]
    });
  });

  it('should be created', inject([SearchByDateRangeService], (service: SearchByDateRangeService<any>) => {
    expect(service).toBeTruthy();
  }));
});
