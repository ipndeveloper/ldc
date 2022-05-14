import { TestBed, inject } from '@angular/core/testing';

import { VersionCheckService } from './version-check.service';
import { TestModule } from '../../mocks/test.module';

describe('VersionCheckService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VersionCheckService],
      imports: [TestModule]
    });
  });

  it('should be created', inject([VersionCheckService], (service: VersionCheckService) => {
    expect(service).toBeTruthy();
  }));
});
