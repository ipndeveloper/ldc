import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IngresarCalidadCaladoComponent } from './ingresar-calidad-calado.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TestModule } from '../../core/mocks/test.module';
import { CircuitoService } from '../shared/services/circuito.service';
import { RubrosCalidadService } from './rubros-calidad/rubros-calidad.service';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { ConfirmacionProductoCalado } from './confirmaciones/confirmacionProductoCalado.service';
import { PatenteService } from '../shared/services/patente.service';
import { TipoProductoService } from '../../shared/desplegable-tipo-producto/tipo-producto.service';
import { ReferenciaDestinoService } from '../../shared/desplegable-referencia-destino/referencia-destino.service';
import { NavigationService } from '../../core/services/navigationService/navigation.service';
import { of } from 'rxjs';
import { GrupoRubroAnalisisService } from '../../shared/desplegable-grupo-rubro-analisis/grupo-rubro-analisis.service';
import { DropdownNotificationService } from '../../core/shared/super/dropdown-notification.service';
import { CalidadMovimientoCerealService } from '../shared/services/calidad-movimiento-cereal.service';
import { DescargaEventsNotifierService } from '../shared/services/descarga-events-notifier.service';
import { DecisionLaboratorioService } from '../gestionar-calidad-por-laboratorio/service/decision-laboratorio.service';
import { MovimientoService } from '../shared/services/movimiento.service';
import { DecimalSeparatorPipe } from '../../core/pipes/decimal-separator.pipe';
import { CaladoService } from './calado.service';
import { PositiveDecimalSeparatorPipe } from '../../core/pipes/positive-decimal-separator.pipe';
import { VagonService } from '../../shared/autocomplete-vagon/vagon.service';
import { CoreSharedModule } from '../../core/core-shared.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { IngresarCalidadCaladoService } from './ingresar-calidad-calado.service';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { configureTestSuite } from '../../core/mocks/testing';
import { CommandService } from '../../shared/command-service/command.service';
import { HotkeyModule } from 'angular2-hotkeys';
import { Terminal } from '../../shared/data-models/terminal';
import { AccionesCalidad, Operaciones, Actividades } from '../../shared/enums/enums';
import { IngresarCalidadBaseComponent } from '../shared/ingresar-calidad-base/ingresar-calidad-base.component';
import { PopupService } from '../../core/services/popupService/popup.service';
import { Resources } from '../../../locale/artifacts/resources';

