import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DecisionRegistrarControlPatrimonialComponent } from './decision-registrar-control-patrimonial.component';
import { configureTestSuite } from '../../../core/mocks/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormGroup } from '@angular/forms';

describe('DecisionRegistrarControlPatrimonialComponent', () => {
  let component: DecisionRegistrarControlPatrimonialComponent;
  let fixture: ComponentFixture<DecisionRegistrarControlPatrimonialComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [DecisionRegistrarControlPatrimonialComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DecisionRegistrarControlPatrimonialComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('El metodo setEnableDecision()', () => {
    beforeEach(() => {
      component.decisionComponent.setFocus = jasmine.createSpy('setFocus');
    });

    it('invoca al metodo setFocus de desicioncomponent si el form existe', () => {
      component.form = new FormGroup({});
      spyOn(component.form, 'enable');

      component.setEnableDecision(true);

      expect(component.form.enable).toHaveBeenCalled();
      expect(component.decisionComponent.setFocus).toHaveBeenCalled();
    });

    it('invoca al metodo setFocus de desicioncomponent si el form existe', () => {
      component.form = new FormGroup({});
      spyOn(component.form, 'disable');

      component.setEnableDecision(false);

      expect(component.form.disable).toHaveBeenCalled();
      expect(component.decisionComponent.setFocus).toHaveBeenCalled();
    });

    it('no existe el form', () => {
      component.setEnableDecision(false);

      expect(component.decisionComponent.setFocus).not.toHaveBeenCalled();
    });
  });
});
