import { TestBed, inject } from '@angular/core/testing';
import { ControlarCalidadCamionCargaService } from './controlar-calidad-camion-carga.service';
import { TestModule } from '../../core/mocks/test.module';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../../core/services/restClient/api.service';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';

describe('ControlarCalidadCamionCargaService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule,
        HttpClientModule,
      ],
      providers: [
        ControlarCalidadCamionCargaService,
        SearchFormActionsNotifierService,
        ExcelService,
        ApiService
      ]
    });

  });

  it('should be created',
    inject([ControlarCalidadCamionCargaService],
    (service: ControlarCalidadCamionCargaService) => {
      expect(service).toBeTruthy();
  }));
});
