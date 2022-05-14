import { TestBed, inject } from '@angular/core/testing';

import { MotivosNoDescargaService } from './motivos-no-descarga.service';
import { TestModule } from '../../../../core/mocks/test.module';

describe('MotivosNoDescargaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ TestModule ],
      providers: [MotivosNoDescargaService]
    });
  });

  it('should be created', inject([MotivosNoDescargaService], (service: MotivosNoDescargaService) => {
    expect(service).toBeTruthy();
  }));
});
