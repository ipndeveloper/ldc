import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarControlDescargaVagonNogranosComponent } from './modificar-control-descarga-vagon-nogranos.component';
import { TestModule } from '../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CircuitoService } from '../../shared/services/circuito.service';
import { ControlarDescargaVagonNoGranosService } from '../../controlar-descarga-vagon-no-granos/controlar-descarga-vagon-no-granos.service';
import { MovimientoService } from '../../shared/services/movimiento.service';
import { DescargaEventsNotifierService } from '../../shared/services/descarga-events-notifier.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { NavigationService } from '../../../core/services/navigationService/navigation.service';
import { Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Terminal } from '../../../shared/data-models/terminal';
import { of } from 'rxjs';
import { ApiService } from '../../../core/services/restClient/api.service';
import { Circuito } from '../../../shared/data-models/circuito/circuito';
import { ModificarDescargaCamionSubproductosFueraCircuitoCommand } from '../modificar-control-descarga-camion-subproductos-nogranos/modificar-descarga-camion-subproductos-fuera-circuito-command';
import { MovimientoCerealSubproducto } from '../../../shared/data-models/movimiento-cereal-subproducto';
import { EstadoMovimiento } from '../../../shared/data-models/estado-movimiento';
import { EntitiesTiposProducto } from '../../../shared/data-models/tipo-producto';
import { Actividades } from '../../../shared/enums/enums';
import { configureTestSuite } from '../../../core/mocks/testing';
import { CommandService } from '../../../shared/command-service/command.service';
import { HotkeyModule } from 'angular2-hotkeys';
import { MovimientoCerealGrano } from '../../../../app/shared/data-models/movimiento-cereal-grano';

export const MockRoutes: Routes = [
  {
      path: '',
      component: ModificarControlDescargaVagonNogranosComponent,
      data: {
          title: 'ModificarControlDescargaVagonNogranosComponent'
      },
      pathMatch: 'full'
  }
];

class TerminalMock extends Terminal {
  constructor(descripcion: string) {
    super(1, descripcion, false, {} as any, {} as any, {} as any, '1', false, true, false, false);
  }
}

