import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsignarTarjetaComponent } from './asignar-tarjeta.component';
import { configureTestSuite } from '../../core/mocks/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestModule } from '../../core/mocks/test.module';
import { AsignarTarjetaService } from '../shared/modals/modal-asignar-tarjeta/asignar-tarjeta.service';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { PopupService } from '../../core/services/popupService/popup.service';
import { LecturaTarjetaComponent } from '../shared/lectura-tarjeta/lectura-tarjeta.component';
import { TipoDocumentoPorteService } from '../shared/desplegable-tipo-documento-porte/tipo-documento-porte.service';


describe('AsignarTarjetaComponent', () => {
  let component: AsignarTarjetaComponent;
  let fixture: ComponentFixture<AsignarTarjetaComponent>;
  let formComponentService: any;
  let asignarTarjetaService: any;
  let popupService: any;
  let formBuilder: FormBuilder;

  formComponentService = jasmine.createSpyObj('FormComponentService', [
    'isValidForm',
    'initialize',
    'getValue',
    'validateForm',
    'showValidationError',
    'resetForm'
  ]);

  asignarTarjetaService = jasmine.createSpyObj('AsignarTarjetaService', [
    'asignarTarjetaPorDocumentoPorteYPatente',
    'validarDocPorteYPatente'
  ]);

  popupService = jasmine.createSpyObj('PopupService', ['success', 'error']);

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [AsignarTarjetaComponent, LecturaTarjetaComponent],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        [FormBuilder],
        { provide: AsignarTarjetaService, useValue: asignarTarjetaService },
        { provide: FormComponentService, useValue: formComponentService },
        { provide: PopupService, useValue: popupService },
        TipoDocumentoPorteService
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarTarjetaComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.get(FormBuilder);
    component.ngAfterViewInit = jasmine.createSpy('ngAfterViewInit');
    component.tipoDocumentoPorte.setFocus = jasmine.createSpy('setFocus');
    asignarTarjetaService.validarDocPorteYPatente.and.returnValue(of(true));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('El boton "Asignar Tarjeta"', () => {
    let button;
    beforeEach(() => {
      fixture.detectChanges();
      component.form = new FormGroup({});
      button = fixture.debugElement.query(By.css('button'));
    });

    it('no deberia habilitarse el boton "Asignar Tarjeta" cuando el form es invalido', () => {
      formComponentService.isValidForm.and.returnValue(false);

      fixture.detectChanges();

      expect(button.nativeElement.getAttribute('disabled')).not.toBeNull();
    });

    it('deberia habilitarse el boton "Asignar Tarjeta" cuando el form es valido', () => {
      formComponentService.isValidForm.and.returnValue(true);
      fixture.detectChanges();

      expect(button.nativeElement.getAttribute('disabled')).toBeNull();
    });

    it('deberia accederse al metodo onAsignarTarjeta cuando el boton esta habilitado y se hace click', () => {
      formComponentService.isValidForm.and.returnValue(true);
      spyOn(component, 'onAsignarTarjeta');

      button.triggerEventHandler('click', null);
      fixture.detectChanges();

      expect(component.onAsignarTarjeta).toHaveBeenCalled();
    });
  });

  describe('El div class="col-sm-8"', () => {
    let div;
    beforeEach(() => {
      component.form = new FormGroup({});
    });

    it('cuando lecturaEnModoAutomatico es false, el dive deberia ser null', () => {
      component.lecturaTarjeta.lecturaEnModoAutomatico = false;

      fixture.detectChanges();
      div = fixture.debugElement.query(By.css('div.col-sm-8'));
      expect(div).toBeNull();
    });

    it('cuando lecturaEnModoAutomatico es true, el div debe estar disponible', () => {
      component.lecturaTarjeta.lecturaEnModoAutomatico = true;

      fixture.detectChanges();
      div = fixture.debugElement.query(By.css('div.col-sm-8'));
      expect(div).not.toBeNull();
    });
  });

  describe('El div class="col-sm-4"', () => {
    let div;
    beforeEach(() => {
      fixture.detectChanges();
      component.form = new FormGroup({});
      div = fixture.debugElement.query(By.css('div.col-sm-4'));
    });

    it('cuando lecturaEnModoAutomatico es false, el div debe estar disponible', () => {
      component.lecturaTarjeta.lecturaEnModoAutomatico = false;

      fixture.detectChanges();

      expect(div).not.toBeNull();
    });

    it('cuando lecturaEnModoAutomatico es true, el div debe estar disponible', () => {
      component.lecturaTarjeta.lecturaEnModoAutomatico = true;

      fixture.detectChanges();

      expect(div).not.toBeNull();
    });
  });

  describe('El div class="form-group col-sm-4"', () => {
    let div;
    beforeEach(() => {
      fixture.detectChanges();
      component.form = new FormGroup({});
      div = fixture.debugElement.query(By.css('div.form-group.col-sm-4'));
    });

    it('cuando lecturaEnModoAutomatico es false, el div debe estar disponible', () => {
      component.lecturaTarjeta.lecturaEnModoAutomatico = false;

      fixture.detectChanges();

      expect(div).not.toBeNull();
    });

    it('cuando lecturaEnModoAutomatico es true, el div debe estar disponible', () => {
      component.lecturaTarjeta.lecturaEnModoAutomatico = true;

      fixture.detectChanges();

      expect(div).not.toBeNull();
    });
  });

  describe('El metodo onAsignarTarjeta()', () => {
    beforeEach(() => {
      asignarTarjetaService.asignarTarjetaPorDocumentoPorteYPatente.and.returnValue(
        of([])
      );
      component.form = new FormGroup({});
      fixture.detectChanges();
    });

    it('deberia acceder al metodo privado mapControlsToCommand (), si el form es valido', () => {
      formComponentService.isValidForm.and.returnValue(true);
      const formValueTipoDocumentoPorteSpy = spyOnProperty<any>(
        component,
        'formValueTipoDocumentoPorte',
        'get'
      );
      const formValueDocumentoPorteSpy = spyOnProperty<any>(
        component,
        'formValueDocumentoPorte',
        'get'
      );
      const formValuePatenteSpy = spyOnProperty<any>(
        component,
        'formValuePatente',
        'get'
      );

      component.onAsignarTarjeta();

      expect(formValueTipoDocumentoPorteSpy).toHaveBeenCalled();
      expect(formValueDocumentoPorteSpy).toHaveBeenCalled();
      expect(formValuePatenteSpy).toHaveBeenCalled();
      expect(formComponentService.getValue).toHaveBeenCalled();
    });

    it('deberia acceder a asignarTarjetaPorDocumentoPorteYPatente, si el form es valido', () => {
      formComponentService.isValidForm.and.returnValue(true);
      asignarTarjetaService.asignarTarjetaPorDocumentoPorteYPatente.and.returnValue(
        of([])
      );

      component.onAsignarTarjeta();

      expect(
        asignarTarjetaService.asignarTarjetaPorDocumentoPorteYPatente
      ).toHaveBeenCalled();
    });

    it(' deberia acceder a asignarTarjetaPorDocumentoPorteYPatente (subscribe), si el form es valido', () => {
      formComponentService.isValidForm.and.returnValue(true);

      component.onAsignarTarjeta();

      expect(popupService.success).toHaveBeenCalled();
      expect(formComponentService.resetForm).toHaveBeenCalled();
      expect(component.tipoDocumentoPorte.setFocus).toHaveBeenCalled();
    });

    it('deberia acceder al metodo getValue de FormComponentService, si el form es invalido', () => {
      formComponentService.isValidForm.and.returnValue(false);

      component.onAsignarTarjeta();

      expect(formComponentService.getValue).toHaveBeenCalled();
    });

    it('deberia acceder al metodo privado validarForm(), si el form es invalido', () => {
      formComponentService.isValidForm.and.returnValue(false);

      component.onAsignarTarjeta();

      expect(formComponentService.validateForm).toHaveBeenCalled();
      expect(formComponentService.showValidationError).toHaveBeenCalled();
    });
  });

  describe('El metodo onTarjetaLeida()', () => {
    it(' deberia ejecutar el metodo onAsignarTarjeta()', () => {
      const onAsignarTarjetaSpy = spyOn<any>(component, 'onAsignarTarjeta');

      component.onTarjetaLeida();

      expect(onAsignarTarjetaSpy).toHaveBeenCalled();
    });
  });

  describe('El metodo privado createForm()', () => {
    it('deberia ejecutar el metodo createForm() mediante ngOnInit()', () => {
      const formGroup = new FormGroup({});
      const groupSpy = spyOn(formBuilder, 'group').and.returnValue(formGroup);

      component.ngOnInit();

      expect(groupSpy).toHaveBeenCalled();
      expect(formComponentService.initialize).toHaveBeenCalled();
    });
  });

  describe('La propiedad cssClassRowLecturaTarjeta()', () => {
    it('deberia devolver "" cuando lecturaTarjeta existe y lecturaEnModoAutomatico es false ', () => {
      component.lecturaTarjeta.lecturaEnModoAutomatico = false;

      const result = component.cssClassRowLecturaTarjeta;

      expect(result).toBe('');
    });

    it('deberia devolver "justify-content-end" cuando lecturaTarjeta existe y lecturaEnModoAutomatico', () => {
      component.lecturaTarjeta.lecturaEnModoAutomatico = true;

      const result = component.cssClassRowLecturaTarjeta;

      expect(result).toBe('justify-content-end');
    });
  });

  describe('La propiedad validateDocPorteYPatente()', () => {
    beforeEach(() => {
      component.form = new FormGroup({});
    });

    it('deberia ejecutar el servicio AsignarTarjetaService ', () => {
      component.validateDocPorteYPatente.subscribe();

      expect(asignarTarjetaService.validarDocPorteYPatente).toHaveBeenCalled();
    });

    it('deberia retornar el mismo valor que AsignarTarjetaService', () => {
      asignarTarjetaService.validarDocPorteYPatente.and.returnValue(of(true));
      let result: Boolean = false;

      component.validateDocPorteYPatente.subscribe((r) => (result = r));

      expect(result).toBeTruthy();
    });

    it('deberia ejecutar el popupService', () => {
      asignarTarjetaService.validarDocPorteYPatente.and.returnValue(of(false));
      formComponentService.getValue.and.returnValue('valor');

      component.validateDocPorteYPatente.subscribe();

      expect(popupService.error).toHaveBeenCalled();
    });
  });

  describe('La propiedad formValid()', () => {
    it('deberia devolver true y ejecutar el metodo isValidForm del FormComponentService, si el form existe', () => {
      component.form = new FormGroup({});
      formComponentService.isValidForm.and.returnValue(true);

      const result = component.formValid;

      expect(formComponentService.isValidForm).toHaveBeenCalled();
      expect(result).toBeTruthy();
    });

    it('deberia devolver false y ejecutar el metodo isValidForm del FormComponentService, cuando el form es invalido', () => {
      component.form = new FormGroup({});
      formComponentService.isValidForm.and.returnValue(false);

      const result = component.formValid;

      expect(formComponentService.isValidForm).toHaveBeenCalled();
      expect(result).toBeFalsy();
    });

    it('deberia devolver falso cuando el form no existe', () => {
      const result = component.formValid;

      expect(result).toBeFalsy();
    });
  });

  describe('La propiedad formValueTipoDocumentoPorte()', () => {
    it(' deberia ejecutarse el metodo getValue of the FormComponentService y devolver el valor, si el form existe', () => {
      component.form = new FormGroup({});

      const result = component.formValueTipoDocumentoPorte;

      expect(formComponentService.getValue).toHaveBeenCalled();
      expect(result).not.toBeNull();
    });

    it(' deberia devolver null si el form no existe', () => {
      const result = component.formValueTipoDocumentoPorte;

      expect(result).toBeNull();
    });
  });

  describe('La propiedad formValueDocumentoPorte()', () => {
    it(' deberia ejecutarse el metodo getValue of the FormComponentService y devolver el valor, si el form existe', () => {
      component.form = new FormGroup({});

      const result = component.formValueDocumentoPorte;

      expect(formComponentService.getValue).toHaveBeenCalled();
      expect(result).not.toBeNull();
    });

    it(' deberia devolver null si el form no existe', () => {
      const result = component.formValueDocumentoPorte;

      expect(result).toBeNull();
    });
  });

  describe('La propiedad formValuePatente()', () => {
    it(' deberia ejecutarse el metodo getValue of the FormComponentService y devolver el valor, si el form existe', () => {
      component.form = new FormGroup({});

      const result = component.formValuePatente;

      expect(formComponentService.getValue).toHaveBeenCalled();
      expect(result).not.toBeNull();
    });

    it(' deberia devolver null si el form no existe', () => {
      const result = component.formValuePatente;

      expect(result).toBeNull();
    });
  });
});
