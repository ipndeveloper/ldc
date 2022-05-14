import { TestBed, inject } from '@angular/core/testing';

import { ControlarPesajeEnBalanzaService } from './controlar-pesaje-en-balanza.service';
import { TestModule } from '../../../core/mocks/test.module';

describe('ControlarPesajeEnBalanzaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ControlarPesajeEnBalanzaService],
      imports: [
        TestModule
      ]
    });
  });

  it('should be created', inject([ControlarPesajeEnBalanzaService], (service: ControlarPesajeEnBalanzaService) => {
    expect(service).toBeTruthy();
  }));
});
