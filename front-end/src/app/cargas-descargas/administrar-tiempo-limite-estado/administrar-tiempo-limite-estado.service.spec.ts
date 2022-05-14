import { TestBed, inject } from '@angular/core/testing';
import { AdministrarTiempoLimiteEstadoService } from './administrar-tiempo-limite-estado.service';
import { ApiService } from '../../core/services/restClient/api.service';
import { TestModule } from '../../core/mocks/test.module';
import { HttpClientModule } from '@angular/common/http';

describe('AdministrarTiempoLimiteEstadoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AdministrarTiempoLimiteEstadoService,
        ApiService
      ],
      imports: [
        TestModule,
        HttpClientModule
      ]
    });
  });

  it('should be created', inject([AdministrarTiempoLimiteEstadoService], (service: AdministrarTiempoLimiteEstadoService) => {
    expect(service).toBeTruthy();
  }));
});
