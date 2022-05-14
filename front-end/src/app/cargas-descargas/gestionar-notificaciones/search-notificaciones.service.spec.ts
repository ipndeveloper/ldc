import { TestBed } from '@angular/core/testing';

import { NotificacionesService } from './search-notificaciones.service';
import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestModule } from '../../core/mocks/test.module';
import { Dictionary } from '../../core/models/dictionary';
import { ApiService } from '../../core/services/restClient/api.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { ReintentarNotificacionCommand } from '../../shared/data-models/commands/cargas-descargas/reintentar-notificacion-command';
import { Resources } from '../../../locale/artifacts/resources';

describe('NotificacionesService', () => {
  let service: NotificacionesService;
  let apiService: ApiService;
  let popupService: PopupService;
  let filtros: Dictionary<string>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule,
        HttpClientModule
      ],
      providers:
          [ NotificacionesService],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
    service = TestBed.get(NotificacionesService);

    apiService = TestBed.get(ApiService);
    popupService = TestBed.get(PopupService);
    spyOn(apiService, 'get');
    spyOn(apiService, 'post');
    setFilers();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  function setFilers() {
    filtros = new Dictionary<string>();
    filtros.add('terminal', '443');
  }

  describe('El metodo validateSearchClick', () => {

    it('retorna false cuando no se completo algun filtro', () => {
      // Arrange
      filtros = new Dictionary<string>();
      // Act
      const resultado = service.validateSearchClick(filtros);

      // Assert
      expect(resultado).toBeFalsy();
    });

    it('invoca al metodo error del popupService Error cuando no se completo el filtro requerido', () => {
      // Arrange
      spyOn(popupService, 'error');
      filtros = new Dictionary<string>();
      // Act
      service.validateSearchClick(filtros);

      // Assert
      expect(popupService.error).toHaveBeenCalledTimes(1);
    });

    it('Invoca al metodo validarFiltroFecha cuando se ingresó una terminal', () => {
      // Arrange
      spyOn<any>(service, 'fechaDesdeHastaValidas').and.returnValue(true);
      // Act
      service.validateSearchClick(filtros);

      // Assert
      expect(service['fechaDesdeHastaValidas']).toHaveBeenCalledTimes(1);
    });

    it('No Invoca al metodo fechaDesdeHastaValidas cuando no se ingresó una terminal', () => {
      // Arrange
      filtros = new Dictionary<string>();
      spyOn<any>(service, 'fechaDesdeHastaValidas').and.returnValue(true);
      // Act
      service.validateSearchClick(filtros);

      // Assert
      expect(service['fechaDesdeHastaValidas']).toHaveBeenCalledTimes(0);
    });
  });

  describe('El metodo fechaDesdeHastaValidas', () => {

    beforeEach(() => {
      spyOn(popupService, 'error');
    });

    it('retorna true cuando se ingreso una terminal y no se ingresaron fechas', () => {
      // Arrange

      // Act
      const resultado = service['fechaDesdeHastaValidas'](filtros['fechaDesde'], filtros['fechaHasta']);

      // Assert
      expect(resultado).toBeTruthy();
    });

    it('retorna false cuando se ingreso una terminal y fechaDesde mayor a la fechaHasta', () => {
      // Arrange
      filtros.add('fechaDesde', '2019-01-08');
      filtros.add('fechaHasta', '2019-01-04');

      // Act
      const resultado = service['fechaDesdeHastaValidas'](filtros['fechaDesde'], filtros['fechaHasta']);

      // Assert
      expect(resultado).toBeFalsy();
    });

    it('Invoca al PopupService error cuando se ingreso una terminal y fechaDesde mayor a la fechaHasta ', () => {
      // Arrange
      filtros.add('fechaDesde', '2019-01-08');
      filtros.add('fechaHasta', '2019-01-04');
      // Act
      service['fechaDesdeHastaValidas'](filtros['fechaDesde'], filtros['fechaHasta']);
      // Assert
      expect(popupService.error).toHaveBeenCalledTimes(1);
    });

    it('Invoca al PopupService error con el mensaje definido cuando se ingreso una terminal y fechaDesde mayor a la fechaHasta ', () => {
      // Arrange
      filtros.add('fechaDesde', '2019-01-08');
      filtros.add('fechaHasta', '2019-01-04');
      // Act
      service['fechaDesdeHastaValidas'](filtros['fechaDesde'], filtros['fechaHasta']);
      // Assert
      expect(popupService.error).toHaveBeenCalledWith(Resources.Messages.FechaDesdeDebeSerMenorOIgualAFechaHasta, Resources.Labels.Buscar);
    });

    it('retorna true cuando se ingreso una terminal y se ingresaron fechas validas', () => {
      // Arrange
      filtros.add('fechaDesde', '2019-01-04');
      filtros.add('fechaHasta', '2019-01-08');

      // Act
      const resultado = service['fechaDesdeHastaValidas'](filtros['fechaDesde'], filtros['fechaHasta']);

      // Assert
      expect(resultado).toBeTruthy();
    });

    it('retorna false cuando se ingreso una terminal y se ingreso solo la fecha desde', () => {
      // Arrange
      filtros.add('fechaDesde', '2019-01-04');
      filtros.add('fechaHasta', '');

      // Act
      const resultado = service['fechaDesdeHastaValidas'](filtros['fechaDesde'], filtros['fechaHasta']);

      // Assert
      expect(resultado).toBeFalsy();
    });

    it('Invoca al PopupService error cuando se ingreso una terminal y se ingreso solo la fecha desde', () => {
      // Arrange
      filtros.add('fechaDesde', '2019-01-04');
      filtros.add('fechaHasta', '');
      // Act
      service['fechaDesdeHastaValidas'](filtros['fechaDesde'], filtros['fechaHasta']);
      // Assert
      expect(popupService.error).toHaveBeenCalledTimes(1);
    });

    it('Invoca al PopupService error con el mensaje definido cuando se ingreso una terminal y se ingreso solo la fecha desde', () => {
      // Arrange
      filtros.add('fechaDesde', '2019-01-04');
      filtros.add('fechaHasta', '');
      // Act
      service['fechaDesdeHastaValidas'](filtros['fechaDesde'], filtros['fechaHasta']);
      // Assert
      expect(popupService.error).toHaveBeenCalledWith(Resources.Messages.ElCampoXEsRequeridoParaBuscar.format(Resources.Labels.FechaHasta),
      Resources.Labels.Buscar);
    });

    it('Invoca al PopupService error con el mensaje definido cuando se ingreso una terminal y fechaDesde mayor a la fechaHasta ', () => {
      // Arrange
      filtros.add('fechaDesde', '2019-01-08');
      filtros.add('fechaHasta', '2019-01-04');
      // Act
      service['fechaDesdeHastaValidas'](filtros['fechaDesde'], filtros['fechaHasta']);
      // Assert
      expect(popupService.error).toHaveBeenCalledWith(Resources.Messages.FechaDesdeDebeSerMenorOIgualAFechaHasta, Resources.Labels.Buscar);
    });

    it('retorna false cuando se ingreso una terminal y se ingreso solo la fecha hasta', () => {
      // Arrange
      filtros.add('fechaDesde', '');
      filtros.add('fechaHasta', '2019-01-04');

      // Act
      const resultado = service['fechaDesdeHastaValidas'](filtros['fechaDesde'], filtros['fechaHasta']);

      // Assert
      expect(resultado).toBeFalsy();
    });

    it('Invoca al PopupService error cuando se ingreso una terminal y se ingreso solo la fecha hasta', () => {
      // Arrange
      filtros.add('fechaDesde', '');
      filtros.add('fechaHasta', '2019-01-04');
      // Act
      service['fechaDesdeHastaValidas'](filtros['fechaDesde'], filtros['fechaHasta']);
      // Assert
      expect(popupService.error).toHaveBeenCalledTimes(1);
    });

    it('Invoca al PopupService error con el mensaje definido cuando se ingreso una terminal y se ingreso solo la fecha hasta', () => {
      // Arrange
      filtros.add('fechaDesde', '');
      filtros.add('fechaHasta', '2019-01-04');
      // Act
      service['fechaDesdeHastaValidas'](filtros['fechaDesde'], filtros['fechaHasta']);
      // Assert
      expect(popupService.error).toHaveBeenCalledWith(Resources.Messages.ElCampoXEsRequeridoParaBuscar.format(Resources.Labels.FechaDesde),
      Resources.Labels.Buscar);
    });

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

  describe('El metodo reintentar', () => {

    it('Invoca al metodo post del ApiService', () => {
      // Arrange
      const command = new ReintentarNotificacionCommand([]);
      // Act
      service.reintentar(command);
      // Assert
      expect(apiService.post).toHaveBeenCalledTimes(1);
    });
  });

  describe('El metodo cancelar', () => {

    it('Invoca al metodo post del ApiService', () => {
      // Arrange
      const command = new ReintentarNotificacionCommand([]);
      // Act
      service.cancelar(command);
      // Assert
      expect(apiService.post).toHaveBeenCalledTimes(1);
    });
  });
});
