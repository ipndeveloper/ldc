import { TestBed, inject } from '@angular/core/testing';

import { VagonService } from './vagon.service';
import { TestModule } from '../../core/mocks/test.module';

describe('VagonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule
      ],
      providers: [VagonService]
    });
  });

  it('should be created', inject([VagonService], (service: VagonService) => {
    expect(service).toBeTruthy();
  }));
});
