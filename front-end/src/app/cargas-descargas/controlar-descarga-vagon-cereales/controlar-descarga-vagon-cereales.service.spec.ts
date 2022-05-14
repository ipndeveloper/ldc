import { TestBed, inject } from '@angular/core/testing';
import { ControlarDescargaVagonCerealesService } from './controlar-descarga-vagon-cereales.service';
import { TestModule } from '../../core/mocks/test.module';
import { HttpClientModule } from '@angular/common/http';

describe('ControlarDescargaVagonCerealesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        TestModule
      ],
      providers: [
        ControlarDescargaVagonCerealesService,
      ]
    });
  });

  it('should be created', inject([ControlarDescargaVagonCerealesService], (service: ControlarDescargaVagonCerealesService) => {
    expect(service).toBeTruthy();
  }));
});
