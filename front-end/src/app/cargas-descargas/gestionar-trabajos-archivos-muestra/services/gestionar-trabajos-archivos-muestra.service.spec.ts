import { TestBed, inject } from '@angular/core/testing';

import { GestionarTrabajosArchivosMuestraService } from './gestionar-trabajos-archivos-muestra.service';
import { TestModule } from '../../../core/mocks/test.module';

describe('GestionarTrabajosArchivosMuestraService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GestionarTrabajosArchivosMuestraService
      ],
      imports: [
        TestModule
      ]
    });
  });

  it('should be created', inject([GestionarTrabajosArchivosMuestraService], (service: GestionarTrabajosArchivosMuestraService) => {
    expect(service).toBeTruthy();
  }));
});
