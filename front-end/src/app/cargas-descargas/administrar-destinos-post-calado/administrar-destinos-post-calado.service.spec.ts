import { TestBed, inject } from '@angular/core/testing';
import { AdministrarDestinosPostCaladoService } from './administrar-destinos-post-calado.service';
import { TestModule } from '../../core/mocks/test.module';

describe('AdministrarDestinosPostCaladoService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdministrarDestinosPostCaladoService],
      imports: [TestModule],
    });
  });

  it('should be created', inject([AdministrarDestinosPostCaladoService], (service: AdministrarDestinosPostCaladoService) => {
    expect(service).toBeTruthy();
  }));
});
