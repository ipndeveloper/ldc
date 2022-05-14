import { TestBed, inject } from '@angular/core/testing';

import { TipoReporteService } from './tipo-reporte.service';
import { TestModule } from '../../../core/mocks/test.module';
import { ApiService } from '../../../core/services/restClient/api.service';

describe('TipoReporteService', () => {
  let apiService: any;
  let tipoReporteService: TipoReporteService;
  beforeEach(() => {
    apiService = jasmine.createSpyObj('ApiService', ['get']);

    TestBed.configureTestingModule({
      providers: [
      TipoReporteService,
      {provide: ApiService, useValue: apiService}],
      imports: [TestModule]
    });
    tipoReporteService = TestBed.get(TipoReporteService);
  });

  it('should be created', inject([TipoReporteService], (service: TipoReporteService) => {
    expect(service).toBeTruthy();
  }));

  describe('El metodo getAll()', () => {
    it('ejecuta el metodo get del ApiService', () => {
      tipoReporteService.getAll();

      expect(apiService.get).toHaveBeenCalledWith('tipos-reporte');
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });
  });
});
