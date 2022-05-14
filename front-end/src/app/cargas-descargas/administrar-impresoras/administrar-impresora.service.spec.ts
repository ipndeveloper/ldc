import { TestBed } from '@angular/core/testing';

import { AdministrarImpresoraService } from './administrar-impresora.service';
import { TestModule } from '../../core/mocks/test.module';
import { ApiService } from '../../core/services/restClient/api.service';
import { Dictionary } from '../../core/models/dictionary';

describe('AdministrarImpresoraService', () => {
let administrarImpresoraService: AdministrarImpresoraService;
let apiService: any;
  beforeEach(() => {
    apiService = jasmine.createSpyObj('ApiService', ['get']);
    TestBed.configureTestingModule({
      providers: [AdministrarImpresoraService,
      {provide: ApiService, useValue: apiService}],
      imports: [TestModule],
    });
    administrarImpresoraService = TestBed.get(AdministrarImpresoraService);
  });

  it('should be created', () => {
    expect(administrarImpresoraService).toBeTruthy();
  });

  describe('El metodo validateSearchClick', () => {

    it('si el parametro filters es undefined retorna false', () => {
    const result = administrarImpresoraService.validateSearchClick();

    expect(result).toBe(false);
    });

    it('si el parametro filters existe retorna true', () => {
      const result = administrarImpresoraService.validateSearchClick( new Dictionary<string>());

      expect(result).toBe(true);
      });
  });

  describe('El metodo get()', () => {
    it('invoca al metodo get de ApiService', () => {
      const url = `${administrarImpresoraService.apiRoute}/${1}`;

      administrarImpresoraService.get(1);

      expect(apiService.get).toHaveBeenCalledWith(url);
    });
  });

  describe('El metodo getData()', () => {
    it('invoca al metodo get de ApiService y al getQuerystringParameter()', () => {
      spyOn(administrarImpresoraService, 'getQuerystringParameter');

      administrarImpresoraService.getData(new Dictionary<string>());

      expect(administrarImpresoraService.getQuerystringParameter).toHaveBeenCalledTimes(2);
      expect(apiService.get).toHaveBeenCalled();
    });
  });
});
