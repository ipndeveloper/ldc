import { TestBed} from '@angular/core/testing';
import { AsignarTarjetaService } from './asignar-tarjeta.service';
import { TestModule } from '../../../../core/mocks/test.module';
import { ApiService } from '../../../../core/services/restClient/api.service';
import { AsignarTarjetaCommand, AsignarTarjetaPorDocumentoPorteYPatenteCommand } from '../../../../shared/data-models/commands/cargas-descargas/asignar-tarjeta-command';

describe('AsignarTarjetaService', () => {
  let asignarTarjetaService: AsignarTarjetaService,
      apiService: any;
  beforeEach(() => {
    apiService = jasmine.createSpyObj('ApiService', ['get', 'post']);
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [AsignarTarjetaService,
      {provide: ApiService, useValue: apiService}]
    });
    asignarTarjetaService = TestBed.get(AsignarTarjetaService);
  });

  it('should be created', () => {
    expect(asignarTarjetaService).toBeTruthy();
  });

  describe('El metodo asignarTarjeta()', () => {

    it('Llama a this.apiService.post(url, command) con la url para asignar el nro de tarjeta al movimiento', () => {
      const url = `movimientos/${1}/asignar-tarjeta`;
      const command = new AsignarTarjetaCommand(1, 25);

      asignarTarjetaService.asignarTarjeta(1, 25);

      expect(apiService.post).toHaveBeenCalledWith(url, command);
      expect(apiService.post).toHaveBeenCalledTimes(1);
    });
  });

  describe('El metodo tarjetaEnUso()', () => {

    it('Llama a this.apiService.get(`tarjetas/en-uso/${numeroTarjeta}`) para recuperar si la tarjeta esta en uso', () => {
      const url = `tarjetas/en-uso/${1}`;

      asignarTarjetaService.tarjetaEnUso(1);

      expect(apiService.get).toHaveBeenCalledWith(url);
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });
  });

  describe('El metodo validarDocPorteYPatente()', () => {

    it('Llama a this.apiService.get(`movimientos/validar... para saber si es valido el DocPorte y Patente', () => {
      const url = `movimientos/validar?idTipoDocumentoPorte=${1}&numeroDocumentoPorte=${'000-12222222222'}&patente=${'ABR001'}&ctg=${123456789012}`;

      asignarTarjetaService.validarDocPorteYPatente(1, '000-12222222222', 'ABR001', 123456789012);

      expect(apiService.get).toHaveBeenCalledWith(url);
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });
  });

  describe('El metodo asignarTarjetaPorDocumentoPorteYPatente()', () => {

    it('Llama a this.apiService.post(`tarjetas/asignar`, command); para asignar la tarjeta por DocPorte y Patente', () => {
      const command = new AsignarTarjetaPorDocumentoPorteYPatenteCommand();

      asignarTarjetaService.asignarTarjetaPorDocumentoPorteYPatente(command);

      expect(apiService.post).toHaveBeenCalledWith('tarjetas/asignar', command);
      expect(apiService.post).toHaveBeenCalledTimes(1);
    });
  });
});
