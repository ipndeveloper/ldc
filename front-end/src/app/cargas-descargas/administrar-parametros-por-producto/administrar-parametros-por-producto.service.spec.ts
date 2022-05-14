import { TestBed, inject } from '@angular/core/testing';
import { AdministrarParametrosPorProductoService } from './administrar-parametros-por-producto.service';
import { TestModule } from '../../core/mocks/test.module';

describe('AdministrarParametrosPorProductoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdministrarParametrosPorProductoService],
      imports: [TestModule]
    });
  });

  it('should be created', inject([AdministrarParametrosPorProductoService], (service: AdministrarParametrosPorProductoService) => {
    expect(service).toBeTruthy();
  }));
});
