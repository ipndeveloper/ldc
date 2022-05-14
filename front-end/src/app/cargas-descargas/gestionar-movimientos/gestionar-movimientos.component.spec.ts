import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { GestionarMovimientosComponent } from './gestionar-movimientos.component';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { SearchMovimientosService } from './search-movimientos.service';
import { NavigationService } from '../../core/services/navigationService/navigation.service';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HotkeyModule } from 'angular2-hotkeys';
import { TestModule } from '../../core/mocks/test.module';
import { ModalModule } from '../../core/components/modal/modal.module';
import { RouterModule, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { EstadoMovimientoService } from '../../shared/desplegable-estado-movimiento/estado-movimiento.service';
import { PatenteService } from '../shared/services/patente.service';
import { VagonService } from '../../shared/autocomplete-vagon/vagon.service';
import { ConsultaSanService } from './consulta-san.service';
import { GestionarMovimientoDataView } from './gestionar-movimiento-data-view';
import { of } from 'rxjs';
import { StockAbiertoMovimientoSan } from '../../shared/data-models/gestionar-movimientos/stock-abierto-movimiento-san';
import { EstadoMovimiento } from '../../shared/data-models/estado-movimiento';
import { EstadoMovimientoSan } from '../../shared/data-models/gestionar-movimientos/estado-movimiento-san';
import { PopupService } from '../../core/services/popupService/popup.service';
import { EstadosMovimiento, TiposProducto } from '../../shared/enums/enums';
import { ApiService } from '../../../app/core/services/restClient/api.service';
import { Resources } from '../../../locale/artifacts/resources';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { configureTestSuite } from '../../core/mocks/testing';
import { PageStateService } from '../../core/services/pageStateService/page-state.service';
import { AuthService } from '../../core/services/session/auth.service';

export const MockRoutes: Routes = [
  {
      path: '',
      component: GestionarMovimientosComponent,
      data: {
          title: 'GestionarMovimientos'
      },
      pathMatch: 'full'
  }
];

describe('GestionarMovimientosComponent', () => {
  let component: GestionarMovimientosComponent;
  let fixture: ComponentFixture<GestionarMovimientosComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [GestionarMovimientosComponent],
      providers: [
        FormComponentService,
        SearchMovimientosService,
        NavigationService,
        EstadoMovimientoService,
        PatenteService,
        VagonService,
        ConsultaSanService,
        PopupService,
        ApiService,
        SearchFormActionsNotifierService,
        PageStateService,
        AuthService
      ],
      imports: [
        TestModule,
        BrowserModule,
        ReactiveFormsModule,
        HotkeyModule.forRoot(),
        ModalModule,
        RouterModule,
        RouterTestingModule.withRoutes(MockRoutes)
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {

    const apiService = TestBed.get(ApiService);
    spyOn(apiService, 'get').and.returnValue(of());
    spyOn(apiService, 'post').and.returnValue(of());

    const navigationService = TestBed.get(NavigationService);
    spyOn(navigationService, 'navigate');

    const searchMovimientosService = TestBed.get(SearchMovimientosService);
    spyOn(searchMovimientosService, 'validateSearchClick').and.returnValue(of(new Array<GestionarMovimientoDataView>()));
    spyOn(searchMovimientosService, 'getData').and.returnValue(of(new Array<GestionarMovimientoDataView>()));

    const estadoMovimientoService = TestBed.get(EstadoMovimientoService);
    const estadoMovimiento1 = new EstadoMovimiento(EstadosMovimiento.AptoControlSalida, undefined);
    spyOn(estadoMovimientoService, 'getEstadosMovimientoByIdByIdsActividad').and.returnValue(of([estadoMovimiento1]));

    const consultaSanService = TestBed.get(ConsultaSanService);
    spyOn(consultaSanService, 'leerEstadoDeStockEnSan').and.returnValue(of(new StockAbiertoMovimientoSan()));
    spyOn(consultaSanService, 'leerEstadoDeMovimientoEnSan').and.returnValue(of(new EstadoMovimientoSan()));

    const popupService = TestBed.get(PopupService);
    spyOn(popupService, 'error');

    const pageStateService = TestBed.get(PageStateService);
    spyOn(pageStateService, 'getState');
    spyOn(pageStateService, 'saveState');

    fixture = TestBed.createComponent(GestionarMovimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('El metodo onClickModificarBalanza', () => {

    beforeEach(() => {

      const idEstadoMovimiento = EstadosMovimiento.AptoControlSalida;

      const movimiento = new GestionarMovimientoDataView();
      movimiento.idEstadoMovimiento = idEstadoMovimiento;

      component.selectedRow = new Array();
      component.selectedRow.push(movimiento);

    });

    it('Cuando estado de movimiento no es valida para modificar fuera de circuito debe mostrar un mensaje de error.',
      inject([],
        () => {

        // Arrange
        component.estadosValidosParaModificarPesoFueraCircuito = [EstadosMovimiento.AptoCalado];

        // Act
        component.onClickModificarBalanza();

        // Assert
        expect(component.popupService.error).toHaveBeenCalledTimes(1);
      })
    );

    it('Llama una vez al metodo leerEstadoDeStockEnSan de consultaSanService.',
      inject([ConsultaSanService],
        (consultaSanService: ConsultaSanService) => {

        // Arrange

        // Act
        component.onClickModificarBalanza();

        // Assert
        expect(consultaSanService.leerEstadoDeMovimientoEnSan).toHaveBeenCalledTimes(1);
      })
    );

    it('Cuando servicio consultaSanService recibe fechaStockSan menor a fechaStockSanRecibida muestra un mensaje de error.',
      inject([ConsultaSanService],
        (consultaSanService: ConsultaSanService) => {

        // Arrange
        const fechaStockSan = new Date(2018, 10, 20);
        const fechaStockSanRecibida = new Date(2018, 10, 22);

        const respuesta = {
          fechaStockSan: fechaStockSan,
          fechaStockSanRecibida: fechaStockSanRecibida,
          imputaStock: true
        };
        (consultaSanService.leerEstadoDeStockEnSan as jasmine.Spy).and.returnValue(of(respuesta));

        // Act
        component.onClickModificarBalanza();

        // Assert
        const mensajeEsperado = Resources.Messages.ModificacionFueraDeCircuitoPeriodoStockCerrado
          .format(fechaStockSanRecibida.toString());
        expect(component.popupService.error).toHaveBeenCalledWith(mensajeEsperado);
      })
    );

    it('Llama una vez al metodo leerEstadoDeMovimientoEnSan de consultaSanService.',
      inject([ConsultaSanService],
        (consultaSanService: ConsultaSanService) => {

        // Arrange

        // Act
        component.onClickModificarBalanza();

        // Assert
        expect(consultaSanService.leerEstadoDeMovimientoEnSan).toHaveBeenCalledTimes(1);
      })
    );

    it('Cuando servicio consultaSanService recibe un movimiento con fueEmitidoFormularioF1116 con valor true muestra un mensaje de error.',
      inject([ConsultaSanService],
        (consultaSanService: ConsultaSanService) => {

        // Arrange
        const respuesta = new EstadoMovimientoSan();
        respuesta.cantidadAplicada = 101;
        respuesta.cantidadLiquidada = 100;
        respuesta.fueEmitidoFormularioF1116 = true;
        respuesta.kgPesoNeto = 15000;

        (consultaSanService.leerEstadoDeMovimientoEnSan as jasmine.Spy).and.returnValue(of(respuesta));

        // Act
        component.onClickModificarBalanza();

        // Assert
        const mensajeEsperado = Resources.Messages.ModificacionFueraDeCircuitoNoPodraModificarseDatosPesaje
          .format(respuesta.cantidadAplicada.toString(),
                  respuesta.cantidadLiquidada.toString(),
                  respuesta.fueEmitidoFormularioF1116 ? 'SI' : 'NO',
                  respuesta.kgPesoNeto.toString());
        expect(component.popupService.error).toHaveBeenCalledWith(mensajeEsperado);
      })
    );

    it('Cuando servicio consultaSanService recibe un movimiento con cantidad aplicada igual al kgPesoNeto muestra un mensaje de error.',
      inject([ConsultaSanService],
        (consultaSanService: ConsultaSanService) => {

        // Arrange
        const respuesta = new EstadoMovimientoSan();
        respuesta.cantidadAplicada = 15000;
        respuesta.cantidadLiquidada = 100;
        respuesta.fueEmitidoFormularioF1116 = false;
        respuesta.kgPesoNeto = 15000;

        (consultaSanService.leerEstadoDeMovimientoEnSan as jasmine.Spy).and.returnValue(of(respuesta));

        // Act
        component.onClickModificarBalanza();

        // Assert
        const mensajeEsperado = Resources.Messages.ModificacionFueraDeCircuitoNoPodraModificarseDatosPesaje
          .format(respuesta.cantidadAplicada.toString(),
                  respuesta.cantidadLiquidada.toString(),
                  respuesta.fueEmitidoFormularioF1116 ? 'SI' : 'NO',
                  respuesta.kgPesoNeto.toString());
        expect(component.popupService.error).toHaveBeenCalledWith(mensajeEsperado);
      })
    );

    it('Cuando servicio consultaSanService recibe un movimiento con cantidad aplicada mayor al kgPesoNeto muestra un mensaje de error.',
      inject([ConsultaSanService],
        (consultaSanService: ConsultaSanService) => {

        // Arrange
        const respuesta = new EstadoMovimientoSan();
        respuesta.cantidadAplicada = 15001;
        respuesta.cantidadLiquidada = 100;
        respuesta.fueEmitidoFormularioF1116 = false;
        respuesta.kgPesoNeto = 15000;

        (consultaSanService.leerEstadoDeMovimientoEnSan as jasmine.Spy).and.returnValue(of(respuesta));

        // Act
        component.onClickModificarBalanza();

        // Assert
        const mensajeEsperado = Resources.Messages.ModificacionFueraDeCircuitoNoPodraModificarseDatosPesaje
          .format(respuesta.cantidadAplicada.toString(),
                  respuesta.cantidadLiquidada.toString(),
                  respuesta.fueEmitidoFormularioF1116 ? 'SI' : 'NO',
                  respuesta.kgPesoNeto.toString());
        expect(component.popupService.error).toHaveBeenCalledWith(mensajeEsperado);
      })
    );

    it('Cuando servicio consultaSanService recibe un movimiento con cantidad liquidada igual al kgPesoNeto muestra un mensaje de error.',
      inject([ConsultaSanService],
        (consultaSanService: ConsultaSanService) => {

        // Arrange
        const respuesta = new EstadoMovimientoSan();
        respuesta.cantidadAplicada = 100;
        respuesta.cantidadLiquidada = 15000;
        respuesta.fueEmitidoFormularioF1116 = false;
        respuesta.kgPesoNeto = 15000;

        (consultaSanService.leerEstadoDeMovimientoEnSan as jasmine.Spy).and.returnValue(of(respuesta));

        // Act
        component.onClickModificarBalanza();

        // Assert
        const mensajeEsperado = Resources.Messages.ModificacionFueraDeCircuitoNoPodraModificarseDatosPesaje
          .format(respuesta.cantidadAplicada.toString(),
                  respuesta.cantidadLiquidada.toString(),
                  respuesta.fueEmitidoFormularioF1116 ? 'SI' : 'NO',
                  respuesta.kgPesoNeto.toString());
        expect(component.popupService.error).toHaveBeenCalledWith(mensajeEsperado);
      })
    );

    it('Cuando servicio consultaSanService recibe un movimiento con cantidad liquidada mayor al kgPesoNeto muestra un mensaje de error.',
      inject([ConsultaSanService],
        (consultaSanService: ConsultaSanService) => {

        // Arrange
        const respuesta = new EstadoMovimientoSan();
        respuesta.cantidadAplicada = 100;
        respuesta.cantidadLiquidada = 15001;
        respuesta.fueEmitidoFormularioF1116 = false;
        respuesta.kgPesoNeto = 15000;

        (consultaSanService.leerEstadoDeMovimientoEnSan as jasmine.Spy).and.returnValue(of(respuesta));

        // Act
        component.onClickModificarBalanza();

        // Assert
        const mensajeEsperado = Resources.Messages.ModificacionFueraDeCircuitoNoPodraModificarseDatosPesaje
          .format(respuesta.cantidadAplicada.toString(),
                  respuesta.cantidadLiquidada.toString(),
                  respuesta.fueEmitidoFormularioF1116 ? 'SI' : 'NO',
                  respuesta.kgPesoNeto.toString());
        expect(component.popupService.error).toHaveBeenCalledWith(mensajeEsperado);
      })
    );

    it('Llama una vez al metodo navigate de navigationService.',
      inject([NavigationService],
        (navigationService: NavigationService) => {

        // Arrange

        // Act
        component.onClickModificarBalanza();

        // Assert
        expect(navigationService.navigate).toHaveBeenCalledTimes(1);
      })
    );
  });

  describe('El metodo onClickModificarProducto', () => {

    beforeEach(() => {

      const idEstadoMovimiento = EstadosMovimiento.AptoControlSalida;

      const movimiento = new GestionarMovimientoDataView();
      movimiento.idEstadoMovimiento = idEstadoMovimiento;

      component.selectedRow = new Array();
      component.selectedRow.push(movimiento);

    });

    it('Cuando estado de movimiento no es valida para modificar fuera de circuito debe mostrar un mensaje de error.',
      inject([],
        () => {

        // Arrange
        component.estadosValidosParaModificarProductoFueraCircuito = [EstadosMovimiento.AptoCalado];

        // Act
        component.onClickModificarProducto();

        // Assert
        expect(component.popupService.error).toHaveBeenCalledTimes(1);
      })
    );

    it('Llama una vez al metodo leerEstadoDeStockEnSan de consultaSanService.',
      inject([ConsultaSanService],
        (consultaSanService: ConsultaSanService) => {

        // Arrange

        // Act
        component.onClickModificarProducto();

        // Assert
        expect(consultaSanService.leerEstadoDeMovimientoEnSan).toHaveBeenCalledTimes(1);
      })
    );

    it('Cuando servicio consultaSanService recibe fechaStockSan menor a fechaStockSanRecibida muestra un mensaje de error.',
      inject([ConsultaSanService],
        (consultaSanService: ConsultaSanService) => {

        // Arrange
        const fechaStockSan = new Date(2018, 10, 20);
        const fechaStockSanRecibida = new Date(2018, 10, 22);

        const respuesta = {
          fechaStockSan: fechaStockSan,
          fechaStockSanRecibida: fechaStockSanRecibida,
          imputaStock: true
        };
        (consultaSanService.leerEstadoDeStockEnSan as jasmine.Spy).and.returnValue(of(respuesta));

        // Act
        component.onClickModificarProducto();

        // Assert
        const mensajeEsperado = Resources.Messages.ModificacionFueraDeCircuitoPeriodoStockCerrado
          .format(fechaStockSanRecibida.toString());
        expect(component.popupService.error).toHaveBeenCalledWith(mensajeEsperado);
      })
    );

    it('Llama una vez al metodo leerEstadoDeMovimientoEnSan de consultaSanService.',
      inject([ConsultaSanService],
        (consultaSanService: ConsultaSanService) => {

        // Arrange

        // Act
        component.onClickModificarProducto();

        // Assert
        expect(consultaSanService.leerEstadoDeMovimientoEnSan).toHaveBeenCalledTimes(1);
      })
    );

    it('Cuando servicio consultaSanService recibe un movimiento con fueEmitidoFormularioF1116 con valor true muestra un mensaje de error.',
      inject([ConsultaSanService],
        (consultaSanService: ConsultaSanService) => {

        // Arrange
        const respuesta = new EstadoMovimientoSan();
        respuesta.cantidadAplicada = 0;
        respuesta.cantidadLiquidada = 0;
        respuesta.fueEmitidoFormularioF1116 = true;
        respuesta.kgPesoNeto = 15000;

        (consultaSanService.leerEstadoDeMovimientoEnSan as jasmine.Spy).and.returnValue(of(respuesta));

        // Act
        component.onClickModificarProducto();

        // Assert
        const mensajeEsperado = Resources.Messages.ModificacionFueraDeCircuitoNoPodraModificarseProductoMovimiento
          .format(respuesta.cantidadAplicada.toString(),
                  respuesta.cantidadLiquidada.toString(),
                  respuesta.fueEmitidoFormularioF1116 ? 'SI' : 'NO');
        expect(component.popupService.error).toHaveBeenCalledWith(mensajeEsperado);
      })
    );

    it('Cuando servicio consultaSanService recibe un movimiento con cantidad aplicada mayor a cero muestra un mensaje de error.',
      inject([ConsultaSanService],
        (consultaSanService: ConsultaSanService) => {

        // Arrange
        const respuesta = new EstadoMovimientoSan();
        respuesta.cantidadAplicada = 100;
        respuesta.cantidadLiquidada = 0;
        respuesta.fueEmitidoFormularioF1116 = false;
        respuesta.kgPesoNeto = 15000;

        (consultaSanService.leerEstadoDeMovimientoEnSan as jasmine.Spy).and.returnValue(of(respuesta));

        // Act
        component.onClickModificarProducto();

        // Assert
        const mensajeEsperado = Resources.Messages.ModificacionFueraDeCircuitoNoPodraModificarseProductoMovimiento
          .format(respuesta.cantidadAplicada.toString(),
                  respuesta.cantidadLiquidada.toString(),
                  respuesta.fueEmitidoFormularioF1116 ? 'SI' : 'NO');
        expect(component.popupService.error).toHaveBeenCalledWith(mensajeEsperado);
      })
    );

    it('Cuando servicio consultaSanService recibe un movimiento con cantidad liquidada mayor a cero muestra un mensaje de error.',
      inject([ConsultaSanService],
        (consultaSanService: ConsultaSanService) => {

        // Arrange
        const respuesta = new EstadoMovimientoSan();
        respuesta.cantidadAplicada = 0;
        respuesta.cantidadLiquidada = 100;
        respuesta.fueEmitidoFormularioF1116 = false;
        respuesta.kgPesoNeto = 15000;

        (consultaSanService.leerEstadoDeMovimientoEnSan as jasmine.Spy).and.returnValue(of(respuesta));

        // Act
        component.onClickModificarProducto();

        // Assert
        const mensajeEsperado = Resources.Messages.ModificacionFueraDeCircuitoNoPodraModificarseProductoMovimiento
          .format(respuesta.cantidadAplicada.toString(),
                  respuesta.cantidadLiquidada.toString(),
                  respuesta.fueEmitidoFormularioF1116 ? 'SI' : 'NO');
        expect(component.popupService.error).toHaveBeenCalledWith(mensajeEsperado);
      })
    );

    it('Llama una vez al metodo navigate de navigationService.',
      inject([NavigationService],
        (navigationService: NavigationService) => {

        // Arrange

        // Act
        component.onClickModificarProducto();

        // Assert
        expect(navigationService.navigate).toHaveBeenCalledTimes(1);
      })
    );
  });

  describe('El metodo onClickModificarCalidad', () => {

    beforeEach(() => {

      const idEstadoMovimiento = EstadosMovimiento.AptoControlSalida;

      const movimiento = new GestionarMovimientoDataView();
      movimiento.idEstadoMovimiento = idEstadoMovimiento;

      component.selectedRow = new Array();
      component.selectedRow.push(movimiento);

    });

    it('Cuando estado de movimiento no es valida para modificar fuera de circuito debe mostrar un mensaje de error.',
      inject([],
        () => {

        // Arrange
        component.estadosValidosParaModificarCalidadFueraCircuito = [EstadosMovimiento.AptoCalado];

        // Act
        component.onClickModificarCalidad();

        // Assert
        expect(component.popupService.error).toHaveBeenCalledTimes(1);
      })
    );

    it('Llama una vez al metodo leerEstadoDeStockEnSan de consultaSanService.',
      inject([ConsultaSanService],
        (consultaSanService: ConsultaSanService) => {

        // Arrange

        // Act
        component.onClickModificarCalidad();

        // Assert
        expect(consultaSanService.leerEstadoDeMovimientoEnSan).toHaveBeenCalledTimes(1);
      })
    );

    it('Cuando servicio consultaSanService recibe fechaStockSan menor a fechaStockSanRecibida muestra un mensaje de error.',
      inject([ConsultaSanService],
        (consultaSanService: ConsultaSanService) => {

        // Arrange
        const fechaStockSan = new Date(2018, 10, 20);
        const fechaStockSanRecibida = new Date(2018, 10, 22);

        const respuesta = {
          fechaStockSan: fechaStockSan,
          fechaStockSanRecibida: fechaStockSanRecibida,
          imputaStock: true
        };
        (consultaSanService.leerEstadoDeStockEnSan as jasmine.Spy).and.returnValue(of(respuesta));

        // Act
        component.onClickModificarCalidad();

        // Assert
        const mensajeEsperado = Resources.Messages.ModificacionFueraDeCircuitoPeriodoStockCerrado
          .format(fechaStockSanRecibida.toString());
        expect(component.popupService.error).toHaveBeenCalledWith(mensajeEsperado);
      })
    );

    it('Llama una vez al metodo leerEstadoDeMovimientoEnSan de consultaSanService.',
      inject([ConsultaSanService],
        (consultaSanService: ConsultaSanService) => {

        // Arrange

        // Act
        component.onClickModificarCalidad();

        // Assert
        expect(consultaSanService.leerEstadoDeMovimientoEnSan).toHaveBeenCalledTimes(1);
      })
    );

    it('Cuando servicio consultaSanService recibe un movimiento con fueEmitidoFormularioF1116 con valor true muestra un mensaje de error.',
      inject([ConsultaSanService],
        (consultaSanService: ConsultaSanService) => {

        // Arrange
        const respuesta = new EstadoMovimientoSan();
        respuesta.cantidadAplicada = 0;
        respuesta.cantidadLiquidada = 0;
        respuesta.fueEmitidoFormularioF1116 = true;
        respuesta.kgPesoNeto = 15000;

        (consultaSanService.leerEstadoDeMovimientoEnSan as jasmine.Spy).and.returnValue(of(respuesta));

        // Act
        component.onClickModificarCalidad();

        // Assert
        const mensajeEsperado = Resources.Messages.ModificacionFueraDeCircuitoNoPodraModificarseCalidadMovimiento
          .format(respuesta.cantidadAplicada.toString(),
                  respuesta.cantidadLiquidada.toString(),
                  respuesta.fueEmitidoFormularioF1116 ? 'SI' : 'NO');
        expect(component.popupService.error).toHaveBeenCalledWith(mensajeEsperado);
      })
    );

    it('Cuando servicio consultaSanService recibe un movimiento con cantidad aplicada mayor a cero muestra un mensaje de error.',
      inject([ConsultaSanService],
        (consultaSanService: ConsultaSanService) => {

        // Arrange
        const respuesta = new EstadoMovimientoSan();
        respuesta.cantidadAplicada = 100;
        respuesta.cantidadLiquidada = 0;
        respuesta.fueEmitidoFormularioF1116 = false;
        respuesta.kgPesoNeto = 15000;

        (consultaSanService.leerEstadoDeMovimientoEnSan as jasmine.Spy).and.returnValue(of(respuesta));

        // Act
        component.onClickModificarCalidad();

        // Assert
        const mensajeEsperado = Resources.Messages.ModificacionFueraDeCircuitoNoPodraModificarseCalidadMovimiento
          .format(respuesta.cantidadAplicada.toString(),
                  respuesta.cantidadLiquidada.toString(),
                  respuesta.fueEmitidoFormularioF1116 ? 'SI' : 'NO');
        expect(component.popupService.error).toHaveBeenCalledWith(mensajeEsperado);
      })
    );

    it('Cuando servicio consultaSanService recibe un movimiento con cantidad liquidada mayor a cero muestra un mensaje de error.',
      inject([ConsultaSanService],
        (consultaSanService: ConsultaSanService) => {

        // Arrange
        const respuesta = new EstadoMovimientoSan();
        respuesta.cantidadAplicada = 0;
        respuesta.cantidadLiquidada = 100;
        respuesta.fueEmitidoFormularioF1116 = false;
        respuesta.kgPesoNeto = 15000;

        (consultaSanService.leerEstadoDeMovimientoEnSan as jasmine.Spy).and.returnValue(of(respuesta));

        // Act
        component.onClickModificarCalidad();

        // Assert
        const mensajeEsperado = Resources.Messages.ModificacionFueraDeCircuitoNoPodraModificarseCalidadMovimiento
          .format(respuesta.cantidadAplicada.toString(),
                  respuesta.cantidadLiquidada.toString(),
                  respuesta.fueEmitidoFormularioF1116 ? 'SI' : 'NO');
        expect(component.popupService.error).toHaveBeenCalledWith(mensajeEsperado);
      })
    );

    it('Llama una vez al metodo navigate de navigationService.',
      inject([NavigationService],
        (navigationService: NavigationService) => {

        // Arrange

        // Act
        component.onClickModificarCalidad();

        // Assert
        expect(navigationService.navigate).toHaveBeenCalledTimes(1);
      })
    );
  });

  describe('El metodo onClickModificarControl', () => {

    beforeEach(() => {

      const idEstadoMovimiento = EstadosMovimiento.AptoControlSalida;

      const movimiento = new GestionarMovimientoDataView();
      movimiento.idEstadoMovimiento = idEstadoMovimiento;
      movimiento.idTipoProducto = TiposProducto.Cereal;

      component.selectedRow = new Array();
      component.selectedRow.push(movimiento);

    });

    it('Cuando estado de movimiento no es valida para modificar fuera de circuito debe mostrar un mensaje de error.',
      inject([],
        () => {

        // Arrange
        component.estadosValidosParaModificarFueraCircuito = [EstadosMovimiento.AptoCalado];

        // Act
        component.onClickModificarControl();

        // Assert
        expect(component.popupService.error).toHaveBeenCalledTimes(1);
      })
    );

    it('Llama una vez al metodo leerEstadoDeStockEnSan de consultaSanService.',
      inject([ConsultaSanService],
        (consultaSanService: ConsultaSanService) => {

        // Arrange

        // Act
        component.onClickModificarControl();

        // Assert
        expect(consultaSanService.leerEstadoDeMovimientoEnSan).toHaveBeenCalledTimes(1);
      })
    );

    it('Cuando servicio consultaSanService recibe fechaStockSan menor a fechaStockSanRecibida muestra un mensaje de error.',
      inject([ConsultaSanService],
        (consultaSanService: ConsultaSanService) => {

        // Arrange
        const fechaStockSan = new Date(2018, 10, 20);
        const fechaStockSanRecibida = new Date(2018, 10, 22);

        const respuesta = {
          fechaStockSan: fechaStockSan,
          fechaStockSanRecibida: fechaStockSanRecibida,
          imputaStock: true
        };
        (consultaSanService.leerEstadoDeStockEnSan as jasmine.Spy).and.returnValue(of(respuesta));

        // Act
        component.onClickModificarControl();

        // Assert
        const mensajeEsperado = Resources.Messages.ModificacionFueraDeCircuitoPeriodoStockCerrado
          .format(fechaStockSanRecibida.toString());
        expect(component.popupService.error).toHaveBeenCalledWith(mensajeEsperado);
      })
    );

    it('Llama una vez al metodo leerEstadoDeMovimientoEnSan de consultaSanService.',
      inject([ConsultaSanService],
        (consultaSanService: ConsultaSanService) => {

        // Arrange

        // Act
        component.onClickModificarControl();

        // Assert
        expect(consultaSanService.leerEstadoDeMovimientoEnSan).toHaveBeenCalledTimes(1);
      })
    );

    it('Cuando servicio consultaSanService recibe un movimiento con fueEmitidoFormularioF1116 con valor true muestra un mensaje de error.',
      inject([ConsultaSanService],
        (consultaSanService: ConsultaSanService) => {

        // Arrange
        const respuesta = new EstadoMovimientoSan();
        respuesta.cantidadAplicada = 0;
        respuesta.cantidadLiquidada = 0;
        respuesta.fueEmitidoFormularioF1116 = true;
        respuesta.kgPesoNeto = 15000;

        (consultaSanService.leerEstadoDeMovimientoEnSan as jasmine.Spy).and.returnValue(of(respuesta));

        // Act
        component.onClickModificarControl();

        // Assert
        const mensajeEsperado = Resources.Messages.ModificacionFueraDeCircuitoNoPodraModificarseMovimientoAplicadoYF1116Emitido
        .format(respuesta.cantidadAplicada.toString(),
                respuesta.cantidadLiquidada.toString(),
                respuesta.fueEmitidoFormularioF1116 ? 'SI' : 'NO');
        expect(component.popupService.error).toHaveBeenCalledWith(mensajeEsperado);
      })
    );

    it('Cuando servicio consultaSanService recibe un movimiento con cantidad aplicada mayor a cero muestra un mensaje de error.',
      inject([ConsultaSanService],
        (consultaSanService: ConsultaSanService) => {

        // Arrange
        const respuesta = new EstadoMovimientoSan();
        respuesta.cantidadAplicada = 100;
        respuesta.cantidadLiquidada = 0;
        respuesta.fueEmitidoFormularioF1116 = false;
        respuesta.kgPesoNeto = 15000;

        spyOn(component.popupService, 'warning');
        (consultaSanService.leerEstadoDeMovimientoEnSan as jasmine.Spy).and.returnValue(of(respuesta));

        // Act
        component.onClickModificarControl();

        // Assert
        const mensajeEsperado = Resources.Messages.ModificacionFueraDeCircuitoCargaNoPodranModificarseCiertosCamposDelMovimiento
        .format(respuesta.cantidadAplicada.toString(),
                respuesta.cantidadLiquidada.toString(),
                respuesta.fueEmitidoFormularioF1116 ? 'SI' : 'NO');
        expect(component.popupService.warning).toHaveBeenCalledWith(mensajeEsperado);
      })
    );

    it('Llama una vez al metodo navigate de navigationService.',
      inject([NavigationService],
        (navigationService: NavigationService) => {

        // Arrange

        // Act
        component.onClickModificarControl();

        // Assert
        expect(navigationService.navigate).toHaveBeenCalledTimes(1);
      })
    );
  });
});
