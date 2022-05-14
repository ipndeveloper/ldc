import { TestBed, inject } from '@angular/core/testing';

import { ModificarProductoFueraCircuitoService } from './modificar-producto-fuera-circuito.service';
import { TestModule } from '../../../../core/mocks/test.module';

describe('ModificarProductoFueraCircuitoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModificarProductoFueraCircuitoService],
      imports: [TestModule]
    });
  });

  it('should be created', inject([ModificarProductoFueraCircuitoService], (service: ModificarProductoFueraCircuitoService) => {
    expect(service).toBeTruthy();
  }));
});
