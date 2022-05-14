import { TestBed, inject } from '@angular/core/testing';

import { ControlarDescargaCamionCerealesService } from './controlar-descarga-camion-cereales.service';
import { HttpClientModule } from '@angular/common/http';
import { TestModule } from '../../core/mocks/test.module';

describe('ControlarDescargaCamionCerealesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        TestModule
      ],
      providers: [
        ControlarDescargaCamionCerealesService
      ]
    });
  });


  it('should be created', inject([ControlarDescargaCamionCerealesService], (service: ControlarDescargaCamionCerealesService) => {
    expect(service).toBeTruthy();
  }));
});
