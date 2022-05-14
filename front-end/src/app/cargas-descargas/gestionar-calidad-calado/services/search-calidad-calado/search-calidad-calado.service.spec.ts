import { TestBed, inject } from '@angular/core/testing';

import { SearchCalidadCaladoService } from './search-calidad-calado.service';
import { TestModule } from '../../../../core/mocks/test.module';

describe('SearchCalidadCaladoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SearchCalidadCaladoService
      ],
      imports: [
        TestModule
    ],
    });
  });

  it('should be created', inject([SearchCalidadCaladoService], (service: SearchCalidadCaladoService) => {
    expect(service).toBeTruthy();
  }));
});
