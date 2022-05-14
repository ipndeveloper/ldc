import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarControlDescargaCamionInsumosComponent } from './modificar-control-descarga-camion-insumos.component';
import { TestModule } from '../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HotkeyModule } from 'angular2-hotkeys';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { CircuitoService } from '../../shared/services/circuito.service';
import { MovimientoService } from '../../shared/services/movimiento.service';
import { ControlarDescargaCamionCerealesService } from '../../controlar-descarga-camion-cereales/controlar-descarga-camion-cereales.service';
import { AuthService } from '../../../core/services/session/auth.service';
import { DescargaEventsNotifierService } from '../../shared/services/descarga-events-notifier.service';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { NavigationService } from '../../../core/services/navigationService/navigation.service';
import { CommandService } from '../../../shared/command-service/command.service';
import { Routes } from '@angular/router';
import { Circuito } from '../../../shared/data-models/circuito/circuito';
import { DatosDocumentoInsumosComponent } from '../../controlar-descarga-camion-insumos/datos-documento-insumos/datos-documento-insumos.component';
import { Movimiento } from '../../../shared/data-models/movimiento';
import { EstadoMovimiento } from '../../../shared/data-models/estado-movimiento';
import { ParametrosTerminalService } from '../../shared/services/parametros-terminal.service';
import { TiposDocumentoPorte, Productos, Sociedades } from '../../../shared/enums/enums';
import { TipoDocumentoPorte } from '../../shared/data-models/tipo-documento-porte';
import { configureTestSuite } from '../../../core/mocks/testing';
import { FinalidadService } from '../../../shared/desplegable-finalidad/finalidad.service';

export const MockRoutes: Routes = [
  {
      path: '',
      component: ModificarControlDescargaCamionInsumosComponent,
      data: {
          title: 'ModificarControlDescargaCamionInsumos'
      },
      pathMatch: 'full'
  }
];

