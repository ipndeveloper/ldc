import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChecklistControlPatrimonialComponent } from './checklist-control-patrimonial.component';
import { TestModule } from '../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { configureTestSuite } from '../../core/mocks/testing';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { HotkeyModule } from 'angular2-hotkeys';
import { ChecklistControlPatrimonialService } from './checklist-control-patrimonial.service';
import { CommandService } from '../../shared/command-service/command.service';
import { PopupService } from '../../core/services/popupService/popup.service';
// import { of } from 'rxjs';
// import { Resources } from '../../../locale/artifacts/resources';
// import { FormBuilder } from '@angular/forms';
// import { ChecklistControlPatrimonialDataView } from '../../shared/data-models/checklist-control-patrimonial-data-view';
// import { ChecklistControlPatrimonial } from '../../shared/data-models/checklist-control-patrimonial';
import { DatosChecklistControlPatrimonialComponent } from './datos-checklist-control-patrimonial/datos-checklist-control-patrimonial.component';
import { ListaChecklistControlPatrimonialComponent } from './lista-checklist-control-patrimonial/lista-checklist-control-patrimonial.component';

describe('ChecklistControlPatrimonialComponent', () => {
  let component: ChecklistControlPatrimonialComponent;
  let fixture: ComponentFixture<ChecklistControlPatrimonialComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ ChecklistControlPatrimonialComponent ],
      imports: [
        TestModule,
        HotkeyModule.forRoot()
      ],
      providers: [
        ChecklistControlPatrimonialService,
        FormComponentService,
        CommandService,
        PopupService,
        DatosChecklistControlPatrimonialComponent,
        ListaChecklistControlPatrimonialComponent
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistControlPatrimonialComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // describe('El método ngOnInit', () => {
  //   it('Genera el formulario inicial', () => {
  //     // Arrange

  //     // Act
  //     component.ngOnInit();

  //     // Assert
  //     expect(component.form).toBeDefined();
  //   });
  // });

  // describe('El método ngOnDestroy', () => {
  //   it('Invoca al método unsubscribe', () => {
  //     // Arrange
  //     spyOn(component.subscription, 'unsubscribe');

  //     // Act
  //     component.ngOnDestroy();

  //     // Assert
  //     expect(component.subscription.unsubscribe).toHaveBeenCalledTimes(1);
  //   });
  // });

  // describe('El método handleCommand', () => {
  //   it('Invoca al onClickAceptar cuando el command es Aceptar', () => {
  //     // Arrange
  //     const command = { name: 'Aceptar'} as Command;
  //     spyOn(component, 'onClickAceptar');

  //     // Act
  //     component.handleCommand(command);

  //     // Assert
  //     expect(component.onClickAceptar).toHaveBeenCalledTimes(1);
  //   });

  //   it('Invoca al onClickCancelar cuando el command es Cancelar', () => {
  //     // Arrange
  //     const command = { name: 'Cancelar'} as Command;
  //     spyOn(component, 'onClickCancelar');

  //     // Act
  //     component.handleCommand(command);

  //     // Assert
  //     expect(component.onClickCancelar).toHaveBeenCalledTimes(1);
  //   });
  // });

  // describe('El método onClickAcpetar()', () => {
  //   it('Envía un mensaje cuando el servicio se ejecuta exitosamente', () => {
  //     // Arrange
  //     const fb = new FormBuilder();
  //     const service = TestBed.get(ChecklistControlPatrimonialService);
  //     const popupService: PopupService = TestBed.get(PopupService);
  //     const fcService: FormComponentService = TestBed.get(FormComponentService);
  //     component.form = fb.group({});
  //     spyOn<any>(component, 'mapControlsToCommand');
  //     spyOn(service, 'actualizarControlPatrimonial').and.returnValue(of({}));
  //     spyOn(popupService, 'success');
  //     spyOn(fcService, 'isValidForm').and.returnValue(true);
  //     spyOn<any>(component, 'resetForm');

  //     // Act
  //     component.onClickAceptar();

  //     // Assert
  //     expect(popupService.success).toHaveBeenCalledTimes(1);
  //     expect(popupService.success).toHaveBeenCalledWith(
  //       Resources.Messages.ElControlCalidadDeCargaDeCamionesFueGuardadoConExito,
  //       Resources.Labels.Aceptar
  //     );
  //   });

  //   it('Envía un mensaje cuando el servicio se ejecuta erroneamente', () => {
  //     // Arrange
  //     const fb = new FormBuilder();
  //     const fcService: FormComponentService = TestBed.get(FormComponentService);
  //     component.form = fb.group({});
  //     spyOn(fcService, 'isValidForm').and.returnValue(false);
  //     spyOn(fcService, 'validateForm');
  //     spyOn(fcService, 'showValidationError');

  //     // Act
  //     component.onClickAceptar();

  //     // Assert
  //     expect(fcService.showValidationError).toHaveBeenCalledTimes(1);
  //   });
  // });

  // describe('El método onClickBuscar', () => {
  //   fit('Invoca al método completaDatoMovimiento', () => {
  //     // Arrange
  //     const fcService: FormComponentService = TestBed.get(FormComponentService);
  //     const datos: DatosChecklistControlPatrimonialComponent = TestBed.get(DatosChecklistControlPatrimonialComponent);
  //     const lista: ListaChecklistControlPatrimonialComponent = TestBed.get(ListaChecklistControlPatrimonialComponent);
  //     const service: ChecklistControlPatrimonialService = TestBed.get(ChecklistControlPatrimonialService);
  //     spyOn(service, 'getMovimiento').and.returnValue(of({}));
  //     spyOn(fcService, 'getValue').and.returnValue({});
  //     spyOn(datos, 'completaDatoMovimiento');
  //     spyOn(lista, 'setChecklist');

  //     // Act
  //     component.onClickBuscar();

  //     // Assert
  //     expect(datos.completaDatoMovimiento).toHaveBeenCalledTimes(1);
  //   });

  //   it('Agrega un control patrimonial desde el movimiento', () => {
  //     // Arrange
  //     const fb = new FormBuilder();
  //     const checklist = { check: true,
  //                         descControl: 'Control',
  //                         observacion: 'Observación',
  //                         fechaHora: 'Fecha',
  //                         usuario: 'Usuario' } as ChecklistControlPatrimonial;
  //     const movimiento = { id: 1,
  //                          checklist: [checklist] } as ChecklistControlPatrimonialDataView;
  //     component.form = fb.group({ checklist: fb.array([]) });
  //     component.movimiento = {} as ChecklistControlPatrimonialDataView;
  //     spyOn<any>(component, 'addRangeChecklist');
  //     spyOn<any>(component, 'setEnableFiltroBusqueda');
  //     spyOn<any>(component, 'setEnableChecklist');

  //     // Act
  //     component.completeDataMovimiento(movimiento);

  //     // Assert
  //     expect(component.movimiento.checklist).toEqual(movimiento.checklist);
  //   });

  //   it('Muestra un mensaje de error cuando el movimiento es nulo', () => {
  //     // Arrange
  //     component.movimiento = {} as ChecklistControlPatrimonialDataView;
  //     const popupService = TestBed.get(PopupService);
  //     spyOn(popupService, 'error');

  //     // Act
  //     component.completeDataMovimiento(null);

  //     // Assert
  //     expect(popupService.error).toHaveBeenCalledTimes(1);
  //     expect(popupService.error).toHaveBeenCalledWith(
  //       Resources.Messages.NoSeEncontraronResultados
  //     );
  //   });
  // });

  // describe('El método mapControlsToCommand', () => {
  //   it('Setea el ID de movimiento', () => {
  //     // Arrange
  //     const fb = new FormBuilder();
  //     component.form = fb.group({ checklist: fb.array([] as ChecklistControlPatrimonial[]) });
  //     component.movimiento = { id: 1 } as ChecklistControlPatrimonialDataView;

  //     // Act
  //      const cmdEsperado = (component as any).mapControlsToCommand();

  //     // Assert
  //     expect(cmdEsperado.idMovimiento).toEqual(component.movimiento.id);
  //   });

  //   it('Setea el checklist', () => {
  //     // Arrange
  //     const fb = new FormBuilder();
  //     const checklist = { check: true,
  //                         descControl: 'Control',
  //                         observacion: 'Observación',
  //                         fechaHora: 'Fecha',
  //                         usuario: 'Usuario'
  //                       } as ChecklistControlPatrimonial;
  //     component.form = fb.group({ checklist: fb.array([checklist] as ChecklistControlPatrimonial[]) });
  //     component.movimiento = { id: 1 } as ChecklistControlPatrimonialDataView;

  //     // Act
  //     const cmdEsperado = (component as any).mapControlsToCommand();

  //     // Assert
  //     expect(cmdEsperado.checklist).toEqual(component.form.controls.checklist.value);
  //   });
  // });

});
