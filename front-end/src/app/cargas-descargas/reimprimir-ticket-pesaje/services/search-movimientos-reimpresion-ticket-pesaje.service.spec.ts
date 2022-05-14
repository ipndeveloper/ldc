import { TestBed, inject } from '@angular/core/testing';

import { SearchMovimientosReimpresionTicketPesajeService } from './search-movimientos-reimpresion-ticket-pesaje.service';
import { TestModule } from '../../../core/mocks/test.module';

describe('SearchMovimientosReimpresionTicketPesajeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchMovimientosReimpresionTicketPesajeService],
      imports: [
        TestModule
      ]
    });
  });

  it('should be created', inject([SearchMovimientosReimpresionTicketPesajeService],
    (service: SearchMovimientosReimpresionTicketPesajeService) => {

    expect(service).toBeTruthy();
  }));
});
