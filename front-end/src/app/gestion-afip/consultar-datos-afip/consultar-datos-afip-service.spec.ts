import { TestBed, inject } from '@angular/core/testing';

import { ConsultarDatosAfipService } from './consultar-datos-afip-service';
import { TestModule } from '../../core/mocks/test.module';

describe('ConsultarDatosAfipServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConsultarDatosAfipService],
      imports: [TestModule]
    });
  });

  it('should be created', inject([ConsultarDatosAfipService], (service: ConsultarDatosAfipService) => {
    expect(service).toBeTruthy();
  }));
});
