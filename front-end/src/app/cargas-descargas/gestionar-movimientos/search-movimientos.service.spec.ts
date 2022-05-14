import { TestBed } from '@angular/core/testing';

import { SearchMovimientosService } from './search-movimientos.service';
import { TestModule } from '../../core/mocks/test.module';
import { ApiService } from '../../core/services/restClient/api.service';
import { Dictionary } from '../../core/models/dictionary';

describe('SearchMovimientosService', () => {
  let apiService: ApiService;
  let service: SearchMovimientosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchMovimientosService],
      imports: [TestModule]
    });
    apiService = TestBed.get(ApiService);
    service = TestBed.get(SearchMovimientosService);
    spyOn(apiService, 'get').and.returnValue('');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('El metodo getData', () => {
    it('Invoca al get del apiService ', () => {
      // Arrange
      const dict = new Dictionary<string>();
      dict['opcionFiltro'] = {id: 1};
      // Act
      service.getData(dict);
      // Assert
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });

  });
});
