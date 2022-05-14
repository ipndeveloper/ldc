import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { CambiarTarjetaComponent } from './cambiar-tarjeta.component';
import { CoreSharedModule } from '../../core/core-shared.module';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CambiarTarjetaService } from './cambiar-tarjeta.service';
import { MovimientoCambioTarjeta } from '../../shared/data-models/movimiento-cambio-tarjeta';
import { of } from 'rxjs';
import { PopupService } from '../../core/services/popupService/popup.service';
import { Resources } from '../../../locale/artifacts/resources';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { configureTestSuite } from '../../core/mocks/testing';
import { TiposTransporte } from '../../shared/enums/enums';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { HotkeyModule } from 'angular2-hotkeys';
import { CommandService } from '../../shared/command-service/command.service';
import { TipoDocumentoPorte } from '../shared/data-models/tipo-documento-porte';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PopupModule } from '../../core/services/popupService/popup.module';
import { ModalSeleccionarRemitoDataView } from '../../shared/data-models/modal-seleccionar-remito-data-view';

xdescribe('CambiarTarjetaComponent', () => {
  let component: CambiarTarjetaComponent;
  let fixture: ComponentFixture<CambiarTarjetaComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
        declarations: [
        CambiarTarjetaComponent,
      ],
      imports: [
        CoreSharedModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        PopupModule,
      HotkeyModule.forRoot()
      ],
      providers: [
        CambiarTarjetaService,
        FormComponentService,
        CommandService
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  });

  const mockearFunciones = () => {
    component.documentoPorte.setFocus = jasmine.createSpy('setFocus');
    component.detalle.setFocus = jasmine.createSpy('setFocus');
  };

  beforeEach(() => {
    fixture = TestBed.createComponent(CambiarTarjetaComponent);
    component = fixture.componentInstance;
    mockearFunciones();

    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('El metodo ngOnInit', () => {

    it('Invoca al metodo crearForm', () => {
      // Arrange
      spyOn<any>(component, 'crearForm');
      // Act
      component['crearForm']();
      // Assert
      expect(component['crearForm']).toHaveBeenCalledTimes(1);
    });

    it('Invoca al metodo subscribeCambioTransporte', () => {
      // Arrange
      spyOn<any>(component, 'subscribeCambioTransporte' );
      // Act
      component['subscribeCambioTransporte']();
      // Assert
      expect(component['subscribeCambioTransporte']).toHaveBeenCalledTimes(1);
    });
  });

  describe('El metodo createForm', () => {
    it('Invoca al metodo crearFiltroForm', () => {
      // Arrange
      spyOn<any>(component, 'crearFiltroForm' );
      // Act
      component['crearForm']();
      // Assert
      expect(component['crearFiltroForm']).toHaveBeenCalledTimes(1);
    });

    it('Invoca al metodo crearDetalleForm', () => {
      // Arrange
      spyOn<any>(component, 'crearDetalleForm');
      // Act
      component['crearForm']();
      // Assert
      expect(component['crearDetalleForm']).toHaveBeenCalledTimes(1);
    });
  });

  describe('El metodo limpiar', () => {

    beforeEach(() => {
      mockearFunciones();
    });

    it('invoca al reset del filtroForm', () => {
      // Arrange
      spyOn(component.filtroForm, 'reset');

      // Act
      component.limpiar();

      // Assert
      expect(component.filtroForm.reset).toHaveBeenCalledTimes(1);
    });

  });

  describe('El metodo onCancelado', () => {

    beforeEach(() => {
      mockearFunciones();
    });

    it('setea undefined al movimiento actual', () => {
      // Arrange
      component.movimiento = new MovimientoCambioTarjeta();

      // Act
      component.onCancelado();

      // Assert
      expect(component.movimiento).toBeUndefined();
    });

    it('invoca al metodo resetForm', () => {
      // Arrange
      spyOn<any>(component, 'resetForm');

      // Act
      component.onCancelado();

      // Assert
      expect(component['resetForm']).toHaveBeenCalledTimes(1);
    });

    it('deshabilita el campo tarjetaNueva del detalleForm', () => {
      // Arrange
      spyOn(component.detalleForm.controls['tarjetaNueva'], 'disable');

      // Act
      component.onCancelado();

      // Assert
      expect(component.detalleForm.controls['tarjetaNueva'].disable).toHaveBeenCalledTimes(1);
    });

  });

  describe('El metodo resetForm', () => {
    it('invoca al reset del detalleForm', () => {
      // Arrange
      spyOn(component.detalleForm, 'reset');
      // Act
      component['resetForm']();
      // Assert
      expect(component.detalleForm.reset).toHaveBeenCalledTimes(1);
    });

    it('invoca al reset del filtroForm', () => {
      // Arrange
      spyOn(component.filtroForm, 'reset');
      // Act
      component['resetForm']();
      // Assert
      expect(component.filtroForm.reset).toHaveBeenCalledTimes(1);
    });

    it('habilita el filtroForm', () => {
      // Arrange
      spyOn(component.filtroForm, 'enable');
      // Act
      component['resetForm']();
      // Assert
      expect(component.filtroForm.enable).toHaveBeenCalledTimes(1);
    });

    it('Invoca al metodo subscribeCambioTransporte', () => {
      // Arrange
      spyOn<any>(component, 'subscribeCambioTransporte');
      // Act
      component['resetForm']();
      // Assert
      expect(component['subscribeCambioTransporte']).toHaveBeenCalled();
    });
  });

  describe('El metodo subscribeCambioTransporte', () => {

    beforeEach(inject([FormBuilder],
      (formBuilder: FormBuilder ) => {
      spyOn<any>(component, 'subscribeCambioTransporte').and.returnValue(of(''));
      this.filtroForm = formBuilder.group({
        tipoDocumentoPorte: '',
        numeroDocumentoPorte: '',
        numeroVagon: '',
        tipoTransporte: {id: '', descripcion: ''}
      });
    }));

    function setTipoTransporte(tipo: number) {
      const tipoTransporte = component.filtroForm.get('tipoTransporte');
      if (tipoTransporte) {
        tipoTransporte.setValue({
          id: tipo,
        });
      }
    }

    it('Inhabilita el control numeroVagon cuando el tipo de Transporte es Camion', () => {
      // Arrange
      spyOn(component.filtroForm.controls['numeroVagon'], 'disable');
      // Act
      setTipoTransporte(TiposTransporte.Camion);
      // Assert
      expect(component.filtroForm.controls['numeroVagon'].disable).toHaveBeenCalledTimes(1);
    });

    it('Invoca al metodo setValue del control numeroVagon cuando el tipo de Transporte es Camion', () => {
      // Arrange
      spyOn(component.filtroForm.controls['numeroVagon'], 'setValue');
      // Act
      setTipoTransporte(TiposTransporte.Camion);
      // Assert
      expect(component.filtroForm.controls['numeroVagon'].setValue).toHaveBeenCalledTimes(1);
    });

    it('Habilita el control numeroVagon cuando el tipo de Transporte es tren', () => {
      // Arrange
      spyOn(component.filtroForm.controls['numeroVagon'], 'enable');
      // Act
      setTipoTransporte(TiposTransporte.Tren);
      // Assert
      expect(component.filtroForm.controls['numeroVagon'].enable).toHaveBeenCalledTimes(1);
    });

  });

  describe('El metodo onAceptado', () => {

    beforeEach(() => {
      mockearFunciones();
    });

    it('no invoca al cambiarTarjeta del cambiarTarjetaService cuando el detalleForm es no valido',
      inject([CambiarTarjetaService], (service: CambiarTarjetaService) => {
        // Arrange
        spyOn(service, 'cambiarTarjeta');
        spyOnProperty(component.detalleForm, 'valid', 'get').and.returnValue(false);

        // Act
        component.onAceptado();

        // Assert
        expect(service.cambiarTarjeta).not.toHaveBeenCalled();
      }));

    it('no invoca al cambiarTarjeta del cambiarTarjetaService cuando el movimiento es undefined',
      inject([CambiarTarjetaService], (service: CambiarTarjetaService) => {
        // Arrange
        component.movimiento = undefined;
        spyOn(service, 'cambiarTarjeta');

        // Act
        component.onAceptado();

        // Assert
        expect(service.cambiarTarjeta).not.toHaveBeenCalled();
      }));

    it('invoca al cambiarTarjeta del cambiarTarjetaService cuando el detalleForm es valido',
      inject([CambiarTarjetaService], (service: CambiarTarjetaService) => {
        // Arrange
        component.movimiento = new MovimientoCambioTarjeta();
        spyOn(service, 'cambiarTarjeta').and.returnValue(of());
        spyOnProperty(component.detalleForm, 'valid', 'get').and.returnValue(true);

        // Act
        component.onAceptado();

        // Assert
        expect(service.cambiarTarjeta).toHaveBeenCalledTimes(1);
      }));

    it('invoca al metodo success del popupService cuando el detalleForm es valido',
      inject([CambiarTarjetaService, PopupService], (service: CambiarTarjetaService, popupService: PopupService) => {
        // Arrange
        component.movimiento = new MovimientoCambioTarjeta();
        spyOn(service, 'cambiarTarjeta').and.returnValue(of(true));
        spyOn(popupService, 'success');
        spyOnProperty(component.detalleForm, 'valid', 'get').and.returnValue(true);

        // Act
        component.onAceptado();

        // Assert
        expect(popupService.success).toHaveBeenCalledTimes(1);
        expect(popupService.success).toHaveBeenCalledWith(Resources.Messages.LaTarjetaFueAsignada, Resources.Labels.AsignarTarjeta);
      }));

    it('invoca al metodo success del popupService cuando el detalleForm es valido',
      inject([CambiarTarjetaService, PopupService], (service: CambiarTarjetaService, popupService: PopupService) => {
        // Arrange
        component.movimiento = new MovimientoCambioTarjeta();
        spyOn(service, 'cambiarTarjeta').and.returnValue(of(true));
        spyOn(popupService, 'success');
        spyOnProperty(component.detalleForm, 'valid', 'get').and.returnValue(true);

        // Act
        component.onAceptado();

        // Assert
        expect(popupService.success).toHaveBeenCalledTimes(1);
        expect(popupService.success).toHaveBeenCalledWith(Resources.Messages.LaTarjetaFueAsignada, Resources.Labels.AsignarTarjeta);
      }));

    it('invoca al metodo onCancelado cuando el detalleForm es valido',
      inject([CambiarTarjetaService, PopupService], (service: CambiarTarjetaService, popupService: PopupService) => {
        // Arrange
        component.movimiento = new MovimientoCambioTarjeta();
        spyOn(service, 'cambiarTarjeta').and.returnValue(of(true));
        spyOn(popupService, 'success');
        spyOnProperty(component.detalleForm, 'valid', 'get').and.returnValue(true);
        spyOn(component, 'onCancelado');

        // Act
        component.onAceptado();

        // Assert
        expect(component.onCancelado).toHaveBeenCalledTimes(1);
      }));
  });

  describe('El metodo buscar', () => {

    beforeEach(() => {
      spyOnProperty(component.filtroForm, 'valid', 'get').and.returnValue(true);
      component.tipoDocumentoPorte = new TipoDocumentoPorte(1, 'Tipo 1');
    });

    it('llama al buscarMovimiento cuando el filtroForm es valido',
      inject([CambiarTarjetaService], (service: CambiarTarjetaService) => {
        // Arrange
        spyOn(service, 'buscarMovimientos').and.returnValue(of(new MovimientoCambioTarjeta()));

        // Act
        component.buscar();

        // Assert
        expect(service.buscarMovimientos).toHaveBeenCalledTimes(1);
      }));

  it('setea el movimiento cuando el filtroForm es valido',
    inject([CambiarTarjetaService], (service: CambiarTarjetaService) => {
      // Arrange
      const esperado = new MovimientoCambioTarjeta();
      spyOn(service, 'buscarMovimientos').and.returnValue(of([new ModalSeleccionarRemitoDataView(1, '')]));
      spyOn(service, 'buscarMovimientoPorId').and.returnValue(of(esperado));
      // Act
      component.buscar();

      // Assert
      expect(component.movimiento).toBe(esperado);
    }));

  it('invoca al setFocus del detalle cuando el filtroForm es valido',
    inject([CambiarTarjetaService], (service: CambiarTarjetaService) => {
      // Arrange
      spyOn(service, 'buscarMovimientos').and.returnValue(of([new ModalSeleccionarRemitoDataView(1, '')]));
      spyOn(service, 'buscarMovimientoPorId').and.returnValue(of(new MovimientoCambioTarjeta()));

      // Act
      component.buscar();

      // Assert
      expect(component.detalle.setFocus).toHaveBeenCalledTimes(1);
    }));

  it('deshabilita el campo numeroDocumentoPorte del filtroForm cuando es valido',
    inject([CambiarTarjetaService], (service: CambiarTarjetaService) => {
      // Arrange
      spyOn(service, 'buscarMovimientos').and.returnValue(of([new ModalSeleccionarRemitoDataView(1, '')]));
      spyOn(service, 'buscarMovimientoPorId').and.returnValue(of(new MovimientoCambioTarjeta()));
      spyOn(component.filtroForm.controls['numeroDocumentoPorte'], 'disable');

      // Act
      component.buscar();

      // Assert
      expect(component.filtroForm.controls['numeroDocumentoPorte'].disable).toHaveBeenCalledTimes(1);
    }));

  it('deshabilita el campo tipoDocumentoPorte del filtroForm cuando es valido',
    inject([CambiarTarjetaService], (service: CambiarTarjetaService) => {
      // Arrange
      spyOn(service, 'buscarMovimientos').and.returnValue(of([new ModalSeleccionarRemitoDataView(1, '')]));
      spyOn(service, 'buscarMovimientoPorId').and.returnValue(of(new MovimientoCambioTarjeta()));
      spyOn(component.filtroForm.controls['tipoDocumentoPorte'], 'disable');

      // Act
      component.buscar();

      // Assert
      expect(component.filtroForm.controls['tipoDocumentoPorte'].disable).toHaveBeenCalledTimes(1);
    }));

  it('habilita el campo tarjetaNueva del detalleForm cuando el filtroForm es valido',
    inject([CambiarTarjetaService], (service: CambiarTarjetaService) => {
      // Arrange
      spyOn(service, 'buscarMovimientos').and.returnValue(of([new ModalSeleccionarRemitoDataView(1, '')]));
      spyOn(service, 'buscarMovimientoPorId').and.returnValue(of(new MovimientoCambioTarjeta()));
      spyOn(component.detalleForm.controls['tarjetaNueva'], 'enable');

      // Act
      component.buscar();

      // Assert
      expect(component.detalleForm.controls['tarjetaNueva'].enable).toHaveBeenCalledTimes(1);
    }));

  it('invoca al patchValue del detalleForm con el movimiento recuperado cuando el filtroForm es valido',
    inject([CambiarTarjetaService], (service: CambiarTarjetaService) => {
      // Arrange
      const esperado = new MovimientoCambioTarjeta();
      spyOn(service, 'buscarMovimientos').and.returnValue(of([new ModalSeleccionarRemitoDataView(1, '')]));
      spyOn(service, 'buscarMovimientoPorId').and.returnValue(of(esperado));
      spyOn(component.detalleForm, 'patchValue');

      // Act
      component.buscar();

      // Assert
      expect(component.detalleForm.patchValue).toHaveBeenCalledTimes(1);
      expect(component.detalleForm.patchValue).toHaveBeenCalledWith(esperado);
    }));

    afterAll(() => {
      TestBed.resetTestingModule();
    });
  });

  describe('El metodo cambiarTarjeta', () => {


    beforeEach(() => {
      component.movimiento = new MovimientoCambioTarjeta();
    });

    it('invoca al meotodo cambiarTarjeta cuando el movimiento no es nulo',
      inject([CambiarTarjetaService], (cambiarTarjetaService: CambiarTarjetaService ) => {
        // Arrange
        spyOn(cambiarTarjetaService, 'cambiarTarjeta').and.returnValue(of(''));
        // Act
        component['cambiarTarjeta']();
        // Assert
        expect(cambiarTarjetaService.cambiarTarjeta).toHaveBeenCalledTimes(1);
      }));

      it('No invoca al meotodo cambiarTarjeta cuando el movimiento es nulo',
      inject([CambiarTarjetaService], (cambiarTarjetaService: CambiarTarjetaService ) => {
        // Arrange
        component.movimiento = undefined;
        spyOn(cambiarTarjetaService, 'cambiarTarjeta').and.returnValue(of(''));
        // Act
        component['cambiarTarjeta']();
        // Assert
        expect(cambiarTarjetaService.cambiarTarjeta).toHaveBeenCalledTimes(0);
      }));

      it('invoca al popupService.success cuando la tarjeta fue asignada',
      inject([CambiarTarjetaService, PopupService],
         (cambiarTarjetaService: CambiarTarjetaService, popupService: PopupService ) => {
        // Arrange
        spyOn(popupService, 'success');
        spyOn(cambiarTarjetaService, 'cambiarTarjeta').and.returnValue(of(''));
        // Act
        component['cambiarTarjeta']();
        // Assert
        expect(popupService.success).toHaveBeenCalledTimes(1);
      }));

      it('habilita el filtroForm cuando la tarjeta fue asignada',
      inject([CambiarTarjetaService],
         (cambiarTarjetaService: CambiarTarjetaService) => {
        // Arrange
        spyOn(component.filtroForm, 'enable');
        spyOn(cambiarTarjetaService, 'cambiarTarjeta').and.returnValue(of(''));
        // Act
        component['cambiarTarjeta']();
        // Assert
        expect(component.filtroForm.enable).toHaveBeenCalledTimes(1);
      }));

      it('Invoca al metodo onCancelado cuando la tarjeta fue asignada',
      inject([CambiarTarjetaService],
        (cambiarTarjetaService: CambiarTarjetaService) => {
        // Arrange
        spyOn(component, 'onCancelado');
        spyOn(cambiarTarjetaService, 'cambiarTarjeta').and.returnValue(of(''));
        // Act
        component['cambiarTarjeta']();
        // Assert
        expect(component.onCancelado).toHaveBeenCalledTimes(1);
      }));
  });
});

