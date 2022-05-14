import { TestBed, inject } from '@angular/core/testing';

import { IngresarCalidadCaladoService } from './ingresar-calidad-calado.service';
import { HttpClientModule } from '@angular/common/http';
import { TestModule } from '../../core/mocks/test.module';
import { ApiService } from '../../core/services/restClient/api.service';
import { IngresarCalidadCommand } from '../../shared/data-models/commands/cargas-descargas/ingresar-calidad-command';
import { RubroCalidadMovimientoCereal } from '../../shared/data-models/ingreso-calidad/rubro-calidad-movimiento-cereal';
import { CalculoCalidad } from '../../shared/data-models/calculo-calidad/calculo-calidad';
import { AccionPosCalado } from '../../shared/data-models/calculo-calidad/accion-pos-calado';

describe('IngresarCalidadCaladoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IngresarCalidadCaladoService],
      imports: [
        HttpClientModule,
        TestModule
      ],
    });
  });

  it('should be created', inject([IngresarCalidadCaladoService], (service: IngresarCalidadCaladoService) => {
    expect(service).toBeTruthy();
  }));

  describe('El Metodo getMovimientoCalado', () => {
    it('Llama a this.apiService.get<MovimientoCalado> con la URL para buscar por Tarjeta y Patente',
    inject([ApiService, IngresarCalidadCaladoService],
      (apiService: ApiService, ingresarCalidadCaladoService: IngresarCalidadCaladoService) => {

      spyOn(apiService, 'get');

      ingresarCalidadCaladoService.getMovimientoCalado('bla123', 0, 12345);

      expect(apiService.get).toHaveBeenCalledTimes(1);
    }));
  });

  describe('El Metodo getMovimientoCaladoById', () => {
    it('Llama a this.apiService.get<MovimientoCalado> con la ID del Movimiento',
    inject([ApiService, IngresarCalidadCaladoService],
      (apiService: ApiService, ingresarCalidadCaladoService: IngresarCalidadCaladoService) => {

      spyOn(apiService, 'get');

      ingresarCalidadCaladoService.getMovimientoCaladoById(12345);

      expect(apiService.get).toHaveBeenCalledTimes(1);
    }));
  });

  describe('El Metodo CalcularCalidad', () => {
    it('Llama a this.apiService.post<IngresoCalidad> con IngresoCalidad',
    inject([ApiService, IngresarCalidadCaladoService],
      (apiService: ApiService, ingresarCalidadCaladoService: IngresarCalidadCaladoService) => {

      spyOn(apiService, 'post');

      const calculoCalidad = new CalculoCalidad();

      ingresarCalidadCaladoService.CalcularCalidad(calculoCalidad);

      expect(apiService.post).toHaveBeenCalledTimes(1);
      expect(apiService.post).toHaveBeenCalledWith('/calculador-calidad/calcular', calculoCalidad);
    }));
  });

  describe('El Metodo DeterminarAccionPosCalado', () => {
    it('Llama a this.apiService.post<AccionPosCaladoRespuesta> con AccionPosCalado',
    inject([ApiService, IngresarCalidadCaladoService],
      (apiService: ApiService, ingresarCalidadCaladoService: IngresarCalidadCaladoService) => {

      spyOn(apiService, 'post');

      const accionPosCalado = new AccionPosCalado();

      ingresarCalidadCaladoService.DeterminarAccionPosCalado(accionPosCalado);

      expect(apiService.post).toHaveBeenCalledTimes(1);
      expect(apiService.post).toHaveBeenCalledWith('/calculador-calidad/determinar-accion-pos-calado', accionPosCalado);
    }));
  });

  describe('El Metodo RegistrarCalidadCalado', () => {
    it('Llama a this.apiService.post<string> con movimientoCalado',
    inject([ApiService, IngresarCalidadCaladoService],
      (apiService: ApiService, ingresarCalidadCaladoService: IngresarCalidadCaladoService) => {

      spyOn(apiService, 'post');

      const ingresarCalidadCaladoCommand = new IngresarCalidadCommand(1, new Array<RubroCalidadMovimientoCereal>(), 1, 1, 1);

      ingresarCalidadCaladoService.RegistrarCalidad(ingresarCalidadCaladoCommand, 'ingresar-calidad-apto-descarga');

      expect(apiService.post).toHaveBeenCalledTimes(1);
      expect(apiService.post).toHaveBeenCalledWith('movimientos-calidad/1/ingresar-calidad-apto-descarga', ingresarCalidadCaladoCommand);
    }));
  });
});
