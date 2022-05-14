import { TestBed, inject } from '@angular/core/testing';
import { AdministrarTipoDocumentoPorteTipoProductoService } from './administrar-tipo-documento-porte-tipo-producto.service';
import { TestModule } from '../../core/mocks/test.module';

describe('AdministrarTipoDocumentoPorteTipoProductoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdministrarTipoDocumentoPorteTipoProductoService],
      imports: [TestModule],
    });
  });

  it('should be created', inject([AdministrarTipoDocumentoPorteTipoProductoService],
                          (service: AdministrarTipoDocumentoPorteTipoProductoService) => {
    expect(service).toBeTruthy();
  }));
});
