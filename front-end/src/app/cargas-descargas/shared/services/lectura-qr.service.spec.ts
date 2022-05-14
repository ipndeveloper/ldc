import { TestBed, inject } from '@angular/core/testing';
import { LecturaQRService } from './lectura-qr.service';
import { TestModule } from '../../../core/mocks/test.module';

describe('LecturaQRService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LecturaQRService],
      imports: [TestModule]
    });
  });

  it('should be created', inject([LecturaQRService], (service: LecturaQRService) => {
    expect(service).toBeTruthy();
  }));
});
