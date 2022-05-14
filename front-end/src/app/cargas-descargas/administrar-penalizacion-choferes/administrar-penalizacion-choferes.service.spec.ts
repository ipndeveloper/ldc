import { TestBed, inject } from '@angular/core/testing';
import { AdministrarPenalizacionChoferesService } from './administrar-penalizacion-choferes.service';
import { ApiService } from '../../core/services/restClient/api.service';
import { TestModule } from '../../core/mocks/test.module';


describe('PenalizacionChoferService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule
      ],
      providers: [AdministrarPenalizacionChoferesService, ApiService]
    });
  });

  it('should be created', inject([AdministrarPenalizacionChoferesService], (service: AdministrarPenalizacionChoferesService) => {
    expect(service).toBeTruthy();
  }));
});