describe('IngresarCalidadCaladoComponent', () => {
  let component: IngresarCalidadCaladoComponent;
  let fixture: ComponentFixture<IngresarCalidadCaladoComponent>;
  let popupService: any, caladoService: any, formComponentService: any, movimientoService: any;
  let navigationService: any, ingresarCalidadCaladoService: any, circuitoService: any;
  let rubrosCalidadService: any, confirmacionProductoCalado: any, patenteService: any;
  let tipoProductoService: any, referenciaDestinoService: any, grupoRubroAnalisisService: any;
  let dropdownNotificationService: any, calidadMovimientoCerealService: any, descargaEventsNotifierService: any;
  let decisionLaboratorioService: any, decimalSeparatorPipe: any, positiveDecimalSeparatorPipe: any;
  let vagonService: any;

  const movimientoMock = { id: 1, esRecalado: true, tieneMasDeUnaCalidad: false };

  const extrasMock = {idMovimiento: 1, operacion: Operaciones.Consulta};

  class TerminalMock extends Terminal {
    constructor(descripcion: string) {
      super(1, descripcion, false, {} as any, {} as any, {} as any, '1', false, true, false, false);
    }
  }

  configureTestSuite(() => {
    navigationService = jasmine.createSpyObj('NavigationService', ['requestExtras', 'clearCache']);
    ingresarCalidadCaladoService = jasmine.createSpyObj('IngresarCalidadCaladoService',
                                          ['getMovimientoCaladoById', 'CalcularCalidad', 'DeterminarAccionPosCalado', 'RegistrarCalidad']);
    movimientoService = jasmine.createSpyObj('MovimientoService', ['marcarMovimientoEnPuesto', 'desmarcarMovimientoEnPuesto']);
    formComponentService = jasmine.createSpyObj('FormComponentService', ['getValue', 'initialize']);
    popupService = jasmine.createSpyObj('PopupService', ['confirmOk']);
    circuitoService = jasmine.createSpy('CircuitoService');
    caladoService = jasmine.createSpy('CaladoService');
    rubrosCalidadService = jasmine.createSpy('RubrosCalidadService');
    confirmacionProductoCalado = jasmine.createSpy('ConfirmacionProductoCalado');
    patenteService = jasmine.createSpy('PatenteService');
    tipoProductoService = jasmine.createSpy('TipoProductoService');
    referenciaDestinoService = jasmine.createSpy('TipoProductoService');
    grupoRubroAnalisisService = jasmine.createSpy('GrupoRubroAnalisisService');
    dropdownNotificationService = jasmine.createSpy('DropdownNotificationService');
    calidadMovimientoCerealService = jasmine.createSpy('CalidadMovimientoCerealService');
    descargaEventsNotifierService = jasmine.createSpy('DescargaEventsNotifierService');
    decisionLaboratorioService = jasmine.createSpy('DecisionLaboratorioService');
    decimalSeparatorPipe = jasmine.createSpy('DecimalSeparatorPipe');
    positiveDecimalSeparatorPipe = jasmine.createSpy('PositiveDecimalSeparatorPipe');
    vagonService = jasmine.createSpy('VagonService');

    navigationService.requestExtras.and.returnValue( of(extrasMock) );
    ingresarCalidadCaladoService.getMovimientoCaladoById.and.returnValue( of(movimientoMock) );

    TestBed.configureTestingModule({
      declarations: [
        IngresarCalidadCaladoComponent,
      ],
      imports: [
        CoreSharedModule,
        ReactiveFormsModule,
        TestModule,
        RouterTestingModule,
        RouterModule,
        HotkeyModule.forRoot()
      ],
      providers: [
        { provide: CaladoService, useValue: caladoService },
        { provide: MovimientoService, useValue: movimientoService },
        { provide: CircuitoService, useValue: circuitoService },
        { provide: RubrosCalidadService, useValue: rubrosCalidadService },
        { provide: FormComponentService, useValue: formComponentService },
        { provide: ConfirmacionProductoCalado, useValue: confirmacionProductoCalado },
        { provide: PatenteService, useValue: patenteService },
        { provide: TipoProductoService, useValue: tipoProductoService },
        { provide: ReferenciaDestinoService, useValue: referenciaDestinoService },
        { provide: NavigationService, useValue: navigationService },
        { provide: IngresarCalidadCaladoService, useValue: ingresarCalidadCaladoService },
        { provide: GrupoRubroAnalisisService, useValue: grupoRubroAnalisisService },
        { provide: DropdownNotificationService, useValue: dropdownNotificationService },
        { provide: CalidadMovimientoCerealService, useValue: calidadMovimientoCerealService },
        { provide: DescargaEventsNotifierService, useValue: descargaEventsNotifierService },
        { provide: DecisionLaboratorioService, useValue: decisionLaboratorioService },
        { provide: DecimalSeparatorPipe, useValue: decimalSeparatorPipe },
        { provide: PositiveDecimalSeparatorPipe, useValue: positiveDecimalSeparatorPipe },
        { provide: VagonService, useValue: vagonService },
        CommandService,
        { provide: PopupService, useValue: popupService }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresarCalidadCaladoComponent);
    component = fixture.componentInstance;
    component.terminal = new TerminalMock('Terminal');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('valida que las AccionesCalidad de accionesPath no sean nulos', () => {

    expect(component.accionesPath.length).toBeGreaterThanOrEqual(5);
  });

  describe('El Metodo traeCalidadAnterior', () => {
    it('retorna verdadero cuando el movimiento tiene mas de una calidad y la operacion no es Alta', () => {
      component.movimiento.tieneMasDeUnaCalidad = true;
      component.operacion = Operaciones.Consulta;

      expect(component.traeCalidadAnterior()).toBeTruthy();
    });
    it('retorna verdadero cuando el movimiento tiene mas de una calidad y la operacion no es Alta', () => {
      component.movimiento.tieneMasDeUnaCalidad = true;
      component.operacion = Operaciones.Modificacion;

      expect(component.traeCalidadAnterior()).toBeTruthy();
    });
    it('retorna falso cuando el movimiento tiene mas de una calidad y la operacion es Alta', () => {
      component.movimiento.tieneMasDeUnaCalidad = true;
      component.operacion = Operaciones.Alta;

      expect(component.traeCalidadAnterior()).toBeFalsy();
    });
    it('retorna falso cuando el movimiento no tiene mas de una calidad y la operacion no es Alta', () => {
      component.movimiento.tieneMasDeUnaCalidad = false;
      component.operacion = Operaciones.Consulta;

      expect(component.traeCalidadAnterior()).toBeFalsy();
    });
  });

  describe('El metodo setPathAnterior', () => {
    beforeEach(() => {
      component.esNavegacion = false;
    });
    it('debe setear esNavegacion en true cuando la operacion es Consulta', () => {
      component.operacion = Operaciones.Consulta;

      component.setPathAnterior();

      expect(component.esNavegacion).toBeTruthy();
    });
    it('debe setear esNavegacion en true cuando la operacion es Modificacion', () => {
      component.operacion = Operaciones.Modificacion;

      component.setPathAnterior();

      expect(component.esNavegacion).toBeTruthy();
    });
    it('debe setear esNavegacion en true cuando la operacion es RegistroDecisionEntregador', () => {
      component.operacion = Operaciones.RegistroDecisionEntregador;

      component.setPathAnterior();

      expect(component.esNavegacion).toBeTruthy();
    });
    it('no debe setear esNavegacion en true cuando la operacion es Alta', () => {
      component.operacion = Operaciones.Alta;

      component.setPathAnterior();

      expect(component.esNavegacion).toBeFalsy();
    });
  });

  describe('El metodo cancelar', () => {
    beforeEach(() => {
      movimientoService.desmarcarMovimientoEnPuesto.calls.reset();
      movimientoService.desmarcarMovimientoEnPuesto.and.returnValue(of([]));
      IngresarCalidadBaseComponent.prototype.cancelar = jasmine.createSpy('cancelar');
    });
    it('no debe llamar a desmarcarMovimientoEnPuesto pero si al cancelar de la base, cuando operacion es consulta', () => {
      component.operacion = Operaciones.Consulta;

      component.cancelar();

      expect(IngresarCalidadBaseComponent.prototype.cancelar).toHaveBeenCalledTimes(1);
      expect(movimientoService.desmarcarMovimientoEnPuesto).not.toHaveBeenCalled();
    });
    it('debe llamar a desmarcarMovimientoEnPuesto y a cancelar de la clase base cuando operacion no es consulta', () => {
      component.operacion = Operaciones.Alta;

      component.cancelar();

      expect(movimientoService.desmarcarMovimientoEnPuesto).toHaveBeenCalledTimes(1);
      expect(IngresarCalidadBaseComponent.prototype.cancelar).toHaveBeenCalledTimes(1);
    });
  });

  describe('El metodo aceptarContinuar', () => {
    it('debe llamar a mensajeMerma de la clase base', () => {
      IngresarCalidadBaseComponent.prototype.mensajeMerma = jasmine.createSpy('mensajeMerma');

      component.aceptarContinuar();

      expect(IngresarCalidadBaseComponent.prototype.mensajeMerma).toHaveBeenCalledTimes(1);
    });
    it('debe recuperar en accionSeleccionada la accion seleccionada', () => {
      formComponentService.getValue.and.returnValue(AccionesCalidad.AptoDescarga);

      component.aceptarContinuar();

      expect<number|undefined>(component.accionSeleccionada).toBe(1);
    });
    it('debe llamar al metodo obtenerMensajeAceptarContinuar', () => {
      component.obtenerMensajeAceptarContinuar = jasmine.createSpy('obtenerMensajeAceptarContinuar').and.returnValue('');

      component.aceptarContinuar();

      expect(component.obtenerMensajeAceptarContinuar).toHaveBeenCalledTimes(1);
    });
  });

  describe('El metodo obtenerMensajeAceptarContinuar', () => {
    it('debe retornar el mensaje SeEstaDejandoPendienteORechazandoMovimiento cuando la accion es rechazar', () => {
      const accion: any = AccionesCalidad.Rechazar;
      component.accionSeleccionada = accion;

      expect(component.obtenerMensajeAceptarContinuar()).toEqual(Resources.Messages.SeEstaDejandoPendienteORechazandoMovimiento);
    });
    it('debe retornar el mensaje SeEstaDejandoPendienteORechazandoMovimiento cuando la accion es PendienteEntregador', () => {
      const accion: any = AccionesCalidad.PendienteEntregador;
      component.accionSeleccionada = accion;

      expect(component.obtenerMensajeAceptarContinuar()).toEqual(Resources.Messages.SeEstaDejandoPendienteORechazandoMovimiento);
    });
    it('debe retornar el mensaje SeEstaDejandoPendienteORechazandoMovimiento cuando la accion es PendienteSupervisor', () => {
      const accion: any = AccionesCalidad.PendienteSupervisor;
      component.accionSeleccionada = accion;

      expect(component.obtenerMensajeAceptarContinuar()).toEqual(Resources.Messages.SeEstaDejandoPendienteORechazandoMovimiento);
    });
    it('debe retornar el mensaje SeEstaDejandoPendienteORechazandoMovimiento cuando la accion es AptoDescarga', () => {
      const accion: any = AccionesCalidad.AptoDescarga;
      component.accionSeleccionada = accion;

      expect(component.obtenerMensajeAceptarContinuar()).toEqual(Resources.Messages.DeseaConfirmarEstaAccion);
    });
    it('debe retornar el mensaje SeEstaDejandoPendienteORechazandoMovimiento cuando la accion es AptoDescarga', () => {
      const accion: any = AccionesCalidad.aceptarCalidad;
      component.accionSeleccionada = accion;

      expect(component.obtenerMensajeAceptarContinuar()).toEqual(Resources.Messages.DeseaConfirmarEstaAccion);
    });
  });

  describe('El metodo getActividades', () => {
    it('debe retornar la actividad ModificarCalidad cuando la operacion es Modificacion', () => {
      component.operacion = Operaciones.Modificacion;

      expect(component['getActividades']()[0]).toEqual(Actividades.ModificarCalidad);
    });
    it('debe retornar la actividad RegistroDecisionEntregador cuando la operacion es RegistroDecisionEntregador', () => {
      component.operacion = Operaciones.RegistroDecisionEntregador;

      expect(component['getActividades']()[0]).toEqual(Actividades.RegistrarDecisionEntregador);
    });
    it('debe retornar la actividad ContinuarCircuitoPostLab cuando la operacion es ContinuarCircuitoPostLab', () => {
      component.operacion = Operaciones.ContinuarCircuitoPostLab;

      expect(component['getActividades']()[0]).toEqual(Actividades.ContinuarCircuitoPostLab);
    });
    it('debe retornar la actividad IngresarCalidadCalado cuando la operacion es Alta', () => {
      component.operacion = Operaciones.Alta;

      expect(component['getActividades']()[0]).toEqual(Actividades.IngresarCalidadCalado);
    });
  });

  describe('El metodo getPartialPath', () => {
    it('debe retornar ingresar-apto-descarga cuando la accion seleccionada es AptoDescarga', () => {
      formComponentService.getValue.and.returnValue(AccionesCalidad.AptoDescarga);

      expect(component['getPartialPath']()).toEqual('ingresar-apto-descarga');
    });
    it('debe retornar ingresar-pendiente-supervisor cuando la accion seleccionada es PendienteSupervisor', () => {
      formComponentService.getValue.and.returnValue(AccionesCalidad.PendienteSupervisor);

      expect(component['getPartialPath']()).toEqual('ingresar-pendiente-supervisor');
    });
    it('debe retornar ingresar-pendiente-entregador cuando la accion seleccionada es PendienteEntregador', () => {
      formComponentService.getValue.and.returnValue(AccionesCalidad.PendienteEntregador);

      expect(component['getPartialPath']()).toEqual('ingresar-pendiente-entregador');
    });
    it('debe retornar ingresar-rechazo cuando la accion seleccionada es Rechazar', () => {
      formComponentService.getValue.and.returnValue(AccionesCalidad.Rechazar);

      expect(component['getPartialPath']()).toEqual('ingresar-rechazo');
    });
    it('debe retornar ingresar-pendiente-laboratorio cuando la accion seleccionada es PendienteLaboratorio', () => {
      formComponentService.getValue.and.returnValue(AccionesCalidad.PendienteLaboratorio);

      expect(component['getPartialPath']()).toEqual('ingresar-pendiente-laboratorio');
    });
  });


  describe('La seccion consultar calidad anterior', () => {
    it('debe agregar la clase collapse cuando showCalidadAnterior esta en false', () => {
      component.showCalidadAnterior = false;

      const div: Element = fixture.nativeElement.querySelector('#consultarCalidadAnteriorSection');

      expect(div.className).toContain('collapse');
    });
    it('no debe agregar la clase collapse cuando showCalidadAnterior esta en true', () => {
      component.showCalidadAnterior = true;
      fixture.detectChanges();

      const div: Element = fixture.nativeElement.querySelector('#consultarCalidadAnteriorSection');

      expect(div.className).not.toContain('collapse');
    });
  });

  describe('El boton consultar calado anterior', () => {
    it('deshabilita el boton cuando no tiene mas de un calado', () => {
      component.operacion = Operaciones.Consulta;
      component.movimiento.tieneMasDeUnaCalidad = false;
      fixture.detectChanges();
      const button: Element = fixture.nativeElement.querySelector('#btnConsultarCaladoAnterior');

      expect(button.getAttribute('disabled')).not.toBeNull();
    });
    it('habilita el boton cuando tiene mas de un calado', () => {
      component.operacion = Operaciones.Consulta;
      component.movimiento.tieneMasDeUnaCalidad = true;
      fixture.detectChanges();

      const button: Element = fixture.nativeElement.querySelector('#btnConsultarCaladoAnterior');
      expect(button.getAttribute('disabled')).toBeNull();
    });
  });
});
