import { TestBed } from '@angular/core/testing';
import { RegistrarControlPatrimonialService } from './registrar-control-patrimonial.service';
import { ApiService } from '../../core/services/restClient/api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PopupModule } from '../../core/services/popupService/popup.module';
import { AuthService } from '../../core/services/session/auth.service';
import { RestHandlerService } from '../../core/services/restClient/restHandler.service';
import { RequestOptionsService } from '../../core/services/restClient/requestOptions.service';
import { configureTestSuite } from '../../core/mocks/testing';
import { PopupService } from '../../core/services/popupService/popup.service';
import { Dictionary } from '../../core/models/dictionary';
import { Resources } from '../../../locale/artifacts/resources';
import { of } from 'rxjs';
import { DecisionControlPatrimonialDataView } from '../../shared/data-models/decision-control-patrimonial-data-view';
import { CrearRolCommand, ModificarRolCommand } from '../../shared/data-models/commands/cargas-descargas/rol-command';
import { DecisionControlPatrimonial } from '../../shared/data-models/decision-control-patrimonial';
import { ControlarCalidadCargaDataView } from '../../shared/data-models/controlar-calidad-carga-data-view';
import { SearchFormService } from '../../core/components/search-form/services/search-form.service';

describe('RegistrarControlPatrimonialService', () => {
  let service: RegistrarControlPatrimonialService;
  let apiService: any;
  let popupService: any;
  configureTestSuite(() => {
    apiService = jasmine.createSpyObj('ApiService', ['get', 'post', 'put', 'delete']);
    popupService = jasmine.createSpyObj('PopupService', ['error']);
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        PopupModule
      ],
      providers: [
        RegistrarControlPatrimonialService,
        {provide: ApiService, useValue: apiService},
        RestHandlerService,
        RequestOptionsService,
        AuthService,
        {provide: PopupService, useValue: popupService}
      ]
    });

    service = TestBed.get(RegistrarControlPatrimonialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('El metodo validateSearchClick()', () => {

    it('si el filtro es patente', () => {
      const filters = new Dictionary<any>();
      filters.add('patente', 'patente');

      const result = service.validateSearchClick(filters);

      expect(result).toBeTruthy();
    });

    it('si el filtro es tarjeta', () => {
      const filters = new Dictionary<any>();
      filters.add('tarjeta', 'tarjeta');

      const result = service.validateSearchClick(filters);

      expect(result).toBeTruthy();
    });

    it('si el filtro es producto', () => {
      const filters = new Dictionary<any>();
      filters.add('producto', 'producto');

      const result = service.validateSearchClick(filters);

      expect(result).toBeTruthy();
    });

    it('si el filtro es numeroDocumento', () => {
      const filters = new Dictionary<any>();
      filters.add('numeroDocumento', 'numeroDocumento');

      const result = service.validateSearchClick(filters);

      expect(result).toBeTruthy();
    });

    it('si el filtro es null', () => {
      const result = service.validateSearchClick();

      expect(result).toBeFalsy();
      expect(popupService.error).toHaveBeenCalledWith(Resources.Messages.DebeSeleccionarAlMenosUnFiltro, Resources.Labels.Buscar);
    });
  });

  describe('El metodo getDAta()', () => {
    it('si el filtro es numeroDocumento', () => {
      const filters = new Dictionary<any>();
      spyOn<any>(SearchFormService.prototype, 'getQuerystringParameter');
      filters.add('numeroDocumento', 'numeroDocumento');
      const esperado = of([{} as ControlarCalidadCargaDataView]);
      apiService.get.and.returnValue(esperado);

      const result = service.getData(filters);

      expect(SearchFormService.prototype.getQuerystringParameter).toHaveBeenCalledTimes(4);
      expect(apiService.get).toHaveBeenCalled();
      expect(result).toEqual(esperado);
    });

  });

  describe('El metodo get()', () => {
    it('invoca al metodo get de apiService', () => {
      service.get(1);

      expect(apiService.get).toHaveBeenCalledWith(`${service.apiRoute}/${1}`);
    });

    it('retorna el observable requerido', () => {
      const esperado = of({} as DecisionControlPatrimonialDataView);
      apiService.get.and.returnValue(esperado);

      const result = service.get(1);

      expect(result).toEqual(esperado);
    });
  });

  describe('El metodo crear()', () => {
    it('invoca al metodo post de apiService', () => {
      const command = new CrearRolCommand();
      service.crear(command);

      expect(apiService.post).toHaveBeenCalledWith(service.apiRoute, command);
    });
  });

  describe('El metodo modificar()', () => {
    it('invoca al metodo put de apiService', () => {
      const command = new ModificarRolCommand();
      service.modificar(command);

      expect(apiService.put).toHaveBeenCalledWith(service.apiRoute, command);
    });
  });

  describe('El metodo eliminar()', () => {
    it('invoca al metodo delete de apiService', () => {
      service.eliminar(1);

      expect(apiService.delete).toHaveBeenCalledWith(service.apiRoute, 1);
    });
  });

  describe('El metodo getDecisiones()', () => {
    it('invoca al metodo get de apiService', () => {
      service.getDecisiones(1);

      expect(apiService.get).toHaveBeenCalledWith(`${service['url']}/${1}`);
    });

    it('retorna el observable requerido', () => {
      const esperado = of([{} as DecisionControlPatrimonial]);
      apiService.get.and.returnValue(esperado);

      const result = service.getDecisiones(1);

      expect(result).toEqual(esperado);
    });
  });

  describe('El metodo getByNavigtion()', () => {
    it('invoca al metodo get de apiService', () => {
      service.getByNavigtion(1);

      expect(apiService.get).toHaveBeenCalledWith(`${service['url']}/${1}/por-navegacion`);
    });

    it('retorna el observable requerido', () => {
      const esperado = of({} as ControlarCalidadCargaDataView);
      apiService.get.and.returnValue(esperado);

      const result = service.getByNavigtion(1);

      expect(result).toEqual(esperado);
    });
  });

  describe('La propiedad apiRoute', () => {
    it('deberia ser "registrar-control-patrimonial" ', () => {
      expect(service.apiRoute).toEqual('registrar-control-patrimonial');
    });
  });
});
