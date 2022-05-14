import { ComponentFixture, TestBed, inject, } from '@angular/core/testing';

import { ModalReversarSalidaComponent } from './modal-reversar-salida.component';
import { TestModule } from '../../../core/mocks/test.module';
import { TextAreaConEtiquetaComponent } from '../../../core/controls/text-area-con-etiqueta/text-area-con-etiqueta.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from '../../../core/components/modal/modal.component';
import { FocusDirective } from '../../../core/directives/focus/focus.directive';
import { HotkeyModule } from 'angular2-hotkeys';
import { ReversarSalidaService } from '../services/reversar-salida.service';
import { CircuitoService } from '../../shared/services/circuito.service';
import { of } from 'rxjs';
import { Resources } from '../../../../locale/artifacts/resources';
import { AccionesReversarSalida, EstadosMovimiento } from '../../../shared/enums/enums';
import { Circuito } from '../../../shared/data-models/circuito/circuito';
import { ActividadesCircuito } from '../../../shared/data-models/actividades-circuito';
import { MovimientoReversionSalida } from '../../../shared/data-models/movimiento-reversion-salida';
import { PopupService } from '../../../core/services/popupService/popup.service';
import { configureTestSuite } from '../../../core/mocks/testing';

describe('ModalReversarSalidaComponent', () => {
  let component: ModalReversarSalidaComponent;
  let fixture: ComponentFixture<ModalReversarSalidaComponent>;
  const circuito = new Circuito();


  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        ModalReversarSalidaComponent,
        TextAreaConEtiquetaComponent,
        ModalComponent,
        FocusDirective
      ],
      imports: [
        TestModule,
        ReactiveFormsModule,
        HotkeyModule.forRoot()
      ],
      providers: [
        ReversarSalidaService,
        CircuitoService,
        ModalComponent
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalReversarSalidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.selectedRow = [{ id: 1 }];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('El Metodo onAccept', () => {

    it('Llama al metodo reversarHaciaBalanzaEntrada cuando coincide con los filtros enviados',
      inject([ReversarSalidaService],
        (reversarSalidaService: ReversarSalidaService) => {

          // Arrange
          spyOn(reversarSalidaService, 'reversarHaciaBalanzaEntrada').and.returnValue(of(''));
          spyOn(component.accepted, 'emit');
          const destinoRetornoMovimiento = component.reversarSalidaForm.get('destinoRetornoMovimiento');
          if (destinoRetornoMovimiento) {
            destinoRetornoMovimiento.setValue(AccionesReversarSalida.ReversarHaciaBalanzaEntrada);
          }

          // Act
          component.onAccept();

          // Assert
          expect(component.accepted.emit).toHaveBeenCalledWith(Resources.Messages.SeReversoSalidaHaciaBalanzaEntrada);
          expect(component.accepted.emit).toHaveBeenCalledTimes(1);
        }));

    it('Llama al metodo ReversarHaciaCalado cuando coincide con los filtros enviados',
      inject([ReversarSalidaService],
        (reversarSalidaService: ReversarSalidaService) => {

          // Arrange
          spyOn(reversarSalidaService, 'reversarHaciaCalado').and.returnValue(of(''));
          spyOn(component.accepted, 'emit');
          const destinoRetornoMovimiento = component.reversarSalidaForm.get('destinoRetornoMovimiento');
          if (destinoRetornoMovimiento) {
            destinoRetornoMovimiento.setValue(AccionesReversarSalida.ReversarHaciaCalado);
          }

          // Act
          component.onAccept();

          // Assert
          expect(component.accepted.emit).toHaveBeenCalledWith(Resources.Messages.SeReversoSalidaHaciaCalado);
          expect(component.accepted.emit).toHaveBeenCalledTimes(1);
        }));

    it('Llama al metodo reversarHaciaSupervisorCalado cuando coincide con los filtros enviados',
      inject([ReversarSalidaService],
        (reversarSalidaService: ReversarSalidaService) => {

          // Arrange
          spyOn(reversarSalidaService, 'reversarHaciaSupervisorCalado').and.returnValue(of(''));
          spyOn(component.accepted, 'emit');
          const destinoRetornoMovimiento = component.reversarSalidaForm.get('destinoRetornoMovimiento');
          if (destinoRetornoMovimiento) {
            destinoRetornoMovimiento.setValue(AccionesReversarSalida.ReversarHaciaSupervisorCalado);
          }

          // Act
          component.onAccept();

          // Assert
          expect(component.accepted.emit).toHaveBeenCalledWith(Resources.Messages.SeReversoSalidaHaciaSupervisorCalado);
          expect(component.accepted.emit).toHaveBeenCalledTimes(1);
        }));

    it('llama al popupService.error cuando reversarSalidaForm.destinoRetornoMovimiento no es valido',
      inject([PopupService, ReversarSalidaService],
        (popupService: PopupService) => {

          // Arrange
          spyOn(popupService, 'error');

          // Act
          component.onAccept();

          // Assert
          expect(popupService.error).toHaveBeenCalledTimes(1);
          expect(popupService.error).toHaveBeenCalledWith(Resources.Messages.DebeIndicarEstadoRetornoCircuito);

        }));
  });

  describe('El Metodo open', () => {

    const actividad = new ActividadesCircuito();
    const movimiento = new MovimientoReversionSalida();

    beforeEach(() => {
      circuito.actividadesCircuito = [actividad];

      movimiento.idCircuito = 1;
      movimiento.idEstado = 1;
      movimiento.estado = 'estado';
      movimiento.producto = 'producto';
      movimiento.numeroVagon = 1;
      movimiento.numeroDocumentoPorteDescripcion = '';
      movimiento.tipoTransporte = 'tipoTransporte';
      movimiento.tipoMovimiento = 'tipoMovimiento';
      movimiento.tipoDocumentoPorte = 'tipoDocumentoPorte';

      component.selectedRow = [movimiento];
    });

    it('LLama al metodo determinarFocoAcciones',
      inject([CircuitoService],
        (circuitoService: CircuitoService) => {
          // Arrange
          movimiento.idEstado = EstadosMovimiento.AptoControlSalidaPorRechazoCalidad;
          spyOn(circuitoService, 'getCircuitoByIdByIdsActividad').and.returnValue(of(circuito));
          const determinarFocoAcciones = spyOn<any>(component, 'determinarFocoAcciones');

          // Act
          component.open();

          // Assert
          expect(determinarFocoAcciones).toHaveBeenCalledTimes(1);
        }));

    it('Llama al metodo modal.Open',
      inject([CircuitoService],
        (circuitoService: CircuitoService) => {
          // Arrange
          spyOn(circuitoService, 'getCircuitoByIdByIdsActividad').and.returnValue(of(circuito));
          spyOn(component.modal, 'open');
          // Act
          component.open();

          // Assert
          expect(component.modal.open).toHaveBeenCalledTimes(1);
        }));
  });
});

