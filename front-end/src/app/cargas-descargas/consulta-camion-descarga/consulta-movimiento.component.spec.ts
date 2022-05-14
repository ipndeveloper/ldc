import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { NavigationService } from '../../core/services/navigationService/navigation.service';
import { ToastrModule } from 'ngx-toastr';
import { HotkeyModule } from 'angular2-hotkeys';
import { RouterTestingModule } from '@angular/router/testing';
import { Routes } from '@angular/router';
import { MovimientoService } from '../shared/services/movimiento.service';
import { DescargaEventsNotifierService } from '../shared/services/descarga-events-notifier.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CalidadMovimientoCerealService } from '../shared/services/calidad-movimiento-cereal.service';
import { DropdownNotificationService } from '../../core/shared/super/dropdown-notification.service';
import { TestModule } from '../../core/mocks/test.module';
import { RequestOptionsService } from '../../core/services/restClient/requestOptions.service';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { ConfirmationService } from '@jaspero/ng-confirmations';
import { MovimientoPesajeFueraDeCircuitoService } from '../modificaciones/modificar-pesos-fuera-de-circuito/movimiento-pesaje-fuera-de-circuito.service';
import { TipoProducto } from '../../shared/data-models/tipo-producto';
import { TiposProducto, TiposMovimiento, Actividades } from '../../shared/enums/enums';
import { ApiService } from '../../core/services/restClient/api.service';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { configureTestSuite } from '../../core/mocks/testing';
import { DatosDocumentoControlarCargaCamionComponent } from '../controlar-carga-camion/datos-documento-controlar-carga-camion/datos-documento-controlar-carga-camion.component';
import { DatosDocumentoControlarCargaCamionInsumoVarioComponent } from '../controlar-carga-camion-varios/datos-documento-controlar-carga-camion-varios/datos-documento-controlar-carga-camion-Insumo-vario.component';
import { ConsultaMovimientoComponent } from './consulta-movimiento.component';
import { CircuitoService } from '../shared/services/circuito.service';
import { ParametrosTerminalService } from '../shared/services/parametros-terminal.service';
import { AuthService } from '../../core/services/session/auth.service';
import { TipoDocumentoPorteService } from '../shared/desplegable-tipo-documento-porte/tipo-documento-porte.service';

export const MockRoutes: Routes = [
  {
      path: '',
      component: ConsultaMovimientoComponent,
      data: {
          title: 'ConsultaCamionDescarga'
      },
      pathMatch: 'full'
  }
];

