import { TestBed, inject } from '@angular/core/testing';


import { FileService } from './file.service';
import { TestModule } from '../../mocks/test.module';

describe('FileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FileService
      ],
      imports: [
        TestModule
      ]
    });
  });

  it('should be created', inject([FileService], (service: FileService) => {
    expect(service).toBeTruthy();
  }));
});
