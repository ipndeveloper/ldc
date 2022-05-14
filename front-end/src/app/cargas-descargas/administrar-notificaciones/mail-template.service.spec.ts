import { TestBed } from '@angular/core/testing';

import { MailTemplateService } from './mail-template.service';
import { TestModule } from '../../core/mocks/test.module';

describe('MailTemplateService', () => {
  let service: MailTemplateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule
      ],
      providers: [MailTemplateService]
    });

    service = TestBed.get(MailTemplateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
