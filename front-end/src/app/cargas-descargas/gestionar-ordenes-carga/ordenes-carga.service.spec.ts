import { TestBed } from '@angular/core/testing';

import { OrdenesCargaService } from './ordenes-carga.service';
import { TestModule } from '../../core/mocks/test.module';
import { ApiService } from '../../core/services/restClient/api.service';

describe('OrdenesCargaService', () => {

  let service: OrdenesCargaService;
  let apiService: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [OrdenesCargaService],
    });

    service = TestBed.get(OrdenesCargaService);

    apiService = TestBed.get(ApiService);
    spyOn(apiService, 'get');
    spyOn(apiService, 'post');
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
