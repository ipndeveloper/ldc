import { TestBed } from '@angular/core/testing';

import { AdministrarCaracteristicasService } from './administrar-caracteristicas.service';
import { ApiService } from '../../core/services/restClient/api.service';
import { Dictionary } from '../../core/models/dictionary';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { TestModule } from '../../core/mocks/test.module';

describe('AdministrarCaracteristicasService', () => {
  let apiService: ApiService;
  let filtros: Dictionary<string>;
  let service: AdministrarCaracteristicasService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule,
        HttpClientModule
      ],
      providers: [
        AdministrarCaracteristicasService],
        schemas: [ NO_ERRORS_SCHEMA ]
    });
    apiService = TestBed.get(ApiService);
    service = TestBed.get(AdministrarCaracteristicasService);
    spyOn(service, 'getQuerystringParameter').and.returnValue('');
    spyOn(apiService, 'get');
    spyOn(apiService, 'post');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('El metodo getData', () => {

    it('invoca al metodo get del apiService', () => {
      // Arrange

      // Act
      service.getData(filtros);

      // Assert
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });
  });

  describe('El metodo validateSearchClick', () => {
    it('retorna true cuando se completo el filtro circuito', () => {
      // Arrange
      filtros = new Dictionary<string>();
      filtros.add('circuito', '1');
      // Act
      const resultado = service.validateSearchClick(filtros);

      // Assert
      expect(resultado).toBeTruthy();
    });
  });

});
