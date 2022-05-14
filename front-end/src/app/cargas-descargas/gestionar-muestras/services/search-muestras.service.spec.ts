import { TestBed, inject } from '@angular/core/testing';

import { SearchMuestrasService } from './search-muestras.service';
import { ApiService } from '../../../core/services/restClient/api.service';
import { TestModule } from '../../../core/mocks/test.module';
import { Dictionary } from '../../../core/models/dictionary';

describe('SearchMuestrasService', () => {

  let filters: Dictionary<string>;

  beforeEach(() => {
    filters = new Dictionary<string>();

    TestBed.configureTestingModule({
      providers: [
        SearchMuestrasService,
        ApiService
      ],
      imports: [
        TestModule
      ]
    });
  });

  it('should be created', inject([SearchMuestrasService], (service: SearchMuestrasService) => {
    expect(service).toBeTruthy();
  }));

  describe('El metodo validateSearchClick', () => {

    it('retorna false cuando el diccionario es undefined',
       inject([SearchMuestrasService], (service: SearchMuestrasService) => {
        // Arrange

        // Act
        const result = service.validateSearchClick(undefined);

        // Assert
        expect(result).toBeFalsy();
    }));

    it('retorna true cuando la fecha desde es menor a la fecha hasta',
       inject([SearchMuestrasService], (service: SearchMuestrasService) => {
        // Arrange
        filters['fechaDesde'] = '2017-11-15';
        filters['fechaHasta'] = '2018-11-15';

        // Act
        const result = service.validateSearchClick(filters);

        // Assert
        expect(result).toBeTruthy();
    }));

    it('retorna false cuando la fecha desde es mayor a la fecha hasta',
       inject([SearchMuestrasService], (service: SearchMuestrasService) => {
        // Arrange
        filters['fechaDesde'] = '2017-11-15';
        filters['fechaHasta'] = '2016-11-15';

        // Act
        const result = service.validateSearchClick(filters);

        // Assert
        expect(result).toBeFalsy();
    }));
  });

  describe('El metodo getData', () => {

    it('invoca al metodo get del apiService',
      inject([SearchMuestrasService, ApiService], (service: SearchMuestrasService, apiService: ApiService) => {
        // Arrange
        spyOn(apiService, 'get');

        // Act
        service.getData(filters);

        // Assert
        expect(apiService.get).toHaveBeenCalled();
        expect(apiService.get).toHaveBeenCalledTimes(1);
    }));

  });

});
