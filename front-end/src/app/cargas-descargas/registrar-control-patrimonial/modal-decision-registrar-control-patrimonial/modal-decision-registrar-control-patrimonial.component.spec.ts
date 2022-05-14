import { ComponentFixture, fakeAsync, tick, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ModalDecisionRegistrarControlPatrimonialComponent } from './modal-decision-registrar-control-patrimonial.component';
import { configureTestSuite } from '../../../core/mocks/testing';
import { PopupModule } from '../../../core/services/popupService/popup.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NavigationService } from '../../../core/services/navigationService/navigation.service';
import { AuthService } from '../../../core/services/session/auth.service';
import { ApiService } from '../../../core/services/restClient/api.service';
import { RestHandlerService } from '../../../core/services/restClient/restHandler.service';
import { RequestOptionsService } from '../../../core/services/restClient/requestOptions.service';
import { TestModule } from '../../../core/mocks/test.module';
import { FormGroup } from '@angular/forms';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { Collection } from '../../../core/models/collection';
import { DesplegableValorBooleanoComponent } from '../../../shared/desplegable-valor-booleano/desplegable-valor-booleano.component';

describe('ModalDecisionRegistrarControlPatrimonialComponent', () => {
  let component: ModalDecisionRegistrarControlPatrimonialComponent;
  let fixture: ComponentFixture<ModalDecisionRegistrarControlPatrimonialComponent>;

  configureTestSuite(() => {

    TestBed.configureTestingModule({
      declarations: [    ModalDecisionRegistrarControlPatrimonialComponent],
      imports: [
        PopupModule,
        RouterTestingModule,
        TestModule
      ],
      providers: [
        NavigationService,
        AuthService,
        ApiService,
        RestHandlerService,
        RequestOptionsService,
        FormComponentService,
        DesplegableValorBooleanoComponent
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDecisionRegistrarControlPatrimonialComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup({});
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('El metodo setFocus()', () => {
    it('invoca al metodo setFocus de desicionComponent', () => {
      component.decisionComponent = jasmine.createSpyObj('DesplegableValorBooleanoComponent', ['setFocus']);
      component.setFocus();

      expect(component.decisionComponent.setFocus).toHaveBeenCalled();
    });
  });

  describe('El metodo open()', () => {
    it('invoca al metodo open del modal y al setFocus', fakeAsync(() => {
      component.modal.open = jasmine.createSpy('open');
      spyOn(component, 'setFocus');
      component.open();

      expect(component.modal.open).toHaveBeenCalled();
      expect(component.esContinuar).toBeFalsy();
      tick(1);
      expect(component.setFocus).toHaveBeenCalled();
    }));
  });

  describe('El metodo close()', () => {
    it('invoca al metodo close de la propiedad modal', () => {
      component.modal.close = jasmine.createSpy('close');

      component.close();

      expect(component.modal.close).toHaveBeenCalled();
    });
  });

  describe('El metodo ngOnDestroy()', () => {
    it('invoca al metodo next y unsubscribe de onDestroy', () => {
      spyOn<any>(component['onDestroy'], 'next');
      spyOn<any>(component['onDestroy'], 'unsubscribe');

      component.ngOnDestroy();

      expect(component['onDestroy'].next).toHaveBeenCalledWith(true);
      expect(component['onDestroy'].unsubscribe).toHaveBeenCalled();

    });
  });

  describe('El metodo onClosing()', () => {
    it('invoca al metodo reset del form y emit de modalCancel', () => {
      spyOn(component.form, 'reset');
      spyOn(component.modalCancel, 'emit');
      component.onClosing();

      expect(component.form.reset).toHaveBeenCalled();
      expect(component.modalCancel.emit).toHaveBeenCalled();
    });
  });

  describe('El metodo onAccept()', () => {
    beforeEach(() => {
      spyOn(FormComponentService.prototype, 'initialize');
      spyOn(FormComponentService.prototype, 'showValidationError');
      spyOn(FormComponentService.prototype, 'validateForm');
      spyOn(component.accepted, 'emit');
    });
    it('invoca a los metodos correspondientes de fcService', () => {
      const errors = new Collection<string>();
      spyOn(FormComponentService.prototype, 'isValidForm').and.returnValue(true);

      component.onAccept();

      expect(FormComponentService.prototype.initialize).toHaveBeenCalledWith(component.form);
      expect(FormComponentService.prototype.validateForm).toHaveBeenCalledWith(component.form.controls, errors, '');
      expect(FormComponentService.prototype.showValidationError).toHaveBeenCalledWith(errors);
      expect(FormComponentService.prototype.isValidForm).toHaveBeenCalled();
      expect(component.accepted.emit).toHaveBeenCalledWith(component.esContinuar);
    });

    it('invoca a los metodos correspondientes de fcService', () => {
      spyOn(FormComponentService.prototype, 'isValidForm').and.returnValue(false);

      component.onAccept();

      expect(component.accepted.emit).not.toHaveBeenCalledWith(component.esContinuar);
    });
  });

  describe('El metodo aceptarContinuar()', () => {
    it('invoca al metodo onAccept y setea esContinuar en true', () => {
      spyOn(component, 'onAccept');

      component.aceptarContinuar();

      expect(component.onAccept).toHaveBeenCalled();
      expect(component.esContinuar).toBeTruthy();
    });
  });
});
