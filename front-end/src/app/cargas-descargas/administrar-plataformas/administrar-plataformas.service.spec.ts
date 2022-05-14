import { TestBed, inject } from '@angular/core/testing';

import { AdministrarPlataformasService } from './administrar-plataformas.service';
import { TestModule } from '../../core/mocks/test.module';
import { ApiService } from '../../core/services/restClient/api.service';

describe('AdministrarPlataformasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ TestModule],
      providers: [AdministrarPlataformasService, ApiService]
    });
  });

  it('should be created', inject([AdministrarPlataformasService], (service: AdministrarPlataformasService) => {
    expect(service).toBeTruthy();
  }));
});
