import { TestBed } from '@angular/core/testing';
import { CosechaService } from './cosecha.service';
import { TestModule } from '../../core/mocks/test.module';
import { ApiService } from '../../core/services/restClient/api.service';
import { configureTestSuite } from '../../core/mocks/testing';
import { Cosecha } from '../data-models/cosecha';
import { of } from 'rxjs/internal/observable/of';

describe('CosechaService', () => {
  let apiService: any;
  let service: CosechaService;
  configureTestSuite(() => {
    apiService = jasmine.createSpyObj('ApiService', ['get']);
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [CosechaService,
      {provide: ApiService, useValue: apiService}]
    });
    service = TestBed.get(CosechaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('El metodo getCosechasPorProducto()', () => {
    it('invoca al metodo get del apiService', () => {
      const cosecha: Cosecha[] = [];
      apiService.get.and.returnValue(of(cosecha));
      service.getCosechasPorProducto(1);

      expect(apiService.get).toHaveBeenCalledWith(`cosecha?idProducto=${1}`);
    });
  });
});
