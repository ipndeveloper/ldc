import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { ControlarSalidaComponent } from './controlar-salida.component';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { CircuitoService } from '../shared/services/circuito.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { of } from 'rxjs';
import { Circuito } from '../../shared/data-models/circuito/circuito';
import { MovimientoControlSalida } from '../../shared/data-models/movimiento-control-salida';
import { EstadoMovimiento } from '../../shared/data-models/estado-movimiento';
import { ActividadesCircuito } from '../../shared/data-models/actividades-circuito';
import { CaracteristicaCircuito } from '../../shared/data-models/caracteristica-circuito';
import { Caracteristicas, Actividades, EstadosMovimiento } from '../../shared/enums/enums';
import { ControlarSalidaService } from './controlar-salida.service';
import { Resources } from '../../../locale/artifacts/resources';
import { HotkeyModule } from 'angular2-hotkeys';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ApiService } from '../../core/services/restClient/api.service';
import { configureTestSuite } from '../../core/mocks/testing';
import { CommandService } from '../../shared/command-service/command.service';
import { tiposMovimientos } from '../../shared/data-models/tipo-movimiento';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PopupModule } from '../../core/services/popupService/popup.module';
import { FormBuilder } from '@angular/forms';
import { ChecklistControlPatrimonialService } from '../checklist-control-patrimonial/checklist-control-patrimonial.service';
import { RestHandlerService } from '../../core/services/restClient/restHandler.service';
import { RequestOptionsService } from '../../core/services/restClient/requestOptions.service';
import { AuthService } from '../../core/services/session/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { NavigationService } from '../../core/services/navigationService/navigation.service';
import { Terminal } from '../../shared/data-models/terminal';
import { Sociedad } from '../../shared/data-models/sociedad';
import { Sede } from '../../shared/data-models/sede';
import { Puerto } from '../../shared/data-models/puerto';
import { TipoDocumentoPorteService } from '../shared/desplegable-tipo-documento-porte/tipo-documento-porte.service';
import { TipoProducto } from '../../shared/data-models/tipo-producto';
import { ConsultarDatosAfipService } from '../../../app/gestion-afip/consultar-datos-afip/consultar-datos-afip-service';

