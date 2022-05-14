import { TestBed, inject } from '@angular/core/testing';

import { ReimpresionTicketCalidadService } from './reimpresion-ticket-calidad.service';
import { TestModule } from '../../../core/mocks/test.module';

describe('ReimpresionTicketCalidadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReimpresionTicketCalidadService],
      imports: [
        TestModule
      ]
    });
  });

  it('should be created', inject([ReimpresionTicketCalidadService], (service: ReimpresionTicketCalidadService) => {
    expect(service).toBeTruthy();
  }));
});