describe('ConsultaCamionDescargaComponent', () => {
  let component: ConsultaMovimientoComponent;
  let fixture: ComponentFixture<ConsultaMovimientoComponent>;
  let movimientoService: MovimientoService;
  let circuitoService: CircuitoService;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        ConsultaMovimientoComponent,
      ],
      imports: [
        BrowserModule,
        ReactiveFormsModule,
        HotkeyModule.forRoot(),
        ToastrModule.forRoot(),
        RouterTestingModule.withRoutes(MockRoutes),
        NgxDatatableModule,
        TestModule
      ],
      providers : [
        RequestOptionsService,
        FormComponentService,
        ConfirmationService,
        NavigationService,
        MovimientoService,
        CircuitoService,
        DescargaEventsNotifierService,
        DropdownNotificationService,
        MovimientoPesajeFueraDeCircuitoService,
        CalidadMovimientoCerealService,
        DatosDocumentoControlarCargaCamionComponent,
        DatosDocumentoControlarCargaCamionInsumoVarioComponent,
        AuthService,
        ParametrosTerminalService,
        TipoDocumentoPorteService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaMovimientoComponent);
    component = fixture.componentInstance;
    component.datosDocumentoCarga = TestBed.get(DatosDocumentoControlarCargaCamionComponent);
    component.datosDocumentoCargaInsumoVario = TestBed.get(DatosDocumentoControlarCargaCamionInsumoVarioComponent);
    movimientoService = TestBed.get(MovimientoService);
    circuitoService = TestBed.get(CircuitoService);
    createForm();
    const apiService = TestBed.get(ApiService);
    spyOn(apiService, 'get').and.returnValue(of({}));
    spyOn(apiService, 'post').and.returnValue(of({}));
  });

  function createForm() {
    const fb = new FormBuilder();
    component.consultaCamionDescargaForm = fb.group({
      circuito: fb.group({
        terminal: { value: '', disabled: true },
        tipoMovimiento: { value: '', disabled: true },
        tipoTransporte: { value: '', disabled: true },
        tipoProducto: { value: '', disabled: true }
      }),
      documentoPorte: fb.group({
        tipoDocumentoPorte: { value: '', disabled: true },
        numeroDocumentoPorte: { value: '', disabled: true },
      }),
      estadoMovimiento: fb.group({
        estadoMovimienoDescripcion: { value: null, disabled: false },
        fechaEntrada: { value: null, disabled: false },
        fechaOperacion: { value: null, disabled: false },
        fechaSalida: { value: null, disabled: false }
      }),
      datosStock: fb.group({
        datosPesaje: fb.group({
          brutoDocPorte:   { value: '', disabled: true },
          taraDocPorte:    { value: '', disabled: true },
          netoDocPorte:    { value: '', disabled: true },
          kilosBruto:      { value: '', disabled: true },
          kilosTara:       { value: '', disabled: true },
          netoBalanza:     { value: '', disabled: true },
          brutoDiferencia: { value: '', disabled: true },
          taraDiferencia:  { value: '', disabled: true },
          netoDiferencia:  { value: '', disabled: true },
          brutoEsRepesaje: { value: '', disabled: true },
          taraEsRepesaje:  { value: '', disabled: true },
          entradaManualAutomatico: { value: '', disabled: true },
          salidaManualAutomatico: { value: '', disabled: true }
        }),
        datosMermas: fb.group({
          mermas: fb.array([]),
          totalMermas: { value: '', disabled: true },
        }),
        detalle: fb.group({
          netoDescarga: { value: '', disabled: true },
          coeficiente: { value: '', disabled: true },
          netoDescargaLitros: { value: '', disabled: true },
          destino: { value: '', disabled: true },
          nroTicketPesaje: { value: '', disabled: true },
          fechaStockSan: { value: '', disabled: true },
        })
      }),
    });
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('El metodo esTipoProductoVarios', () => {

    it('Devuelve true cuando tipoProductoSeleccionada es Varios', () => {
        // Arrange
        component.tipoProductoSeleccionada = new TipoProducto(TiposProducto.Varios, '');

        // Act
        const respuesta = component.esTipoProductoVarios();

        // Assert
        expect(respuesta).toBe(true);
    });

    it('Devuelve false cuando tipoProductoSeleccionada es distinto de Varios', () => {
      // Arrange
      component.tipoProductoSeleccionada = new TipoProducto(TiposProducto.NoGranos, '');

      // Act
      const respuesta = component.esTipoProductoVarios();

      // Assert
      expect(respuesta).toBe(false);
    });
  });

  describe('El metodo esTipoProductoCereal', () => {

    it('Devuelve true cuando tipoProductoSeleccionada es Cereal', () => {
        // Arrange
        component.tipoProductoSeleccionada = new TipoProducto(TiposProducto.Cereal, '');

        // Act
        const respuesta = component.esTipoProductoCereal();

        // Assert
        expect(respuesta).toBe(true);
    });

    it('Devuelve false cuando tipoProductoSeleccionada es distinto de Cereal', () => {
      // Arrange
      component.tipoProductoSeleccionada = new TipoProducto(TiposProducto.NoGranos, '');

      // Act
      const respuesta = component.esTipoProductoCereal();

      // Assert
      expect(respuesta).toBe(false);
    });
  });

  describe('El metodo esTipoProductoNoGranoOSubProducto', () => {

    it('Devuelve true cuando tipoProductoSeleccionada es NoGranos', () => {
        // Arrange
        component.tipoProductoSeleccionada = new TipoProducto(TiposProducto.NoGranos, '');

        // Act
        const respuesta = component.esTipoProductoNoGranoOSubProducto();

        // Assert
        expect(respuesta).toBe(true);
    });

    it('Devuelve true cuando tipoProductoSeleccionada es NoGranos', () => {
      // Arrange
      component.tipoProductoSeleccionada = new TipoProducto(TiposProducto.SubProductos, '');

      // Act
      const respuesta = component.esTipoProductoNoGranoOSubProducto();

      // Assert
      expect(respuesta).toBe(true);
    });

    it('Devuelve false cuando tipoProductoSeleccionada es distinto de NoGrano y es distinto de SubProducto', () => {
      // Arrange
      component.tipoProductoSeleccionada = new TipoProducto(TiposProducto.Cereal, '');

      // Act
      const respuesta = component.esTipoProductoNoGranoOSubProducto();

      // Assert
      expect(respuesta).toBe(false);
    });
  });

  describe('El metodo ngAfterViewInit', () => {
    beforeEach(() => {
      spyOn(component.consultaCamionDescargaForm, 'setControl');
      component.tipoProductoSeleccionada = new TipoProducto(TiposProducto.Cereal, '');
      spyOn<any>(component, 'buscarMovimiento').and.returnValue('');
      spyOn<any>(component, 'setActividad');
    });

    it('no invoca al metodo setControl del consultaCamionDescargaForm cuando no es carga', () => {
      // Arrange
      spyOnProperty(component, 'esCarga', 'get').and.returnValue(false);
      spyOn<any>(component, 'getCircuito');
      // Act
      component.ngAfterViewInit();
      // Assert
      expect(component.consultaCamionDescargaForm.setControl).toHaveBeenCalledTimes(0);
    });

    it('cuando es carga y movimiento tipo cereal invoca al metodo al metodo setControl del control consultaCamionDescargaForm' +
      'y setea el form de componente hijo DatosDocumentoControlarCargaCamionComponent', () => {
        // Arrange
        spyOnProperty(component, 'esCarga', 'get').and.returnValue(true);
        component.idTipoProducto = TiposProducto.Cereal;
        spyOn<any>(component, 'getCircuito');
        // Act
        component.ngAfterViewInit();
        // Assert
        expect(component.consultaCamionDescargaForm.setControl).toHaveBeenCalledTimes(1);
        expect(component.consultaCamionDescargaForm.setControl)
          .toHaveBeenCalledWith('datosDocumento', component.datosDocumentoCarga.datosDocumentoForm);
      });

    it('cuando es carga y movimiento tipo SubProductos invoca al metodo al metodo setControl del control consultaCamionDescargaForm' +
      'y setea el form de componente hijo DatosDocumentoControlarCargaCamionComponent', () => {
        // Arrange
        spyOnProperty(component, 'esCarga', 'get').and.returnValue(true);
        component.idTipoProducto = TiposProducto.SubProductos;
        spyOn<any>(component, 'getCircuito');
        // Act
        component.ngAfterViewInit();
        // Assert
        expect(component.consultaCamionDescargaForm.setControl).toHaveBeenCalledTimes(1);
        expect(component.consultaCamionDescargaForm.setControl)
          .toHaveBeenCalledWith('datosDocumento', component.datosDocumentoCarga.datosDocumentoForm);
      });

    it('cuando es carga y movimiento tipo NoGranos invoca al metodo al metodo setControl del control consultaCamionDescargaForm' +
      'y setea el form de componente hijo DatosDocumentoControlarCargaCamionComponent', () => {
        // Arrange
        spyOnProperty(component, 'esCarga', 'get').and.returnValue(true);
        component.idTipoProducto = TiposProducto.NoGranos;
        spyOn<any>(component, 'getCircuito');
        // Act
        component.ngAfterViewInit();
        // Assert
        expect(component.consultaCamionDescargaForm.setControl).toHaveBeenCalledTimes(1);
        expect(component.consultaCamionDescargaForm.setControl)
          .toHaveBeenCalledWith('datosDocumento', component.datosDocumentoCarga.datosDocumentoForm);
      });

    it('cuando es carga y movimiento tipo Insumos invoca al metodo al metodo setControl del control consultaCamionDescargaForm' +
      'y setea el form de componente hijo DatosDocumentoControlarCargaCamionInsumoVarioComponent', () => {
        // Arrange
        spyOnProperty(component, 'esCarga', 'get').and.returnValue(true);
        component.idTipoProducto = TiposProducto.Insumos;
        spyOn<any>(component, 'getCircuito');
        // Act
        component.ngAfterViewInit();
        // Assert
        expect(component.consultaCamionDescargaForm.setControl).toHaveBeenCalledTimes(1);
        expect(component.consultaCamionDescargaForm.setControl)
          .toHaveBeenCalledWith('datosDocumento', component.datosDocumentoCargaInsumoVario.datosDocumentoForm);
      });

    it('cuando es carga y movimiento tipo Varios invoca al metodo al metodo setControl del control consultaCamionDescargaForm' +
      'y setea el form de componente hijo DatosDocumentoControlarCargaCamionInsumoVarioComponent', () => {
        // Arrange
        spyOnProperty(component, 'esCarga', 'get').and.returnValue(true);
        component.idTipoProducto = TiposProducto.Varios;
        spyOn<any>(component, 'getCircuito');
        // Act
        component.ngAfterViewInit();
        // Assert
        expect(component.consultaCamionDescargaForm.setControl).toHaveBeenCalledTimes(1);
        expect(component.consultaCamionDescargaForm.setControl)
          .toHaveBeenCalledWith('datosDocumento', component.datosDocumentoCargaInsumoVario.datosDocumentoForm);
      });

      it('Invoca al metodo getMovimientoCarga del movimiento service cuando es carga', () => {
        // Arrange
        spyOnProperty(component, 'esCarga', 'get').and.returnValue(true);
        spyOn(movimientoService, 'getMovimientoCarga');
        spyOn<any>(component, 'getCircuito');
        // Act
        component.ngAfterViewInit();
        // Assert
        expect(movimientoService.getMovimientoCarga).toHaveBeenCalledTimes(1);
      });

      it('no Invoca al metodo getMovimientoCarga del movimiento service cuando es carga', () => {
        // Arrange
        spyOnProperty(component, 'esCarga', 'get').and.returnValue(false);
        spyOn(movimientoService, 'getMovimientoCarga');
        spyOn<any>(component, 'getCircuito');
        // Act
        component.ngAfterViewInit();
        // Assert
        expect(movimientoService.getMovimientoCarga).toHaveBeenCalledTimes(0);
      });

      it('Invoca al metodo getMovimientoDescarga del movimiento service cuando es descarga', () => {
        // Arrange
        spyOnProperty(component, 'esCarga', 'get').and.returnValue(false);
        spyOn(movimientoService, 'getMovimientoDescarga');
        spyOn<any>(component, 'getCircuito');
        // Act
        component.ngAfterViewInit();
        // Assert
        expect(movimientoService.getMovimientoDescarga).toHaveBeenCalledTimes(1);
      });

      it('no Invoca al metodo getMovimientoDescarga del movimiento service cuando es descarga', () => {
        // Arrange
        spyOnProperty(component, 'esCarga', 'get').and.returnValue(true);
        spyOn(movimientoService, 'getMovimientoDescarga');
        spyOn<any>(component, 'getCircuito');
        // Act
        component.ngAfterViewInit();
        // Assert
        expect(movimientoService.getMovimientoDescarga).toHaveBeenCalledTimes(0);
      });

      it('Invoca al método getCircuito del Circuito Service con TipoMovimiento Carga', () => {
        // Arrange
        spyOnProperty(component, 'esCarga', 'get').and.returnValue(true);
        spyOn(movimientoService, 'getMovimientoCarga');
        spyOn(circuitoService, 'getCircuito').and.returnValue(of());
        // Act
        component.ngAfterViewInit();
        // Assert
        expect(circuitoService.getCircuito).toHaveBeenCalledTimes(1);
        expect(circuitoService.getCircuito).toHaveBeenCalledWith(
          TiposMovimiento.Carga,
          component.idTipoTransporte,
          component.tipoProductoSeleccionada.id,
          [component.idActividad, Actividades.ValidacionCupo]
        );
      });

      it('Invoca al método getCircuito del Circuito Service con TipoMovimiento Descarga', () => {
        // Arrange
        spyOnProperty(component, 'esCarga', 'get').and.returnValue(false);
        spyOn(movimientoService, 'getMovimientoDescarga');
        spyOn(circuitoService, 'getCircuito').and.returnValue(of());
        // Act
        component.ngAfterViewInit();
        // Assert
        expect(circuitoService.getCircuito).toHaveBeenCalledTimes(1);
        expect(circuitoService.getCircuito).toHaveBeenCalledWith(
          TiposMovimiento.Descarga,
          component.idTipoTransporte,
          component.tipoProductoSeleccionada.id,
          [component.idActividad, Actividades.ValidacionCupo]
        );
      });
  });
});
