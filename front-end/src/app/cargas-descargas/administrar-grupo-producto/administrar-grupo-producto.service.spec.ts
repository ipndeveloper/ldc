import { TestBed, inject } from '@angular/core/testing';

import { AdministrarGrupoProductoService } from './administrar-grupo-producto.service';
import { TestModule } from '../../core/mocks/test.module';
import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AdministrarGrupoProductoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule,
        HttpClientModule
      ],
      providers: [AdministrarGrupoProductoService],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  });

  it('should be created', inject([AdministrarGrupoProductoService],
    (service: AdministrarGrupoProductoService) => {
    expect(service).toBeTruthy();
  }));
});
