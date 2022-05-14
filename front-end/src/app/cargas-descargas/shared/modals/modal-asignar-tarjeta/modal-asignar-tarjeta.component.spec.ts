import { ComponentFixture, fakeAsync, tick, TestBed } from '@angular/core/testing';
import { ModalAsignarTarjetaComponent } from './modal-asignar-tarjeta.component';
import { AsignarTarjetaService } from './asignar-tarjeta.service';
import { FormComponentService } from '../../../../core/services/formComponent/formComponent.service';
import { FormBuilder, FormGroup} from '@angular/forms';
import { TestModule } from '../../../../core/mocks/test.module';
import { configureTestSuite } from '../../../../core/mocks/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LecturaTarjetaService } from '../../services/lectura-tarjeta.service';
import { PopupService } from '../../../../core/services/popupService/popup.service';
import { of } from 'rxjs/internal/observable/of';
import { NumeroConEtiquetaComponent } from '../../../../core/controls/numero-con-etiqueta/numero-con-etiqueta.component';
import { ModalComponent } from '../../../../core/components/modal/modal.component';
import { LecturaTarjetaEnAutomaticoDataView } from '../../../../shared/data-models/lectura-tarjeta-en-automatico-data-view';
import { Resources } from '../../../../../locale/artifacts/resources';

