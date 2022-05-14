import { TestBed } from '@angular/core/testing';

import { AdministrarRestriccionesPorPuestoTrabajoService } from './administrar-restricciones-por-puesto-trabajo.service';
import { ApiService } from '../../core/services/restClient/api.service';
import { HttpClientModule } from '@angular/common/http';
import { TestModule } from '../../core/mocks/test.module';

describe('AdministrarRestriccionesPorPuestoTrabajoService', () => {
  let service: AdministrarRestriccionesPorPuestoTrabajoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdministrarRestriccionesPorPuestoTrabajoService, ApiService],
      imports: [
        TestModule,
        HttpClientModule
      ]
    });
    service = TestBed.get(AdministrarRestriccionesPorPuestoTrabajoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
