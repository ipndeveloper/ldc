import { TestBed, inject } from '@angular/core/testing';

import { DescargaEventsNotifierService } from './descarga-events-notifier.service';

describe('DescargaEventsNotifierService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DescargaEventsNotifierService]
    });
  });

  it('should be created', inject([DescargaEventsNotifierService], (service: DescargaEventsNotifierService) => {
    expect(service).toBeTruthy();
  }));
});
