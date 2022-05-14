import { TestBed } from '@angular/core/testing';

import { TestModule } from '../../core/mocks/test.module';
import { VariableTemplateService } from './variable-template.service';
import { ApiService } from '../../core/services/restClient/api.service';
import { of } from 'rxjs';
import { VariableTemplate } from '../data-models/variable-template';

describe('VariableTemplateService', () => {
  let service: VariableTemplateService;
  let apiService: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule
      ],
      providers: [VariableTemplateService]
    });

    service = TestBed.get(VariableTemplateService);
    apiService = TestBed.get(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('El metodo getAll', () => {
    it('invoca al metodo get del apiService', () => {
      // Arrange
      spyOn(apiService, 'get');

      // Act
      service.getAll();

      // Assert
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });

    it('devuelve un observable con los datos obtenidos por el apiservice.get', () => {
      // Arrange
      const esperado = of([{} as VariableTemplate]);
      spyOn(apiService, 'get').and.returnValue(esperado);

      // Act
      const resultado = service.getAll();

      // Assert
      expect(resultado).toEqual(esperado);
    });
  });
});