describe('ControlarSalidaComponent', () => {
  let component: ControlarSalidaComponent;
  let fixture: ComponentFixture<ControlarSalidaComponent>;
  let controlarSalidaService: ControlarSalidaService;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ControlarSalidaComponent],
      imports: [
        HttpClientTestingModule,
        PopupModule,
        HotkeyModule.forRoot(),
        RouterTestingModule
      ],
      providers: [
        ApiService,
        RestHandlerService,
        RequestOptionsService,
        AuthService,
        FormBuilder,
        FormComponentService,
        CircuitoService,
        ControlarSalidaService,
        ChecklistControlPatrimonialService,
        CommandService,
        ConsultarDatosAfipService,
        NavigationService,
        AuthService,
        TipoDocumentoPorteService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlarSalidaComponent);
    component = fixture.componentInstance;
    const ldc = new Sociedad(1, 'ldc');
    const sede = new Sede(1, '0001', 'sede');
    const puerto = new Puerto(1, 'puerto', false);
    component.terminal = new Terminal(1, 'BB', true, ldc, sede, puerto, 'codigo', false, true, false, false);

    controlarSalidaService = fixture.debugElement.injector.get(ControlarSalidaService);
    spyOn(controlarSalidaService, 'registrarSalidaConDescarga').and.returnValue(of(''));
    spyOn(controlarSalidaService, 'registrarSalidaSinDescarga').and.returnValue(of(''));

    const apiService = TestBed.get(ApiService);
    spyOn(apiService, 'get').and.returnValue(of([]));
    spyOn(apiService, 'post').and.returnValue(of([]));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  let circuito: Circuito;

  function initializeCircuito() {
    circuito = new Circuito();
    circuito.id = 1;
    circuito.idTipoMovimiento = tiposMovimientos[1].id;

    circuito.actividadesCircuito = new Array<ActividadesCircuito>();
    const actividadRegistrarConDescarga = new ActividadesCircuito();
    actividadRegistrarConDescarga.idActividad = Actividades.RegistrarSalidaConDescarga;
    actividadRegistrarConDescarga.idEstadoInicial = EstadosMovimiento.AptoControlSalida;
    circuito.actividadesCircuito.push(actividadRegistrarConDescarga);

    const actividadRegistrarSinDescarga = new ActividadesCircuito();
    actividadRegistrarSinDescarga.idActividad = Actividades.RegistrarSalidaSinDescarga;
    actividadRegistrarSinDescarga.idEstadoInicial = EstadosMovimiento.AptoControlSalidaSinDescargar;
    circuito.actividadesCircuito.push(actividadRegistrarSinDescarga);

    circuito.caracteristicasCircuito = new Array<CaracteristicaCircuito>();
  }

  describe('El Método completeDataControlSalida', function () {

    beforeEach(() => {
      initializeCircuito();
    });

    it('Llama a popupService.error con el mensaje definido cuando el movimiento se encuentra en estado inválido',
      inject([PopupService, CircuitoService],
        (popupService: PopupService, circuitoService: CircuitoService) => {
          spyOn(circuitoService, 'getCircuitoByIdByIdsActividad').and.returnValue(of(circuito));
          spyOn(popupService, 'error');
          const movimiento = new MovimientoControlSalida(circuito, new EstadoMovimiento(2));
          movimiento.tipoProducto = new TipoProducto(2, '');

          component.completeDataControlSalida(movimiento);

          expect(popupService.error).toHaveBeenCalledWith(Resources.Messages.ElMovimientoNoSeEncuentraEnEstadoValidoParaAlgunaActividad);
        }));

    it('No llama a popupService.error cuando el movimiento se encuentra en estado válido',
      inject([PopupService, CircuitoService],
        (popupService: PopupService, circuitoService: CircuitoService) => {
          spyOn(circuitoService, 'getCircuitoByIdByIdsActividad').and.returnValue(of(circuito));
          spyOn(popupService, 'error');
          const movimiento = new MovimientoControlSalida(circuito, new EstadoMovimiento(EstadosMovimiento.AptoControlSalida));
          movimiento.tipoProducto = new TipoProducto(2, '');

          component.completeDataControlSalida(movimiento);

          expect(popupService.error).toHaveBeenCalledTimes(0);
        }));

    it('No completa el movimiento cuando el mismo se encuentra en estado inválido',
      inject([CircuitoService],
        (circuitoService: CircuitoService) => {
          spyOn(circuitoService, 'getCircuitoByIdByIdsActividad').and.returnValue(of(circuito));
          const movimiento = new MovimientoControlSalida(circuito, new EstadoMovimiento(EstadosMovimiento.PendienteControl));
          movimiento.tipoProducto = new TipoProducto(2, '');

          component.completeDataControlSalida(movimiento);

          expect(component.movimiento).toBeUndefined();
        }));

    it('Completa el movimiento cuando el mismo se encuentra en estado válido',
      inject([CircuitoService],
        (circuitoService: CircuitoService) => {
          spyOn(circuitoService, 'getCircuitoByIdByIdsActividad').and.returnValue(of(circuito));
          const movimiento = new MovimientoControlSalida(circuito, new EstadoMovimiento(EstadosMovimiento.AptoControlSalida));
          movimiento.tipoProducto = new TipoProducto(2, '');

          component.completeDataControlSalida(movimiento);

          expect(component.movimiento).toBe(movimiento);
        }));

    it('Habilita característica Rechazo con CTG cuando movimiento en estado válido y característica habilitada',
      inject([CircuitoService],
        (circuitoService: CircuitoService) => {
          spyOn(circuitoService, 'getCircuitoByIdByIdsActividad').and.returnValue(of(circuito));
          const movimiento = new MovimientoControlSalida(circuito, new EstadoMovimiento(EstadosMovimiento.AptoControlSalida));
          const caracteristicaCircuito = new CaracteristicaCircuito();
          caracteristicaCircuito.idCaracteristica = Caracteristicas.ConRechazoCTG;
          caracteristicaCircuito.estaHabilitada = true;
          circuito.caracteristicasCircuito.push(caracteristicaCircuito);
          movimiento.tipoProducto = new TipoProducto(2, '');

          component.completeDataControlSalida(movimiento);
          expect(component.disableRechazonConCTG).toBe(false);
        }));

    it('No habilita característica Rechazo con CTG cuando movimiento en estado inválido',
      inject([CircuitoService],
        (circuitoService: CircuitoService) => {
          spyOn(circuitoService, 'getCircuitoByIdByIdsActividad').and.returnValue(of(circuito));
          const movimiento = new MovimientoControlSalida(circuito, new EstadoMovimiento(EstadosMovimiento.AptoBalanzaEntrada));
          const caracteristicaCircuito = new CaracteristicaCircuito();
          caracteristicaCircuito.idCaracteristica = Caracteristicas.ConRechazoCTG;
          caracteristicaCircuito.estaHabilitada = true;
          circuito.caracteristicasCircuito.push(caracteristicaCircuito);
          movimiento.tipoProducto = new TipoProducto(2, '');

          component.completeDataControlSalida(movimiento);

          expect(component.disableRechazonConCTG).toBe(true);
        }));

    it('No habilita característica Rechazo con CTG cuando movimiento en estado válido y caracterísitca no aplica',
      inject([CircuitoService],
        (circuitoService: CircuitoService) => {
          spyOn(circuitoService, 'getCircuitoByIdByIdsActividad').and.returnValue(of(circuito));
          const movimiento = new MovimientoControlSalida(circuito, new EstadoMovimiento(EstadosMovimiento.AptoBalanzaEntrada));
          const caracteristicaCircuito = new CaracteristicaCircuito();
          caracteristicaCircuito.idCaracteristica = Caracteristicas.ConRechazoCTG;
          caracteristicaCircuito.estaHabilitada = false;
          circuito.caracteristicasCircuito.push(caracteristicaCircuito);
          movimiento.tipoProducto = new TipoProducto(2, '');

          component.completeDataControlSalida(movimiento);

          expect(component.disableRechazonConCTG).toBe(true);
        }));

    it('No habilita característica Rechazo con CTG cuando movimiento en estado válido y circuito no posee la caracterísitca',
      inject([CircuitoService],
        (circuitoService: CircuitoService) => {
          spyOn(circuitoService, 'getCircuitoByIdByIdsActividad').and.returnValue(of(circuito));
          const movimiento = new MovimientoControlSalida(circuito, new EstadoMovimiento(EstadosMovimiento.AptoBalanzaEntrada));
          movimiento.tipoProducto = new TipoProducto(2, '');

          component.completeDataControlSalida(movimiento);

          expect(component.disableRechazonConCTG).toBe(true);
        }));

    it('habilita los botones aceptar, cancelar y rechazar cuando se recupera un movimiento',
      inject([CircuitoService],
        (circuitoService: CircuitoService) => {
          spyOn(circuitoService, 'getCircuitoByIdByIdsActividad').and.returnValue(of(circuito));
          const movimiento = new MovimientoControlSalida(circuito, new EstadoMovimiento(EstadosMovimiento.AptoControlSalidaSinDescargar));
          movimiento.tipoProducto = new TipoProducto(2, '');
          component.esCarga = false;

          component.completeDataControlSalida(movimiento);

          expect(component.disableButtons).toBe(false);
        }));

    it('Llama a popupService.error con el mensaje definido cuando no se recupera movimiento',
      inject([PopupService],
        (popupService: PopupService) => {

          spyOn(popupService, 'error');
          const movimiento = null;

          component.completeDataControlSalida(movimiento);

          expect(popupService.error).toHaveBeenCalledWith(Resources.Messages.NoSeEncontraronResultados);
        }));
  });

  describe('El Método aceptar', function () {

    beforeEach(() => {
      initializeCircuito();
    });

    it('Llama al método registrarSalidaConDescarga del servicio ControlarSalidaService', () => {

      const movimiento = new MovimientoControlSalida(circuito, new EstadoMovimiento(EstadosMovimiento.AptoControlSalida));
      movimiento.id = 1;
      component.movimiento = movimiento;
      component.circuito = circuito;

      component.aceptar();

      expect(controlarSalidaService.registrarSalidaConDescarga).toHaveBeenCalled();
    });

    it('Llama a popupService.success con el mensaje definido cuando el registro es exitoso',
      inject([PopupService],
        (popupService: PopupService) => {
          spyOn(popupService, 'success');
          const movimiento = new MovimientoControlSalida(circuito, new EstadoMovimiento(EstadosMovimiento.AptoControlSalida));
          movimiento.id = 1;
          component.movimiento = movimiento;
          component.circuito = circuito;

          component.aceptar();

          expect(popupService.success).toHaveBeenCalledWith(Resources.Messages.RegistroSalidaConDescargaGuardado, Resources.Labels.Aceptar,
            { timeOut: 30000 });
        }));

    it('Llama a popupService.error con el mensaje definido cuando el movimiento se encuentra en estado inválido',
      inject([PopupService],
        (popupService: PopupService) => {
          spyOn(popupService, 'error');
          const movimiento = new MovimientoControlSalida(circuito, new EstadoMovimiento(EstadosMovimiento.EstadoNinguno));
          movimiento.id = 1;
          component.movimiento = movimiento;
          component.circuito = circuito;

          component.aceptar();

          expect(popupService.error).toHaveBeenCalledWith(
            Resources.Messages.ElMovimientoNoSeEncuentraEnEstadoValidoParaControlSalidaExitoso);
        }));

    it('habilita el filtro de búsqueda',
      () => {
        const movimiento = new MovimientoControlSalida(circuito, new EstadoMovimiento(EstadosMovimiento.AptoControlSalida));
        movimiento.id = 1;
        component.movimiento = movimiento;
        component.circuito = circuito;

        component.aceptar();

        expect(component.controlarSalidaForm.controls.filtroMovimiento.disabled).toBe(false);
      });

    it('deshabilita los botones aceptar, rechazar y cancelar',
      () => {

        const movimiento = new MovimientoControlSalida(circuito, new EstadoMovimiento(EstadosMovimiento.AptoControlSalida));
        movimiento.id = 1;
        component.movimiento = movimiento;
        component.circuito = circuito;

        component.aceptar();

        expect(component.disableButtons).toBe(true);
      });
  });

  describe('El Método openConfirmacionRechazo', function () {

    beforeEach(() => {
      initializeCircuito();
    });

    it('Llama a popupService.error con el mensaje definido cuando el movimiento se encuentra en estado inválido',
      inject([PopupService],
        (popupService: PopupService) => {
          spyOn(popupService, 'error');
          const movimiento = new MovimientoControlSalida(circuito, new EstadoMovimiento(EstadosMovimiento.EstadoNinguno));
          movimiento.id = 1;
          component.movimiento = movimiento;
          component.circuito = circuito;

          component.openConfirmacionRechazo(false);

          expect(popupService.error)
            .toHaveBeenCalledWith(Resources.Messages.ElMovimientoNoSeEncuentraEnEstadoValidoParaCerrarCircuitoPorRechazo);
        }));
  });

  describe('El Método rechazar', function () {

    beforeEach(() => {
      initializeCircuito();
    });

    it('Llama al método registrarSalidaSinDescarga del servicio ControlarSalidaService', () => {

      const movimiento = new MovimientoControlSalida(circuito, new EstadoMovimiento(EstadosMovimiento.AptoControlSalidaSinDescargar));
      movimiento.id = 1;
      component.movimiento = movimiento;
      component.circuito = circuito;

      component.rechazar();

      expect(controlarSalidaService.registrarSalidaSinDescarga).toHaveBeenCalled();
    });

    it('Llama a popupService.success con el mensaje definido cuando el registro es exitoso',
      inject([PopupService],
        (popupService: PopupService) => {
          spyOn(popupService, 'success');
          const movimiento = new MovimientoControlSalida(circuito, new EstadoMovimiento(EstadosMovimiento.AptoControlSalidaSinDescargar));
          movimiento.id = 1;
          component.movimiento = movimiento;
          component.circuito = circuito;

          component.rechazar();

          expect(popupService.success).toHaveBeenCalledWith(Resources.Messages.RegistroSalidaSinDescargaGuardado,
            Resources.Labels.Rechazar);
        }));

    it('habilita el filtro de búsqueda',
      () => {
        const movimiento = new MovimientoControlSalida(circuito, new EstadoMovimiento(EstadosMovimiento.AptoControlSalida));
        movimiento.id = 1;
        component.movimiento = movimiento;
        component.circuito = circuito;

        component.rechazar();

        expect(component.controlarSalidaForm.controls.filtroMovimiento.disabled).toBe(false);
      });

    it('deshabilita los botones aceptar, rechazar y cancelar',
      () => {

        const movimiento = new MovimientoControlSalida(circuito, new EstadoMovimiento(EstadosMovimiento.AptoControlSalida));
        movimiento.id = 1;
        component.movimiento = movimiento;
        component.circuito = circuito;

        component.rechazar();

        expect(component.disableButtons).toBe(true);
      });
  });

  describe('El Método cancelar', function () {
    it('habilita el filtro de búsqueda',
      () => {

        component.cancelar();

        expect(component.controlarSalidaForm.controls.filtroMovimiento.disabled).toBe(false);
      });

    it('deshabilita los botones aceptar, rechazar y cancelar',
      () => {

        component.cancelar();

        expect(component.disableButtons).toBe(true);
      });

    it('Llama al método resetForm del servicio FormComponentService',
      inject([FormComponentService],
        (formComponentService: FormComponentService) => {

          spyOn(formComponentService, 'resetForm');

          component.cancelar();

          expect(formComponentService.resetForm).toHaveBeenCalled();
        }));
  });
});
