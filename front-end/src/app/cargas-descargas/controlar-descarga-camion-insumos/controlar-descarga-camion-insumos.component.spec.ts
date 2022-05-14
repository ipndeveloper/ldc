import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlarDescargaCamionInsumosComponent } from './controlar-descarga-camion-insumos.component';
import { configureTestSuite } from '../../core/mocks/testing';
import { TestModule } from '../../core/mocks/test.module';
import { ControlarDescargaCamionInsumosService } from './controlar-descarga-camion-insumos.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DescargaEventsNotifierService } from '../shared/services/descarga-events-notifier.service';
import { NavigationService } from '../../core/services/navigationService/navigation.service';
import { CircuitoService } from '../shared/services/circuito.service';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { MovimientoService } from '../shared/services/movimiento.service';
import { CommandService } from '../../shared/command-service/command.service';
import { HotkeyModule } from 'angular2-hotkeys';
import { RouterTestingModule } from '@angular/router/testing';
import { ControlarDescargaCamionInsumosCommand } from '../../shared/data-models/commands/cargas-descargas/controlar-descarga-camion-insumos-command';
import { of } from 'rxjs';
import { EntitiesTiposProducto } from '../../shared/data-models/tipo-producto';
import { Actividades, TiposMovimiento, TiposTransporte } from '../../shared/enums/enums';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { PopupService } from '../../core/services/popupService/popup.service';
import { Resources } from '../../../locale/artifacts/resources';
import { ModalMotivoComponent } from '../shared/modals/modal-motivo/modal-motivo.component';
import { ModalComponent } from '../../core/components/modal/modal.component';
import { FinalidadService } from '../../shared/desplegable-finalidad/finalidad.service';

describe('ControlarDescargaCamionInsumosComponent', () => {
  let component: ControlarDescargaCamionInsumosComponent;
  let fixture: ComponentFixture<ControlarDescargaCamionInsumosComponent>;
  let controlarDescargaCamionInsumosService: ControlarDescargaCamionInsumosService;
  let fcService: FormComponentService;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlarDescargaCamionInsumosComponent ],
      imports: [
        TestModule,
        HotkeyModule.forRoot(),
        RouterTestingModule
      ],
      providers: [
        ControlarDescargaCamionInsumosService,
        DescargaEventsNotifierService,
        NavigationService,
        CircuitoService,
        FormComponentService,
        MovimientoService,
        CommandService,
        ModalMotivoComponent,
        ModalComponent,
        FinalidadService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlarDescargaCamionInsumosComponent);
    component = fixture.componentInstance;
    fcService = TestBed.get(FormComponentService);
    controlarDescargaCamionInsumosService = TestBed.get(ControlarDescargaCamionInsumosService);
    component.modalMotivo.getObservacion = jasmine.createSpy('getObservacion');
    component.documentoPorte.setFocus = jasmine.createSpy('setFocus');
    component.esModificacion = false;
    component.modalMotivo = TestBed.get(ModalMotivoComponent);
    component.modalMotivo.modal = TestBed.get(ModalComponent);
    component.form = new FormGroup({});

    const fb = new FormBuilder();
    component.modalMotivo.modalMotivoForm = fb.group({
      motivoEstadoMovimiento: { value: '' },
      observacion: { value: '' }
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('El método Aceptar', () => {
    it('Invoca el método registrarMovimiento del controlarDescargaCamionInsumosService', () => {
      // Arrange
      const command = {} as ControlarDescargaCamionInsumosCommand;
      spyOn(fcService, 'isValidForm').and.returnValue(true);
      spyOn((component as any), 'mapControlsToRegistrarCommand').and.returnValue(command);
      spyOn(controlarDescargaCamionInsumosService, 'registrarMovimiento').and.returnValue(of({}));
      spyOn((component as any), 'resetForm');

      // Act
      component.aceptar();

      // Assert
      expect(controlarDescargaCamionInsumosService.registrarMovimiento).toHaveBeenCalledTimes(1);
      expect(controlarDescargaCamionInsumosService.registrarMovimiento).toHaveBeenCalledWith(command, false);
    });

    it('Notifica errores si el formulario no es válido', () => {
      // Arrange
      component.form = {} as FormGroup;
      spyOn(fcService, 'isValidForm').and.returnValue(false);
      spyOn(fcService, 'validateForm');
      spyOn(fcService, 'showValidationError');

      // Act
      component.aceptar();

      // Assert
      expect(fcService.showValidationError).toHaveBeenCalledTimes(1);
    });
  });

  describe('El método getCircuito', () => {

    it('Invoca al método getCircuito de circuitoService', () => {
      // Arrange
      component.tipoProductoSeleccionada = EntitiesTiposProducto.Insumos;
      component.idActividad = Actividades.ControlarDescargaCamionInsumos;
      const circuitoService = TestBed.get(CircuitoService);
      spyOn(circuitoService, 'getCircuito').and.returnValue(of({}));

      // Act
      (component as any).getCircuito();

      // Assert
      expect(circuitoService.getCircuito).toHaveBeenCalledTimes(1);
      expect(circuitoService.getCircuito).toHaveBeenCalledWith(TiposMovimiento.Descarga,
                                                               TiposTransporte.Camion,
                                                               component.tipoProductoSeleccionada.id,
                                                               jasmine.any(Array));
    });
  });

  describe('El método openModalMotivo', () => {
    it('Invoca al metodo Open del modalmotivo cuando no tiene errores de validacion para dejar pendiente', () => {
      // Arrange
      spyOn(component.modalMotivo, 'open');
      spyOn(component.form, 'get').and.callFake((parameter: string) => {
        if (parameter === 'documentoPorte.tipoDocumentoPorte') {
          return  { 'invalid': false } as FormControl;
        } else if (parameter === 'documentoPorte.numeroDocumentoPorte') {
          return  { 'invalid': false } as FormControl;
        }
      });
      // Act
      (component as any).openModalMotivo();

      // Assert
      expect(component.modalMotivo.open).toHaveBeenCalledTimes(1);
    });

    it('Notifica error si el tipoDocPorte es inválido', () => {
      // Arrange
      const popupService = TestBed.get(PopupService);
      spyOn(popupService, 'error');
      spyOn(component.form, 'get').and.callFake((parameter: string) => {
        if (parameter === 'documentoPorte.tipoDocumentoPorte') {
          return  { 'invalid': true } as FormControl;
        }
      });

      // Act
      (component as any).openModalMotivo();

      // Assert
      expect(popupService.error).toHaveBeenCalledTimes(1);
      expect(popupService.error).toHaveBeenCalledWith(Resources.Messages.TipoDocumentoPorteObligatorioDejarPendiente,
        Resources.Labels.Notificacion);
    });

    it('Notifica error si el nroDocPorte es inválido', () => {
      // Arrange
      const popupService = TestBed.get(PopupService);
      component.form = new FormGroup({});
      spyOn(fcService, 'forceValidationCheck');
      spyOn(popupService, 'error');
      spyOn(component.form, 'get').and.callFake((parameter: string) => {
      if (parameter === 'documentoPorte.numeroDocumentoPorte') {
          return  { 'invalid': true } as FormControl;
        }
      });

      // Act
      (component as any).openModalMotivo();

      // Assert
      expect(popupService.error).toHaveBeenCalledTimes(1);
      expect(popupService.error).toHaveBeenCalledWith(Resources.Messages.NumeroDocumentoPorteObligatorioDejarPendiente,
        Resources.Labels.Notificacion);
    });
  });
});
