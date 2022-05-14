import { TestBed } from '@angular/core/testing';

import { DecisionCalidadService } from './decision-calidad.service';
import { TestModule } from '../../core/mocks/test.module';
import { ApiService } from '../../core/services/restClient/api.service';

describe('DecisionCalidadService', () => {
  let service: DecisionCalidadService;
  let apiService: ApiService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [DecisionCalidadService]
    });
    service = TestBed.get(DecisionCalidadService);
    apiService = TestBed.get(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('el metodo getAll', () => {
    it('invoca al get del Apiservice', () => {
      // Arrange
      spyOn(apiService, 'get');
      // Act
      service.getAll();
      // Assert
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });
  });
});