describe('ModalAsignarTarjetaComponent', () => {
  let component: ModalAsignarTarjetaComponent;
  let fixture: ComponentFixture<ModalAsignarTarjetaComponent>;
  let lecturaTarjetaService: any;
  let asignarTarjetaService: any;
  let formComponentService: any;
  let popupService: any;
  let formBuilder: FormBuilder;

  configureTestSuite(() => {

    formComponentService = jasmine.createSpyObj('FormComponentService', [
        'isValidForm',
        'initialize',
        'getValue',
        'resetForm',
        'setValue'
    ]);
    asignarTarjetaService = jasmine.createSpyObj('AsignarTarjetaService', [
        'asignarTarjeta',
        'tarjetaEnUso'
    ]);

    popupService = jasmine.createSpyObj('PopupService', ['success', 'error']);

    lecturaTarjetaService = jasmine.createSpyObj('LecturaTarjetaService', ['consultarModoLecturaTarjeta']);

    TestBed.configureTestingModule({
      declarations: [
        ModalAsignarTarjetaComponent,
        NumeroConEtiquetaComponent,
        ModalComponent
      ],
      imports: [TestModule],
      providers: [
        FormBuilder,
        { provide: LecturaTarjetaService, useValue: lecturaTarjetaService },
        { provide: AsignarTarjetaService, useValue: asignarTarjetaService },
        { provide: PopupService, useValue: popupService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    TestBed.overrideProvider(FormComponentService, { useValue: formComponentService });
    TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAsignarTarjetaComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.get(FormBuilder);
    component.asignarTarjetaForm = formBuilder.group({numeroTarjeta: '1'});
    component.tarjeta = new NumeroConEtiquetaComponent();
    component.tarjeta.setFocus = jasmine.createSpy('setFocus');
    component.modal = new ModalComponent();
    component.modal.open = jasmine.createSpy('open');
    component.modal.accept = jasmine.createSpy('accept');
    component.focoLecturaAutomatica = {nativeElement: jasmine.createSpyObj('nativeElement', ['focus'])};
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('La propiedad botonAceptarDeshabilitado()', () => {

    it ('retorna el valor que lecturaEnModoAutomatico posee', () => {
      component.lecturaEnModoAutomatico = false;
      let result = component.botonAceptarDeshabilitado;

      expect(result).toBeFalsy();

      component.lecturaEnModoAutomatico = true;
      result = component.botonAceptarDeshabilitado;

      expect(result).toBeTruthy();
    });
  });

  describe('El metodo ngOnInit()', () => {
    it('ejecuta el metodo group de formBuilder y el metodo initialize de formComponentService', () => {
      const formGroup = new FormGroup({});
      const groupSpy = spyOn(formBuilder, 'group').and.returnValue(formGroup);
      component.ngOnInit();
      expect(groupSpy).toHaveBeenCalled();
      expect(formComponentService.initialize).toHaveBeenCalled();
    });
  });

  describe('El metodo abrir()', () => {
    it('se ejecuta el metodo consultarModoLecturaTarjeta del LecturaTarjetaService y se setean los valores esperados', fakeAsync(() => {
      const elemento: LecturaTarjetaEnAutomaticoDataView = { segundosAEsperar: 1,
                                                             esAutomatico: false,
                                                             prefijoPrimerKeycode: 1,
                                                             prefijoSegundoKeycode: 2,
                                                             sufijoKeycode: 3,
                                                             puestoTrabajoUtilizaTarjeta: false
                                                            };
      lecturaTarjetaService.consultarModoLecturaTarjeta.and.returnValue(of(elemento));

      component.abrir(3);

      expect(component.prefijoSegundoKeycode).toBe(2);
      expect(component.prefijoPrimerKeycode).toBe(1);
      expect(component.sufijo).toBe(3);
      expect(component.lecturaEnModoAutomatico).toBeFalsy();
      expect(component.modal.open).toHaveBeenCalled();
      tick(3);
      expect(component.tarjeta.setFocus).toHaveBeenCalled();

    }));

    it('se ejecuta el metodo consultarModoLecturaTarjeta del LecturaTarjetaService, con lecturaEnModoAutomatico en false', fakeAsync(() => {
      const elemento: LecturaTarjetaEnAutomaticoDataView = {segundosAEsperar: 1,
                                                             esAutomatico: true,
                                                             prefijoPrimerKeycode: 1,
                                                             prefijoSegundoKeycode: 2,
                                                             sufijoKeycode: 3,
                                                             puestoTrabajoUtilizaTarjeta: false
                                                            };
      lecturaTarjetaService.consultarModoLecturaTarjeta.and.returnValue(of(elemento));
      component.abrir();

      expect(component.lecturaEnModoAutomatico).toBeTruthy();
      tick(3);
      expect(component.focoLecturaAutomatica.nativeElement.focus).toHaveBeenCalled();
    }));
  });

  describe('El metodo aceptar()', () => {
    let completed: any;
    beforeEach(() => {
      component.tarjetaAsignada.emit = jasmine.createSpy('emit');
      formComponentService.getValue.and.returnValue(2);
      spyOn(component, 'resetModal');
      completed = spyOn(new MouseEvent('click'), 'preventDefault');
    });

    it('si el form es valido pero el idMovimiento no existe, se llama al asignarTarjetaService y la tarjeta esta en uso', () => {
      formComponentService.isValidForm.and.returnValue(true);
      asignarTarjetaService.tarjetaEnUso.and.returnValue(of(true));

      component.aceptar(completed);

      expect(formComponentService.isValidForm).toHaveBeenCalled();
      expect(formComponentService.getValue).toHaveBeenCalledWith('numeroTarjeta');
      expect(asignarTarjetaService.tarjetaEnUso).toHaveBeenCalled();
      expect(popupService.error).toHaveBeenCalledWith(Resources.Messages.TarjetaEnUso, Resources.Messages.ErrorValidacion);
      expect(component.resetModal).toHaveBeenCalled();
    });

    it('si el form es valido pero el idMovimiento no existe, se llama al asignarTarjetaService y la tarjeta no esta en uso ', () => {
      formComponentService.isValidForm.and.returnValue(true);
      asignarTarjetaService.tarjetaEnUso.and.returnValue(of(false));

      component.aceptar(completed);

      expect(formComponentService.getValue).toHaveBeenCalledWith('numeroTarjeta');
      expect(formComponentService.isValidForm).toHaveBeenCalled();
      expect(asignarTarjetaService.tarjetaEnUso).toHaveBeenCalled();
      expect(component.tarjetaAsignada.emit).toHaveBeenCalled();
    });

    it('si el form es valido y el idMovimiento existe, se llama al asignarTarjetaService y se asignarTarjeta ', () => {
      formComponentService.isValidForm.and.returnValue(true);
      asignarTarjetaService.asignarTarjeta.and.returnValue(of([]));
      component['idMovimiento'] = 3;

      component.aceptar(completed);

      expect(formComponentService.getValue).toHaveBeenCalledWith('numeroTarjeta');
      expect(formComponentService.isValidForm).toHaveBeenCalled();
      expect(asignarTarjetaService.asignarTarjeta).toHaveBeenCalledWith(3, 2);
      expect(component.tarjetaAsignada.emit).toHaveBeenCalled();
    });

    it('si el form es invalido se accede al popupService y al metodo privado limpiarTarjetaEscrita()', () => {
      formComponentService.isValidForm.and.returnValue(false);
      component.lecturaEnModoAutomatico = true;

      component.aceptar(completed);

      expect(popupService.error).toHaveBeenCalledWith(Resources.Messages.TarjetaInvalidaIntenteNuevamente);
      expect(formComponentService.isValidForm).toHaveBeenCalled();
      expect(component.primerPrefijoLeido).toBeFalsy();
      expect(component.segundoPrefijoLeido).toBeFalsy();
      expect(component.tarjetaEscrita).toBe('');
    });
  });

  describe('el metodo resetModal', () => {
    it('el numeroTarjeta del asignarTarjetaForm se setea en "" y si lecturaEnModoAutomatico es true entonces se hace focus en focoLecturaAutomatica',  () => {
      component.lecturaEnModoAutomatico = true;

      component.resetModal();

      expect(component.asignarTarjetaForm.controls.numeroTarjeta.value).toBe('');
      expect(component.focoLecturaAutomatica.nativeElement.focus).toHaveBeenCalled();
    });

    it('el numeroTarjeta del asignarTarjetaForm se setea en "" y si lecturaEnModoAutomatico es false entonces se hace focus en tarjeta (NumeroConEtiquetaComponent)',  () => {
      component.lecturaEnModoAutomatico = false;

      component.resetModal();

      expect(component.asignarTarjetaForm.controls.numeroTarjeta.value).toBe('');
      expect(component.tarjeta.setFocus).toHaveBeenCalled();
    });
  });

  describe('El metodo reinicializar', () => {
    it('ejecuta el metodo resetForm() de formComponentService', () => {
      component.reinicializar();

      expect(formComponentService.resetForm).toHaveBeenCalled();
    });
  });

  describe('El metodo onBlurTarjeta()', () => {
    it('si lecturaEnModoAutomatico es true entonces se ejecuta accept del modal', () => {
      component.lecturaEnModoAutomatico = true;

      component.onBlurTarjeta();

      expect(component.modal.accept).toHaveBeenCalled();
    });
  });

  describe('El metodo onkeydown()', () => {
    let evento: KeyboardEvent;

    beforeEach(() => {
      evento = new KeyboardEvent('keydown');
      spyOnProperty(evento, 'keyCode', 'get').and.returnValue(12);
    });

    it('si la keycode es 13 se ejecutan metodos del event', () => {

      component.lecturaEnModoAutomatico = true;
      const evento13 = new KeyboardEvent('keydown');
      spyOnProperty(evento13, 'keyCode', 'get').and.returnValue(13);

      evento13.preventDefault = jasmine.createSpy('preventDefault');
      evento13.stopPropagation = jasmine.createSpy('stopPropagation');
      component.onkeydown(evento13);

      expect(evento13.preventDefault).toHaveBeenCalled();
      expect(evento13.stopPropagation).toHaveBeenCalled();
      expect(evento13.cancelBubble).toBeTruthy();
    });

    it('si la keycode es diferente a DLE_KEYCODE y es distinto al sufijo pero es igual al prefijoPrimerKeyCode el primerPrefijoLeido se setea en true', () => {

      component.lecturaEnModoAutomatico = true;
      component.prefijoPrimerKeycode = 12;
      component.primerPrefijoLeido = false;

      component.onkeydown(evento);

      expect(component.primerPrefijoLeido).toBeTruthy();
    });

    it('si la keycode es diferente a DLE_KEYCODE y es distinto al sufijo pero es igual al prefijoSegundoKeyCode el segundoPrefijoLeido se setea en true', () => {

      component.lecturaEnModoAutomatico = true;
      component.primerPrefijoLeido = true;
      component.segundoPrefijoLeido = false;
      component.prefijoSegundoKeycode = 12;

      component.onkeydown(evento);

      expect(component.segundoPrefijoLeido).toBeTruthy();
    });

    it('si la keycode es diferente a DLE_KEYCODE y es distinto al sufijo, y los dos prefijos son leidos, se le agrega la key del evento a la tarjetaEscrita', () => {

      component.lecturaEnModoAutomatico = true;
      component.primerPrefijoLeido = true;
      component.segundoPrefijoLeido = true;
      spyOnProperty(evento, 'key', 'get').and.returnValue('1');
      component.tarjetaEscrita = '2';

      component.onkeydown(evento);

      expect(component.tarjetaEscrita).toBe('21');
    });

    it('si la keycode es diferente a DLE_KEYCODE y es igual al sufijo, se accede al setValue y al accept', () => {
      component.lecturaEnModoAutomatico = true;
      component.sufijo = 12;

      component.onkeydown(evento);

      expect(formComponentService.setValue).toHaveBeenCalledWith('numeroTarjeta', component.tarjetaEscrita, {onlySelf: true}, false);
      expect(component.modal.accept).toHaveBeenCalled();
    });
  });
});