describe('ModificarControlDescargaVagonNogranosComponent', () => {
  let component: ModificarControlDescargaVagonNogranosComponent;
  let fixture: ComponentFixture<ModificarControlDescargaVagonNogranosComponent>;
  let fcService: FormComponentService;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarControlDescargaVagonNogranosComponent ],
      imports: [
        TestModule,
        RouterTestingModule.withRoutes(MockRoutes),
        HotkeyModule.forRoot()
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        CircuitoService,
        ControlarDescargaVagonNoGranosService,
        MovimientoService,
        DescargaEventsNotifierService,
        FormBuilder,
        FormComponentService,
        NavigationService,
        CommandService
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarControlDescargaVagonNogranosComponent);
    component = fixture.componentInstance;

    component.terminal = new TerminalMock('terminal');

    component.documentoPorte.setFocus = jasmine.createSpy('setFocus');
    fcService = fixture.debugElement.injector.get(FormComponentService);

    spyOn<any>(component, 'ngOnInit');

    const apiService = TestBed.get(ApiService);
    spyOn(apiService, 'get').and.returnValue(of({} as any));

    component['createForm']();
    fcService.initialize(component.form);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('El metodo ngAfterViewInit', () => {
    beforeEach(() => {
      component.documentoPorte.setFocus = jasmine.createSpy('setFocus');
    });

    it('invoca al metodo setFocus del documentoPorte cuando esta definido', () => {
      // Arrange

      // Act
      component.ngAfterViewInit();

      // Assert
      expect(component.documentoPorte.setFocus).toHaveBeenCalledTimes(1);
    });
  });

  describe('El metodo createForm', () => {
    it('crea el form', () => {
      // Arrange

      // Act
      component['createForm']();

      // Assert
      expect(component.form).toBeDefined();
    });
  });

  describe('El metodo aceptar', () => {
    let service: ControlarDescargaVagonNoGranosService;

    beforeEach(() => {
      service = TestBed.get(ControlarDescargaVagonNoGranosService);

      spyOn<any>(component, 'mapControlsToCommand').and.returnValue({});
      spyOn<any>(component, 'successfulResult');

      spyOn(service, 'ModificarFueraCircuito').and.returnValue(of({}));
    });

    it('crea el command invocando a mapControlsToCommand cuando el el form es valido', () => {
      // Arrange
      spyOn(fcService, 'isValidForm').and.returnValue(true);

      // Act
      component.aceptar();

      // Assert
      expect(component['mapControlsToCommand']).toHaveBeenCalledTimes(1);
    });

    it('invoca al metodo ModificarFueraCircuito cuando el form es valido', () => {
      // Arrange
      spyOn(fcService, 'isValidForm').and.returnValue(true);

      // Act
      component.aceptar();

      // Assert
      expect(service.ModificarFueraCircuito).toHaveBeenCalledTimes(1);
    });

    it('invoca al metodo successfulResult cuando el form es valido', () => {
      // Arrange
      spyOn(fcService, 'isValidForm').and.returnValue(true);

      // Act
      component.aceptar();

      // Assert
      expect(component['successfulResult']).toHaveBeenCalled();
    });

    it('obtiene los mensajes de error con el metodo validateForm del fcService cuando el formulario no es valido', () => {
      // Arrange
      spyOn(fcService, 'isValidForm').and.returnValue(false);
      spyOn(fcService, 'validateForm');
      spyOn(fcService, 'showValidationError');

      // Act
      component.aceptar();

      // Assert
      expect(fcService.validateForm).toHaveBeenCalled();
    });

    it('muestra los mensajes de error con el metodo showValidationError del fcService cuando el formulario no es valido', () => {
      // Arrange
      spyOn(fcService, 'isValidForm').and.returnValue(false);
      spyOn(fcService, 'validateForm');
      spyOn(fcService, 'showValidationError');

      // Act
      component.aceptar();

      // Assert
      expect(fcService.showValidationError).toHaveBeenCalled();
    });
  });

  describe('El metodo mapControlsToCommand', () => {

    beforeEach(() => {
      spyOn(fcService, 'getValue').and.returnValue('0');
      spyOn<any>(component, 'mapControlsCircuitoToCommand').and.returnValue({});
      spyOn<any>(component, 'mapControlDatosDocumentoToCommand');
    });

    it('construye el command llamando al metodo mapControlsCircuitoToCommand', () => {
      // Arrange

      // Act
      component['mapControlsToCommand']();

      // Assert
      expect(component['mapControlsCircuitoToCommand']).toHaveBeenCalled();
    });

    it('completa los datos del documento del command invocando al metodo mapControlDatosDocumentoToCommand', () => {
      // Arrange

      // Act
      component['mapControlsToCommand']();

      // Assert
      expect(component['mapControlDatosDocumentoToCommand']).toHaveBeenCalled();
    });

    it('setea la fechaStockSan del command', () => {
      // Arrange

      // Act
      const command = component['mapControlsToCommand']();

      // Assert
      expect(command.fechaStockSan).toBeDefined();
    });
  });

  describe('El metodo mapControlsToCommand', () => {
    beforeEach(() => {
      component.circuito = new Circuito();
      spyOn(fcService, 'getValue').and.returnValue('0');
    });

    it('crea el command', () => {
      // Arrange

      // Act
      const command = component['mapControlsCircuitoToCommand']();

      // Assert
      expect(command).toBeDefined();
    });

    it('crea el command con el idCircuito', () => {
      // Arrange
      component.circuito.id = 1;

      // Act
      const command = component['mapControlsCircuitoToCommand']();

      // Assert
      expect(command.idCircuito).toEqual(1);
    });

    it('crea el command con el idTipoDocumentoPorte', () => {
      // Arrange

      // Act
      const command = component['mapControlsCircuitoToCommand']();

      // Assert
      expect(command.idTipoDocumentoPorte).toBeDefined();
    });

    it('crea el command con el numeroDocumentoPorte', () => {
      // Arrange

      // Act
      const command = component['mapControlsCircuitoToCommand']();

      // Assert
      expect(command.numeroDocumentoPorte).toBeDefined();
    });

    it('crea el command con el id', () => {
      // Arrange
      component.idMovimiento = 1;

      // Act
      const command = component['mapControlsCircuitoToCommand']();

      // Assert
      expect(command.id).toBeDefined();
    });

    it('crea el command con el esModificacion', () => {
      // Arrange

      // Act
      const command = component['mapControlsCircuitoToCommand']();

      // Assert
      expect(command.esModificacion).toBeDefined();
    });

    it('crea el command con el esFueraCircuito', () => {
      // Arrange

      // Act
      const command = component['mapControlsCircuitoToCommand']();

      // Assert
      expect(command.esFueraCircuito).toBeDefined();
    });
  });

  describe('El metodo mapControlDatosDocumentoToCommand', () => {
    let command: ModificarDescargaCamionSubproductosFueraCircuitoCommand;

    beforeEach(() => {
      command = new ModificarDescargaCamionSubproductosFueraCircuitoCommand(1, 1, '');

      const circuito = new Circuito();
      const estadoMovimiento = new EstadoMovimiento(1, '');
      component.datosDocumento.movimiento = new MovimientoCerealGrano(circuito, estadoMovimiento);

      spyOn(fcService, 'getValue').and.returnValue('0');
    });

    it('setea el numeroVagon al command', () => {
      // Arrange

      // Act
      component['mapControlDatosDocumentoToCommand'](command);

      // Assert
      expect(command.numeroVagon).toBeDefined();
    });

    it('setea el operativo al command', () => {
      // Arrange

      // Act
      component['mapControlDatosDocumentoToCommand'](command);

      // Assert
      expect(command.operativo).toBeDefined();
    });

    it('setea el idFerrocarril al command', () => {
      // Arrange

      // Act
      component['mapControlDatosDocumentoToCommand'](command);

      // Assert
      expect(command.idFerrocarril).toBeDefined();
    });

    it('setea el fechaCarga al command', () => {
      // Arrange

      // Act
      component['mapControlDatosDocumentoToCommand'](command);

      // Assert
      expect(command.fechaCarga).toBeDefined();
    });

    it('setea el fechaVencimiento al command', () => {
      // Arrange

      // Act
      component['mapControlDatosDocumentoToCommand'](command);

      // Assert
      expect(command.fechaVencimiento).toBeDefined();
    });

    it('setea el numeroCEE al command', () => {
      // Arrange

      // Act
      component['mapControlDatosDocumentoToCommand'](command);

      // Assert
      expect(command.numeroCEE).toBeDefined();
    });

    it('setea el idProducto al command', () => {
      // Arrange

      // Act
      component['mapControlDatosDocumentoToCommand'](command);

      // Assert
      expect(command.idProducto).toBeDefined();
    });

    it('setea el idTitular al command', () => {
      // Arrange

      // Act
      component['mapControlDatosDocumentoToCommand'](command);

      // Assert
      expect(command.idTitular).toBeDefined();
    });

    it('setea el idVendedor al command', () => {
      // Arrange

      // Act
      component['mapControlDatosDocumentoToCommand'](command);

      // Assert
      expect(command.idVendedor).toBeDefined();
    });

    it('setea el idCosecha al command', () => {
      // Arrange

      // Act
      component['mapControlDatosDocumentoToCommand'](command);

      // Assert
      expect(command.idCosecha).toBeDefined();
    });

    it('setea el idIntermediario al command', () => {
      // Arrange

      // Act
      component['mapControlDatosDocumentoToCommand'](command);

      // Assert
      expect(command.idIntermediario).toBeDefined();
    });

    it('setea el idCorredor al command', () => {
      // Arrange

      // Act
      component['mapControlDatosDocumentoToCommand'](command);

      // Assert
      expect(command.idCorredor).toBeDefined();
    });

    it('setea el idRemitenteComercial al command', () => {
      // Arrange

      // Act
      component['mapControlDatosDocumentoToCommand'](command);

      // Assert
      expect(command.idRemitenteComercial).toBeDefined();
    });

    it('setea el idEntregador al command', () => {
      // Arrange

      // Act
      component['mapControlDatosDocumentoToCommand'](command);

      // Assert
      expect(command.idEntregador).toBeDefined();
    });

    it('setea el idDestinatario al command', () => {
      // Arrange

      // Act
      component['mapControlDatosDocumentoToCommand'](command);

      // Assert
      expect(command.idDestinatario).toBeDefined();
    });

    it('setea el kgBruto al command', () => {
      // Arrange

      // Act
      component['mapControlDatosDocumentoToCommand'](command);

      // Assert
      expect(command.kgBruto).toBeDefined();
    });

    it('setea el kgTara al command', () => {
      // Arrange

      // Act
      component['mapControlDatosDocumentoToCommand'](command);

      // Assert
      expect(command.kgTara).toBeDefined();
    });

    it('setea el idFinalidad al command', () => {
      // Arrange

      // Act
      component['mapControlDatosDocumentoToCommand'](command);

      // Assert
      expect(command.idFinalidad).toBeDefined();
    });

    it('setea el idProcedencia al command', () => {
      // Arrange

      // Act
      component['mapControlDatosDocumentoToCommand'](command);

      // Assert
      expect(command.idProcedencia).toBeDefined();
    });

    it('setea el idSedeOrigen al command', () => {
      // Arrange

      // Act
      component['mapControlDatosDocumentoToCommand'](command);

      // Assert
      expect(command.idSedeOrigen).toBeDefined();
    });

    it('setea el idSedeDestino al command', () => {
      // Arrange

      // Act
      component['mapControlDatosDocumentoToCommand'](command);

      // Assert
      expect(command.idSedeDestino).toBeDefined();
    });

    it('setea el observaciones al command', () => {
      // Arrange

      // Act
      component['mapControlDatosDocumentoToCommand'](command);

      // Assert
      expect(command.observaciones).toBeDefined();
    });

    it('setea el idTransportista al command cuando el transportista esta registrado', () => {
      // Arrange
      spyOn(component.form, 'get').and.returnValue(new FormControl({id: 10}));

      // Act
      component['mapControlDatosDocumentoToCommand'](command);

      // Assert
      expect(command.idTransportista).toBeDefined();
    });

    it('setea el codigoFiscalTransportista al command cuando el transportista no esta registrado', () => {
      // Arrange
      spyOn(component.form, 'get').and.returnValue(new FormControl({id: 0, codigo: '123'}));

      // Act
      component['mapControlDatosDocumentoToCommand'](command);

      // Assert
      expect(command.codigoFiscalTransportista).toBeDefined();
    });
  });

  describe('El metodo loadMovimiento', () => {
    let movimiento: MovimientoCerealSubproducto;

    beforeEach(() => {
      movimiento = new MovimientoCerealSubproducto(new Circuito(), new EstadoMovimiento(1));
      movimiento.fechaStockSan = '01/01/2018';

      spyOn(fcService, 'setValue');

      component.datosDocumento.loadMovimiento = jasmine.createSpy('loadMovimiento');
    });

    it('setea el circuito del componente', () => {
      // Arrange

      // Act
      component['loadMovimiento'](movimiento);

      // Assert
      expect(component.circuito).toEqual(movimiento.circuito);
    });

    // it('setea el documentoPorte.numeroDocumentoPorte del form', () => {
    //   // Arrange

    //   // Se comenta por tema de máscara
    //   // Act
    //   component['loadMovimiento'](movimiento);

    //   // Assert
    //   expect(fcService.setValue).toHaveBeenCalledWith(
    //     'documentoPorte.numeroDocumentoPorte', movimiento.nroDocumentoPorte, {onlySelf: true}, false
    //   );
    // });

    it('setea el documentoPorte.tipoDocumentoPorte del form', () => {
      // Arrange

      // Act
      component['loadMovimiento'](movimiento);

      // Assert
      expect(fcService.setValue).toHaveBeenCalledWith(
        'documentoPorte.tipoDocumentoPorte', movimiento.tipoDocumentoPorte, {onlySelf: true}, false
      );
    });

    it('setea el datosDocumento.estadoMovimiento del form', () => {
      // Arrange

      // Act
      component['loadMovimiento'](movimiento);

      // Assert
      expect(fcService.setValue).toHaveBeenCalledWith(
        'datosDocumento.estadoMovimiento', movimiento.estado.descripcion, {onlySelf: true}
      );
    });

    it('invoca al loadMovimiento del datosDocumento', () => {
      // Arrange

      // Act
      component['loadMovimiento'](movimiento);

      // Assert
      expect(component.datosDocumento.loadMovimiento).toHaveBeenCalledWith(movimiento);
    });

    it('setea el fechaPeriodoStockSan.fechaStock del form', () => {
      // Arrange
      const fecha = new Date(movimiento.fechaStockSan).toLocalISOString().substring(0, 10);

      // Act
      component['loadMovimiento'](movimiento);

      // Assert
      expect(fcService.setValue).toHaveBeenCalledWith(
        'fechaPeriodoStockSan.fechaStock', fecha, {onlySelf: true}, false
      );
    });

    it('invoca al metodo inhabilitarControl para inhabilitar el producto', () => {
      // Arrange
      spyOn<any>(component, 'inhabilitarControl');

      // Act
      component['loadMovimiento'](movimiento);

      // Assert
      expect(component['inhabilitarControl']).toHaveBeenCalledWith('producto');
    });

    it('setea el foco en el documentoPorte', () => {
      // Arrange

      // Act
      component['loadMovimiento'](movimiento);

      // Assert
      expect(component.documentoPorte.setFocus).toHaveBeenCalled();
    });

    it('emite el evento onMovimientoRetrieved del eventsNotifierService con el movimiento recuperado', () => {
      // Arrange
      const eventsNotifierService = fixture.debugElement.injector.get(DescargaEventsNotifierService);
      spyOn(eventsNotifierService, 'onMovimientoRetrieved');

      // Act
      component['loadMovimiento'](movimiento);

      // Assert
      expect(eventsNotifierService.onMovimientoRetrieved).toHaveBeenCalledWith(movimiento);
    });
  });

  describe('El metodo subscribeNavigation', () => {
    beforeEach(() => {
      const navigationService = fixture.debugElement.injector.get(NavigationService);
      spyOn(navigationService, 'requestExtras').and.returnValue(of({idMovimiento: 1}));
      spyOn(fcService, 'setValue');
      spyOn<any>(component, 'buscarMovimiento');
    });

    it('setea idMovimiento del componente con el id enviado por querystring', () => {
      // Arrange

      // Act
      component['subscribeNavigation']();

      // Assert
      expect(component.idMovimiento).toEqual(1);
    });

    it('invoca al buscarMovimiento base', () => {
      // Arrange

      // Act
      component['subscribeNavigation']();

      // Assert
      expect(component['buscarMovimiento']).toHaveBeenCalled();
    });
  });

  describe('El constructor', () => {
    it('setea esFueraCircuito del componente en true', () => {
      // Arrange

      // Act

      // Assert
      expect(component.esFueraCircuito).toBeTruthy();
    });

    it('setea tipoProductoSeleccionada del componente con NoGranos', () => {
      // Arrange

      // Act

      // Assert
      expect(component.tipoProductoSeleccionada).toEqual(EntitiesTiposProducto.NoGranos);
    });

    it('setea idActividad del componente con el id enviado de ModificarControlFueraCircuito', () => {
      // Arrange

      // Act

      // Assert
      expect(component.idActividad).toEqual(Actividades.ModificarControlFueraCircuito);
    });

    it('setea ControlPath del componente con ModificarControlDescargaVagonNoGranos', () => {
      // Arrange
      const esperado = 'ModificarControlDescargaVagonNoGranos';

      // Act

      // Assert
      expect(component.ControlPath).toEqual(esperado);
    });
  });
});