describe('ModificarControlDescargaCamionInsumosComponent', () => {
  let component: ModificarControlDescargaCamionInsumosComponent;
  let fixture: ComponentFixture<ModificarControlDescargaCamionInsumosComponent>;
  let fcService: FormComponentService;
  let eventsNotifierService: DescargaEventsNotifierService;
  let fb: FormBuilder;
  let movimiento: Movimiento;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule,
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        HotkeyModule.forRoot(),
        ToastrModule.forRoot(),
        RouterTestingModule.withRoutes(MockRoutes)
      ],
      providers : [
        CircuitoService,
        MovimientoService,
        ControlarDescargaCamionCerealesService,
        AuthService,
        DescargaEventsNotifierService,
        FormComponentService,
        NavigationService,
        CommandService,
        DatosDocumentoInsumosComponent,
        ParametrosTerminalService,
        FinalidadService
      ],
      declarations: [ ModificarControlDescargaCamionInsumosComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  function createForm() {
    component.form = fb.group({
      circuito: fb.group({
        terminal: { value: '', disabled: true },
        tipoMovimiento: { value: '', disabled: true },
        tipoTransporte: { value: '', disabled: true },
        tipoProducto: { value: '', disabled: true }
      }),
      documentoPorte: fb.group({
        tipoDocumentoPorte: [''],
        numeroDocumentoPorte: [{ value: '545457457', disabled: false }],
        fechaEntrada: { value: undefined, disabled: true },
        fechaSalida: { value: undefined, disabled: true },
        fechaOperacion: { value: undefined, disabled: true }
      }),
      fechaPeriodoStockSan: fb.group({
        fechaStock: { value: undefined, disabled: false }
      }),
      datosDocumento: fb.group({
        producto: { value: null, disabled: false },
        estado: { value: '', disabled: true },
        tarjeta: { value: '', disabled: false },
        patentes: fb.group({
          patenteCamion: { value: null, disabled: false },
          patenteAcoplado: { value: null, disabled: false },
        }),
        kilosBrutosTaraGroup: fb.group({
          kilosBruto: { value: null, disabled: false },
          kilosTara: { value: '', disabled: false },
        }),
        kilosNeto: [{ value: '', disabled: true }],
        vendedor: { value: undefined, disabled: false },
        transportista: { value: '', disabled: false },
        observaciones: { value: undefined, disabled: false }
      })
    });
    fcService.initialize(component.form);
  }

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarControlDescargaCamionInsumosComponent);
    component = fixture.componentInstance;
    fcService = TestBed.get(FormComponentService);
    eventsNotifierService = TestBed.get(DescargaEventsNotifierService);
    component.datosDocumentoInsumos = TestBed.get(DatosDocumentoInsumosComponent);
    fb = new FormBuilder();
    createForm();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('El metodo mapControlsToCommand', () => {
    beforeEach(() => {
      const circuito = new Circuito();
      component.circuito = circuito;
      component.datosDocumentoInsumos.movimiento = new Movimiento(circuito, new EstadoMovimiento(1, 'estado'));
    });

    it('Setea las observaciones', () => {
      // Arrange
      const esperado = 'observaciones';
      fcService.setValue('datosDocumento.observaciones', esperado, {onlySelf: true});
      // Act
      const resultado = component['mapControlsToCommand']();
      // Assert
      expect(resultado.observaciones).toEqual(esperado);
    });

    it('Setea la version', () => {
      // Arrange
      component.datosDocumentoInsumos.movimiento.version = '23123423423';
      // Act
      const resultado = component['mapControlsToCommand']();
      // Assert
      expect(resultado.version).toEqual(component.datosDocumentoInsumos.movimiento.version);
    });

    it('Setea el circuito', () => {
      // Arrange
      const circuito = new Circuito();
      circuito.id = 3;
      component.circuito = circuito;
      // Act
      const resultado = component['mapControlsToCommand']();
      // Assert
      expect(resultado.idCircuito).toEqual(component.circuito.id);
    });

    it('Setea el tipoDocPorte', () => {
      // Arrange
      const esperado = TiposDocumentoPorte.CartaDePorte;
      fcService.setValue('documentoPorte.tipoDocumentoPorte', esperado, {onlySelf: true});
      // Act
      const resultado = component['mapControlsToCommand']();
      // Assert
      expect(resultado.idTipoDocumentoPorte).toEqual(esperado);
    });

    it('Setea el numero doc porte', () => {
      // Arrange
      const esperado = '423444234';
      fcService.setValue('documentoPorte.numeroDocumentoPorte', esperado, {onlySelf: true});
      // Act
      const resultado = component['mapControlsToCommand']();
      // Assert
      expect(resultado.numeroDocumentoPorte).toEqual(esperado);
    });

    it('Setea el numeroTarjeta', () => {
      // Arrange
      const esperado = 1;
      fcService.setValue('datosDocumento.tarjeta', esperado, {onlySelf: true});
      // Act
      const resultado = component['mapControlsToCommand']();
      // Assert
      expect(resultado.numeroTarjeta).toEqual(esperado);
    });

    it('Setea el producto', () => {
      // Arrange
      const esperado = Productos.Soja;
      fcService.setValue('datosDocumento.producto', esperado, {onlySelf: true});
      // Act
      const resultado = component['mapControlsToCommand']();
      // Assert
      expect(resultado.idProducto).toEqual(esperado);
    });

    it('Setea el vendedor', () => {
      // Arrange
      const esperado = Sociedades.LDC;
      fcService.setValue('datosDocumento.vendedor', esperado, {onlySelf: true});
      // Act
      const resultado = component['mapControlsToCommand']();
      // Assert
      expect(resultado.idVendedor).toEqual(esperado);
    });

    it('Setea la patenteCamion', () => {
      // Arrange
      const esperado = 'AAA111';
      fcService.setValue('datosDocumento.patentes.patenteCamion', esperado, {onlySelf: true});
      // Act
      const resultado = component['mapControlsToCommand']();
      // Assert
      expect(resultado.patenteCamion).toEqual(esperado);
    });

    it('Setea la patenteAcoplado', () => {
      // Arrange
      const esperado = 'AAA111';
      fcService.setValue('datosDocumento.patentes.patenteAcoplado', esperado, {onlySelf: true});
      // Act
      const resultado = component['mapControlsToCommand']();
      // Assert
      expect(resultado.patenteAcoplado).toEqual(esperado);
    });

    it('Setea los kilosBruto', () => {
      // Arrange
      const esperado = 11111;
      fcService.setValue('datosDocumento.kilosBrutosTaraGroup.kilosBruto', esperado, {onlySelf: true});
      // Act
      const resultado = component['mapControlsToCommand']();
      // Assert
      expect(resultado.kgBruto).toEqual(esperado);
    });

    it('Setea los kilosTara', () => {
      // Arrange
      const esperado = 11111;
      fcService.setValue('datosDocumento.kilosBrutosTaraGroup.kilosTara', esperado, {onlySelf: true});
      // Act
      const resultado = component['mapControlsToCommand']();
      // Assert
      expect(resultado.kgTara).toEqual(esperado);
    });

    it('Setea el transportista', () => {
      // Arrange
      const esperado = {id: 1, codigoFiscal: '1234'};
      fcService.setValue('datosDocumento.transportista', esperado, {onlySelf: true});
      // Act
      const resultado = component['mapControlsToCommand']();
      // Assert
      expect(resultado.idTransportista).toEqual(esperado.id);
    });

    it('Setea el codigoFiscalTransportista', () => {
      // Arrange
      const esperado = {id: 1, codigoFiscal: '1234'};
      fcService.setValue('datosDocumento.transportista', esperado, {onlySelf: true});
      // Act
      const resultado = component['mapControlsToCommand']();
      // Assert
      expect(resultado.codigoFiscalTransportista).toEqual(esperado.codigoFiscal);
    });

  });

  describe('El metodo LoadMovimiento', () => {
    beforeEach(() => {
      movimiento = {
        nroDocumentoPorte: '2232312',
        fechaStockSan: '10-12-2019',
        estado: { descripcion: 'estado' } as EstadoMovimiento,
        tipoDocumentoPorte: {id: TiposDocumentoPorte.CartaDePorte} as TipoDocumentoPorte,
        fechaEntrada: '10-12-2019',
        fechaSalida: '10-12-2019',
        fechaOperacion: '10-12-2019'
      } as Movimiento;
    });

    it('Setea el numeroDocumentoPorte', () => {
      // Arrange
      const esperado = movimiento.nroDocumentoPorte;
      // Act
      component['loadMovimiento'](movimiento);
      // Assert
      const resultado = fcService.getValue('documentoPorte.numeroDocumentoPorte');
      expect(resultado).toEqual(esperado);
    });

    it('Setea la fechaStockSan', () => {
      // Arrange
      const esperado = new Date(movimiento.fechaStockSan).toLocalISOString().substring(0, 10);
      // Act
      component['loadMovimiento'](movimiento);
      // Assert
      const resultado = fcService.getValue('fechaPeriodoStockSan.fechaStock');
      expect(resultado).toEqual(esperado);
    });

    it('Setea el estado', () => {
      // Arrange
      const esperado = movimiento.estado.descripcion;
      // Act
      component['loadMovimiento'](movimiento);
      // Assert
      const resultado = fcService.getValue('datosDocumento.estado');
      expect(resultado).toEqual(esperado);
    });

    it('Setea el tipoDocumentoPorte', () => {
      // Arrange
      const esperado = movimiento.tipoDocumentoPorte;
      // Act
      component['loadMovimiento'](movimiento);
      // Assert
      const resultado = fcService.getValue('documentoPorte.tipoDocumentoPorte');
      expect(resultado).toEqual(esperado.id);
    });

    it('Setea la fechaEntrada', () => {
      // Arrange
      const esperado = movimiento.fechaEntrada;
      // Act
      component['loadMovimiento'](movimiento);
      // Assert
      const resultado = fcService.getValue('documentoPorte.fechaEntrada');
      expect(resultado).toEqual(esperado);
    });

    it('Setea la fechaSalida', () => {
      // Arrange
      const esperado = movimiento.fechaSalida;
      // Act
      component['loadMovimiento'](movimiento);
      // Assert
      const resultado = fcService.getValue('documentoPorte.fechaSalida');
      expect(resultado).toEqual(esperado);
    });

    it('Setea la fechaOperacion', () => {
      // Arrange
      const esperado = movimiento.fechaOperacion;
      // Act
      component['loadMovimiento'](movimiento);
      // Assert
      const resultado = fcService.getValue('documentoPorte.fechaOperacion');
      expect(resultado).toEqual(esperado);
    });

    it('invoca al metodo onMovimientoRetrieved', () => {
      // Arrange
      jasmine.clock().install();
      spyOn(eventsNotifierService, 'onMovimientoRetrieved');
      // Act
      component['loadMovimiento'](movimiento);
      // Assert
      jasmine.clock().tick(0);
      expect(eventsNotifierService.onMovimientoRetrieved).toHaveBeenCalledWith(movimiento);
      jasmine.clock().uninstall();
    });
  });
});
