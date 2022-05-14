import { TestBed, inject } from '@angular/core/testing';

import { AdministrarAutorizacionesBalanzaService } from './administrar-autorizaciones-balanza.service';
import { TestModule } from '../../core/mocks/test.module';

describe('AdministrarAutorizacionesBalanzaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdministrarAutorizacionesBalanzaService],
      imports: [TestModule]
    });
  });

  it('should be created', inject([AdministrarAutorizacionesBalanzaService], (service: AdministrarAutorizacionesBalanzaService) => {
    expect(service).toBeTruthy();
  }));
});
