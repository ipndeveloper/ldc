import { TestBed } from '@angular/core/testing';
import { TestModule } from '../../core/mocks/test.module';
import { TerminalService } from './terminal.service';
import { ApiService } from '../../core/services/restClient/api.service';
import { configureTestSuite } from '../../core/mocks/testing';
import { Terminal } from '../data-models/terminal';
import { of } from 'rxjs/internal/observable/of';


describe('TerminalService', () => {
  let apiService: any;
  let service: TerminalService;

  configureTestSuite(() => {
    apiService = jasmine.createSpyObj('ApiService', ['get']);
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [TerminalService,
      {provide: ApiService, useValue: apiService}]
    });
    service = TestBed.get(TerminalService);
  });

  beforeEach(() => {
    apiService.get.calls.reset();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('El metodo getAll()', () => {
    it('invoca al metodo get del ApiService', () => {
      service.getAll();

      expect(apiService.get).toHaveBeenCalledWith('terminales');
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });

    it('devuelve un observable con los datos obtenidos por el apiservice.get', () => {
      const esperado = of([{} as Terminal]);
      apiService.get.and.returnValue(esperado);

      const resultado = service.getAll();

      expect(resultado).toEqual(esperado);
    });
  });

  describe('El metodo getAllByFiltro()', () => {
    it('invoca al metodo get del ApiService solo con un parametro', () => {
      const incluirAdministracionCentral = true;
      const route = `terminales/filtrarterminales?incluirAdministracionCentral=${incluirAdministracionCentral}`;

      service.getAllByFiltro(incluirAdministracionCentral);

      expect(apiService.get).toHaveBeenCalledWith(route);
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });

    it('invoca al metodo get del ApiService solo con  parametro permiso', () => {
      const incluirAdministracionCentral = true;
      const permiso = 'permiso';
      const route = `terminales/filtrarterminales?incluirAdministracionCentral=${incluirAdministracionCentral}&codigoPermiso=${permiso}`;

      service.getAllByFiltro(incluirAdministracionCentral, permiso);

      expect(apiService.get).toHaveBeenCalledWith(route);
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });

    it('invoca al metodo get del ApiService con parametro utilizaTarjeta', () => {
      const incluirAdministracionCentral = true;
      const utilizaTarjeta =  true;
      const route = `terminales/filtrarterminales?incluirAdministracionCentral=${incluirAdministracionCentral}&utilizaTarjeta=${utilizaTarjeta}`;

      service.getAllByFiltro(incluirAdministracionCentral, undefined, utilizaTarjeta);

      expect(apiService.get).toHaveBeenCalledWith(route);
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });

    it('invoca al metodo get del ApiService con todos los parametros', () => {
      const incluirAdministracionCentral = true;
      const utilizaTarjeta =  true;
      const permiso = 'permiso';
      const route = `terminales/filtrarterminales?incluirAdministracionCentral=${incluirAdministracionCentral}&codigoPermiso=${permiso}&utilizaTarjeta=${utilizaTarjeta}`;

      service.getAllByFiltro(incluirAdministracionCentral, permiso, utilizaTarjeta);

      expect(apiService.get).toHaveBeenCalledWith(route);
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });

    it('devuelve un observable con los datos obtenidos por el apiservice.get', () => {
      const esperado = of([{} as Terminal]);
      apiService.get.and.returnValue(esperado);

      const resultado = service.getAllByFiltro(true);

      expect(resultado).toEqual(esperado);
    });
  });

  describe('El metodo  getAllByPropietario()', () => {
    it('invoca el metodo get del ApiService', () => {
      const url = `PropietarioId=${1}`;

      service.getAllByPropietario(1);

      expect(apiService.get).toHaveBeenCalledWith(`terminales/propietario?${url}`);
      expect(apiService.get).toHaveBeenCalledTimes(1);
    });

    it('devuelve un observable con los datos obtenidos por el apiservice.get', () => {
      const esperado = of([{} as Terminal]);
      apiService.get.and.returnValue(esperado);

      const resultado = service.getAllByPropietario(1);

      expect(resultado).toEqual(esperado);
    });
  });
});
