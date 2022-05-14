import { TestBed, inject } from '@angular/core/testing';

import { ModificarControlDescargaCamionInsumosService } from './modificar-control-descarga-camion-insumos.service';
import { HttpClientModule } from '@angular/common/http';
import { TestModule } from '../../../core/mocks/test.module';

describe('ModificarControlDescargaCamionInsumosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        TestModule
    ],
      providers: [ModificarControlDescargaCamionInsumosService]
    });
  });

  it('should be created', inject([ModificarControlDescargaCamionInsumosService],
            (service: ModificarControlDescargaCamionInsumosService) => {
    expect(service).toBeTruthy();
  }));
});
