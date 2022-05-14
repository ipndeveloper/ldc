import { TestBed, inject } from '@angular/core/testing';
import { AdministrarTarjetaAutorizacionService } from './administrar-tarjeta-autorizacion.service';
import { TestModule } from '../../core/mocks/test.module';

describe('AdministrarTarjetaAutorizacionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdministrarTarjetaAutorizacionService],
      imports: [TestModule]
    });
  });

  it('should be created', inject([AdministrarTarjetaAutorizacionService], (service: AdministrarTarjetaAutorizacionService) => {
    expect(service).toBeTruthy();
  }));
});
