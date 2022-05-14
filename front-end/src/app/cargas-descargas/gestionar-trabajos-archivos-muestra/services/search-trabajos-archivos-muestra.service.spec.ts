import { TestBed, inject } from '@angular/core/testing';

import { SearchTrabajosArchivosMuestraService } from './search-trabajos-archivos-muestra.service';
import { TestModule } from '../../../core/mocks/test.module';
import { ParametrosTerminalService } from '../../shared/services/parametros-terminal.service';

describe('SearchTrabajosArchivosMuestraService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SearchTrabajosArchivosMuestraService,
        ParametrosTerminalService
      ],
      imports: [
        TestModule
      ]
    });
  });

  it('should be created', inject([SearchTrabajosArchivosMuestraService], (service: SearchTrabajosArchivosMuestraService) => {
    expect(service).toBeTruthy();
  }));
});
