import { ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { TestModule } from '../../core/mocks/test.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { CircuitoService } from '../shared/services/circuito.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { of } from 'rxjs';
import { Circuito } from '../../shared/data-models/circuito/circuito';
import { EstadoMovimiento } from '../../shared/data-models/estado-movimiento';
import { ActividadesCircuito } from '../../shared/data-models/actividades-circuito';
import { CaracteristicaCircuito } from '../../shared/data-models/caracteristica-circuito';
import { Actividades, EstadosMovimiento } from '../../shared/enums/enums';
import { Resources } from '../../../locale/artifacts/resources';
import { HotkeyModule } from 'angular2-hotkeys';
import { QuitarDeCircuitoComponent } from './quitar-de-circuito.component';
import { QuitarDeCircuitoService } from './quitar-de-circuito.service';
import { TipoTransporteService } from '../../shared/desplegable-tipo-transporte/desplegable-tipo-transporte.service';
import { MovimientoQuitarDeCircuitoDataView } from '../../shared/data-models/movimiento-quitar-de-circuito-data-view';
import { TipoTransporteMovimiento } from '../../shared/enums/enums';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { configureTestSuite } from '../../core/mocks/testing';

class QuitarDeCircuitoServiceSpy {
  quitarDeCircuito = jasmine.createSpy('quitarDeCircuito').and.callFake(
    () => of('')
  );
}

describe('QuitarDeCircuitoComponent', () => {
  let component: QuitarDeCircuitoComponent;
  let fixture: ComponentFixture<QuitarDeCircuitoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        QuitarDeCircuitoComponent,
       ],
      imports: [
        TestModule,
        ReactiveFormsModule,
        NgbModule,
        HotkeyModule.forRoot()
      ],
      providers: [
        FormComponentService,
        CircuitoService,
        TipoTransporteService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .overrideComponent(QuitarDeCircuitoComponent, {
      set: {
        providers: [
          { provide: QuitarDeCircuitoService, useClass: QuitarDeCircuitoServiceSpy }
        ]
      }
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuitarDeCircuitoComponent);
    component = fixture.componentInstance;

    component.modalConfirmacion.open = jasmine.createSpy('open');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  let circuito: Circuito;

  function initializeCircuito() {
    circuito = new Circuito();
    circuito.id = 1;

    circuito.actividadesCircuito = new Array<ActividadesCircuito>();
    const actividadSacarDeCircuito = new ActividadesCircuito();
    actividadSacarDeCircuito.idActividad = Actividades.SacarDeCircuito;
    actividadSacarDeCircuito.idEstadoInicial = EstadosMovimiento.AptoCalado;
    circuito.actividadesCircuito.push(actividadSacarDeCircuito);
    circuito.caracteristicasCircuito = new Array<CaracteristicaCircuito>();
  }

  describe('El Método completeDataQuitarDeCircuito', function () {

    beforeEach(() => {
      initializeCircuito();
    });

    it('Llama a popupService.error con el mensaje definido cuando el movimiento Camión se encuentra en estado inválido',
      inject([PopupService, CircuitoService],
        (popupService: PopupService, circuitoService: CircuitoService) => {
          spyOn(circuitoService, 'getCircuitoByIdByIdsActividad').and.returnValue(of(circuito));
          spyOn(popupService, 'error');
          const movimiento = new MovimientoQuitarDeCircuitoDataView(circuito, new EstadoMovimiento(2));
          movimiento.id = 1;
          movimiento.circuito = circuito;
          movimiento.tipoTransporte = TipoTransporteMovimiento.Camion;

          component.completeDataQuitarDeCircuito(movimiento);

          expect(popupService.error).toHaveBeenCalledWith(Resources.Messages.ElCamionNoSeEncuentraEnUnEstadoValidoParaRealizarEstaAccion);
        }));

    it('No llama a popupService.error cuando el movimiento se encuentra en estado válido',
      inject([PopupService, CircuitoService],
        (popupService: PopupService, circuitoService: CircuitoService) => {
          spyOn(circuitoService, 'getCircuitoByIdByIdsActividad').and.returnValue(of(circuito));
          spyOn(popupService, 'error');
          const movimiento = new MovimientoQuitarDeCircuitoDataView(circuito, new EstadoMovimiento(EstadosMovimiento.AptoCalado));

          component.completeDataQuitarDeCircuito(movimiento);

          expect(popupService.error).toHaveBeenCalledTimes(0);
        }));

    it('No completa el movimiento cuando el mismo se encuentra en estado inválido',
      inject([CircuitoService],
        (circuitoService: CircuitoService) => {
          spyOn(circuitoService, 'getCircuitoByIdByIdsActividad').and.returnValue(of(circuito));
          const movimiento = new MovimientoQuitarDeCircuitoDataView(circuito, new EstadoMovimiento(EstadosMovimiento.EstadoNinguno));

          component.completeDataQuitarDeCircuito(movimiento);

          expect(component.movimiento).toBeUndefined();
        }));

    it('Completa el movimiento cuando el mismo se encuentra en estado válido',
      inject([CircuitoService],
        (circuitoService: CircuitoService) => {
          spyOn(circuitoService, 'getCircuitoByIdByIdsActividad').and.returnValue(of(circuito));
          const movimiento = new MovimientoQuitarDeCircuitoDataView(circuito, new EstadoMovimiento(EstadosMovimiento.AptoCalado));

          component.completeDataQuitarDeCircuito(movimiento);

          expect(component.movimiento).toBe(movimiento);
        }));

    it('habilita los botones aceptar y cancelar cuando se recupera un movimiento',
      inject([CircuitoService],
        (circuitoService: CircuitoService) => {
          spyOn(circuitoService, 'getCircuitoByIdByIdsActividad').and.returnValue(of(circuito));
          const movimiento = new MovimientoQuitarDeCircuitoDataView(circuito, new EstadoMovimiento(EstadosMovimiento.AptoCalado));

          component.completeDataQuitarDeCircuito(movimiento);

          expect(component.disableButtons).toBe(false);
        }));

    it('Llama a popupService.error con el mensaje definido cuando no se recupera movimiento',
      inject([PopupService],
        (popupService: PopupService) => {

          spyOn(popupService, 'error');
          const movimiento = null;

          component.completeDataQuitarDeCircuito(movimiento);

          expect(popupService.error).toHaveBeenCalledWith(Resources.Messages.NoSeEncontraronResultados);
        }));
      });

  describe('El Método aceptar', function () {

    let quitarDeCircuitoSpy: QuitarDeCircuitoServiceSpy;

    beforeEach(() => {
      initializeCircuito();
      quitarDeCircuitoSpy = fixture.debugElement.injector.get(QuitarDeCircuitoService) as any;
    });

    it('Llama al método QuitarDeCircuito del servicio QuitarDeCircuitoService', () => {

          const movimiento = new MovimientoQuitarDeCircuitoDataView(circuito, new EstadoMovimiento(EstadosMovimiento.AptoCalado));
          movimiento.id = 1;
          component.movimiento = movimiento;
          component.circuito = circuito;

          component.openConfirmacion();
          component.quitar('observaciones');

          expect(quitarDeCircuitoSpy.quitarDeCircuito).toHaveBeenCalled();
        });

    it('Llama a popupService.success con el mensaje definido cuando el registro es exitoso',
      inject([PopupService],
        (popupService: PopupService) => {
          spyOn(popupService, 'success');
          const movimiento = new MovimientoQuitarDeCircuitoDataView(circuito, new EstadoMovimiento(EstadosMovimiento.AptoCalado));
          movimiento.id = 1;
          component.movimiento = movimiento;
          component.circuito = circuito;

          component.openConfirmacion();
          component.quitar('observaciones');


          expect(popupService.success).toHaveBeenCalledWith(Resources.Messages.QuitarDeCircuitoGuardado, Resources.Labels.Aceptar);
        }));

    it('Llama a popupService.error con el mensaje definido cuando el movimiento Camión se encuentra en estado inválido',
      inject([PopupService],
        (popupService: PopupService) => {
          spyOn(popupService, 'error');
          const movimiento = new MovimientoQuitarDeCircuitoDataView(circuito, new EstadoMovimiento(EstadosMovimiento.EstadoNinguno));
          movimiento.id = 1;
          movimiento.tipoTransporte =  TipoTransporteMovimiento.Camion;
          component.movimiento = movimiento;
          component.circuito = circuito;

          component.openConfirmacion();
          component.quitar('observaciones');

          expect(popupService.error).toHaveBeenCalledWith(Resources.Messages.ElCamionNoSeEncuentraEnUnEstadoValidoParaRealizarEstaAccion);
        }));

        it('Llama a popupService.error con el mensaje definido cuando el movimiento Tren se encuentra en estado inválido',
      inject([PopupService],
        (popupService: PopupService) => {
          spyOn(popupService, 'error');
          const movimiento = new MovimientoQuitarDeCircuitoDataView(circuito, new EstadoMovimiento(EstadosMovimiento.EstadoNinguno));
          movimiento.id = 1;
          movimiento.tipoTransporte = 'Tren';
          component.movimiento = movimiento;
          component.circuito = circuito;

          component.openConfirmacion();
          component.quitar('observaciones');

          expect(popupService.error).toHaveBeenCalledWith(Resources.Messages.ElVagonNoSeEncuentraEnUnEstadoValidoParaRealizarEstaAccion);
        }));

    it('habilita el filtro de búsqueda',
        () => {
          const movimiento = new MovimientoQuitarDeCircuitoDataView(circuito, new EstadoMovimiento(EstadosMovimiento.AptoCalado));
          movimiento.id = 1;
          component.movimiento = movimiento;
          component.circuito = circuito;

          component.openConfirmacion();
          component.quitar('observaciones');

          expect(component.quitarDeCircuitoForm.controls.filtroMovimiento.disabled).toBe(false);
        });

    it('deshabilita los botones aceptar y cancelar',
        () => {

          const movimiento = new MovimientoQuitarDeCircuitoDataView(circuito, new EstadoMovimiento(EstadosMovimiento.AptoControlSalida));
          movimiento.id = 1;
          component.movimiento = movimiento;
          component.circuito = circuito;

          component.openConfirmacion();
          component.quitar('observaciones');

          expect(component.disableButtons).toBe(true);
        });
  });

  describe('El Método openConfirmacion', function () {

    beforeEach(() => {
      initializeCircuito();
    });

     it('Llama a popupService.error con el mensaje definido cuando el movimiento Camión se encuentra en estado inválido',
      inject([PopupService],
        (popupService: PopupService) => {
          spyOn(popupService, 'error');
          const movimiento = new MovimientoQuitarDeCircuitoDataView(circuito, new EstadoMovimiento(EstadosMovimiento.EstadoNinguno));
          movimiento.id = 1;
          movimiento.tipoTransporte =  TipoTransporteMovimiento.Camion;
          component.movimiento = movimiento;
          component.circuito = circuito;

          component.openConfirmacion();

          expect(popupService.error)
                .toHaveBeenCalledWith(Resources.Messages.ElCamionNoSeEncuentraEnUnEstadoValidoParaRealizarEstaAccion);
        }));

      it('Llama a popupService.error con el mensaje definido cuando el movimiento Tren se encuentra en estado inválido',
      inject([PopupService],
        (popupService: PopupService) => {
          spyOn(popupService, 'error');
          const movimiento = new MovimientoQuitarDeCircuitoDataView(circuito, new EstadoMovimiento(EstadosMovimiento.EstadoNinguno));
          movimiento.id = 1;
          movimiento.tipoTransporte = 'Tren';
          component.movimiento = movimiento;
          component.circuito = circuito;

          component.openConfirmacion();

          expect(popupService.error)
                .toHaveBeenCalledWith(Resources.Messages.ElVagonNoSeEncuentraEnUnEstadoValidoParaRealizarEstaAccion);
        }));
    });

  describe('El Método cancelar', function () {
    it('habilita el filtro de búsqueda',
    () => {

      component.cancelar();

      expect(component.quitarDeCircuitoForm.controls.filtroMovimiento.disabled).toBe(false);
    });

    it('deshabilita los botones aceptar y cancelar',
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
