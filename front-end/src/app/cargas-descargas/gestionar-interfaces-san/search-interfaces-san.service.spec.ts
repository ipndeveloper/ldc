import { TestBed } from '@angular/core/testing';

import { InterfacesSanService } from './search-interfaces-san.service';
import { TestModule } from '../../core/mocks/test.module';
import { Dictionary } from '../../core/models/dictionary';
import { PopupService } from '../../core/services/popupService/popup.service';
import { ApiService } from '../../core/services/restClient/api.service';
import { EstadosInterfazSan } from '../../shared/enums/enums';
import { Resources } from '../../../locale/artifacts/resources';

describe('InterfacesSanService', () => {

  let service: InterfacesSanService;
  let apiService: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [InterfacesSanService],
    });

    service = TestBed.get(InterfacesSanService);

    apiService = TestBed.get(ApiService);
    spyOn(apiService, 'get');
    spyOn(apiService, 'post');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('El metodo validateSearchClick', () => {

    let dict: Dictionary<string>;

    beforeEach(() => {
      dict = new Dictionary<string>();
    });

    it('retorna false cuando no se completo algun filtro', () => {
      // Arrange

      // Act
      const resultado = service.validateSearchClick(dict);

      // Assert
      expect(resultado).toBeFalsy();
    });

    it('invoca al metodo error del popupService cuando no se completo al menos un filtro', () => {
      // Arrange
      const popupService = TestBed.get(PopupService);
      spyOn(popupService, 'error');

      // Act
      service.validateSearchClick(dict);

      // Assert
      expect(popupService.error).toHaveBeenCalled();
    });

    it('retorna true cuando se completo tipoMovimiento', () => {
      // Arrange
      dict['tipoMovimiento'] = 'prueba';

      // Act
      const resultado = service.validateSearchClick(dict);

      // Assert
      expect(resultado).toBeTruthy();
    });

    it('retorna true cuando se completo tipoTransporte', () => {
      // Arrange
      dict['tipoTransporte'] = 'prueba';

      // Act
      const resultado = service.validateSearchClick(dict);

      // Assert
      expect(resultado).toBeTruthy();
    });

    it('retorna true cuando se completo nroDocPorte', () => {
      // Arrange
      dict['nroDocPorte'] = 'prueba';

      // Act
      const resultado = service.validateSearchClick(dict);

      // Assert
      expect(resultado).toBeTruthy();
    });

    it('retorna true cuando se completo fechaIngresoDesde', () => {
      // Arrange
      dict['fechaIngresoDesde'] = 'prueba';

      // Act
      const resultado = service.validateSearchClick(dict);

      // Assert
      expect(resultado).toBeTruthy();
    });

    it('retorna true cuando se completo fechaIngresoHasta', () => {
      // Arrange
      dict['fechaIngresoHasta'] = 'prueba';

      // Act
      const resultado = service.validateSearchClick(dict);

      // Assert
      expect(resultado).toBeTruthy();
    });

    it('retorna true cuando se completo servicioSan', () => {
      // Arrange
      dict['servicioSan'] = 'prueba';

      // Act
      const resultado = service.validateSearchClick(dict);

      // Assert
      expect(resultado).toBeTruthy();
    });

    it('retorna true cuando se completo estado', () => {
      // Arrange
      dict['estado'] = {id: EstadosInterfazSan.Pendiente };

      // Act
      const resultado = service.validateSearchClick(dict);

      // Assert
      expect(resultado).toBeTruthy();
    });

    it('retorna false cuando se completo el estado con finalizado pero no se ingreso un nroDocPorte', () => {
      // Arrange
      dict['estado'] = {id: EstadosInterfazSan.Finalizado };

      // Act
      const resultado = service.validateSearchClick(dict);

      // Assert
      expect(resultado).toBeFalsy();
    });

    it('invoca al metodo error del popupService cuando se completa el estado con finalizado pero no se ingreso un nroDocPorte', () => {
      // Arrange
      const popupService = TestBed.get(PopupService);
      spyOn(popupService, 'error');
      const esperado = Resources.Messages.ElCampoXEsRequeridoParaBuscar.format(Resources.Labels.NumeroDocumentoPorte);
      dict['estado'] = {id: EstadosInterfazSan.Finalizado };

      // Act
      service.validateSearchClick(dict);

      // Assert
      expect(popupService.error).toHaveBeenCalledWith(esperado);
    });

    it('retorna true cuando se completo el estado con finalizado y se ingreso un nroDocPorte', () => {
      // Arrange
      dict['estado'] = {id: EstadosInterfazSan.Finalizado };
      dict['nroDocPorte'] = 'prueba';

      // Act
      const resultado = service.validateSearchClick(dict);

      // Assert
      expect(resultado).toBeTruthy();
    });
  });

  describe('El metodo getData', () => {

    let dict: Dictionary<string>;

    beforeEach(() => {
      dict = new Dictionary<string>();
      dict['estado'] = {id: 10};
    });

    it('invoca al metodo get del apiService', () => {
      // Arrange

      // Act
      service.getData(dict);

      // Assert
      expect(apiService.get).toHaveBeenCalled();
    });
  });

  describe('El metodo reEjecutar', () => {
    it('invoca al metodo post del apiService', () => {
      // Arrange

      // Act
      service.reEjecutar();

      // Assert
      expect(apiService.post).toHaveBeenCalledWith(`${service.apiRoute}/re-ejecutar`, {});
    });
  });
});
