import { TestBed, inject } from '@angular/core/testing';

import { ParametrosService } from './parametros.service';
import { TestModule } from '../../core/mocks/test.module';
import { ApiService } from '../../core/services/restClient/api.service';

describe('ParametrosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ParametrosService,
        ApiService
      ],
      imports: [TestModule],
    });
  });

  it('should be created', inject([ParametrosService], (service: ParametrosService) => {
    expect(service).toBeTruthy();
  }));
});
