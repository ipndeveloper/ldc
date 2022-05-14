import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRegistrarDecisionLaboratorioComponent } from './modal-registrar-decision-laboratorio.component';
import { TestModule } from '../../../core/mocks/test.module';
import { CoreSharedModule } from '../../../core/core-shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HotkeyModule } from 'angular2-hotkeys';
import { GestionarCalidadPorLaboratorioService } from '../service/gestionar-calidad-por-laboratorio.service';
import { DecisionLaboratorioService } from '../service/decision-laboratorio.service';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { configureTestSuite } from '../../../core/mocks/testing';

describe('ModalRegistrarDecisionLaboratorioComponent', () => {
  let component: ModalRegistrarDecisionLaboratorioComponent;
  let fixture: ComponentFixture<ModalRegistrarDecisionLaboratorioComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        ModalRegistrarDecisionLaboratorioComponent,
      ],
      imports: [
        TestModule,
        CoreSharedModule,
        ReactiveFormsModule,
        HotkeyModule.forRoot()
      ],
      providers: [
        GestionarCalidadPorLaboratorioService,
        DecisionLaboratorioService,
        FormComponentService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRegistrarDecisionLaboratorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('El metodo aceptar', () => {
    let formService;
    let service;

    beforeEach(() => {
      formService = fixture.debugElement.injector.get(FormComponentService);
      service = fixture.debugElement.injector.get(GestionarCalidadPorLaboratorioService);
      component.calidadPorLaboratorio = {id: 1} as any;
    });

    it('llama al isValidForm del FormComponentService', () => {
        // Arrange
        spyOn(formService, 'isValidForm');

        // Act
        component.aceptar();

        // Assert
        expect(formService.isValidForm).toHaveBeenCalledTimes(1);
      });

    it('invoca al registrarDecision del GestionarCalidadPorLaboratorioService cuando el form es valido', () => {
        // Arrange
        spyOn(formService, 'isValidForm').and.returnValue(true);
        spyOn(service, 'registrarDecision').and.returnValue(of(''));

        // Act
        component.aceptar();

        // Assert
        expect(service.registrarDecision).toHaveBeenCalledTimes(1);
      });

    it('emite decisionRegistrada luego de registrarDecision', () => {
        // Arrange
        spyOn(formService, 'isValidForm').and.returnValue(true);
        spyOn(service, 'registrarDecision').and.returnValue(of(''));
        spyOn(component.decisionRegistrada, 'emit');

        // Act
        component.aceptar();

        // Assert
        expect(component.decisionRegistrada.emit).toHaveBeenCalledTimes(1);
      });

    it('cierra el modal luego de registrarDecision', () => {
        // Arrange
        spyOn(formService, 'isValidForm').and.returnValue(true);
        spyOn(service, 'registrarDecision').and.returnValue(of(''));
        spyOn(component.modal, 'close');

        // Act
        component.aceptar();

        // Assert
        expect(component.modal.close).toHaveBeenCalledTimes(1);
      });
  });

});
