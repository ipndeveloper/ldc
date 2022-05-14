import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { DesplegableDecisionLaboratorioComponent } from './desplegable-decision-laboratorio.component';
import { TestModule } from '../../../core/mocks/test.module';
import { configureTestSuite } from '../../../core/mocks/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { of } from 'rxjs';
import { Circuito } from '../../../shared/data-models/circuito/circuito';
import { DecisionesLaboratorio } from '../../../shared/enums/enums';


describe('DesplegableDecisionLaboratorioComponent', () => {
  let component: DesplegableDecisionLaboratorioComponent;
  let fixture: ComponentFixture<DesplegableDecisionLaboratorioComponent>;
  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ DesplegableDecisionLaboratorioComponent ],
      imports: [ TestModule ],
        schemas: [ NO_ERRORS_SCHEMA ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesplegableDecisionLaboratorioComponent);
    component = fixture.componentInstance;
    component.AprobarActivado = false;
    component.RechazarActivado = false;
    component.ReCalarActivado = false;
    component.form = new FormGroup({});
    spyOn(component.form, 'get').and.returnValue(new FormControl({id: '', descripcion: ''}));
});

function setDecision(decisionLaboratorio: number) {
    const decision = component.form.get('decision');
    if (decision) {
      decision.setValue({
          id: decisionLaboratorio
      });
    }
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('El metodo ngOnInit', () => {

    beforeEach(() => {
        spyOn<any>(component, 'getAccionesHabilitadas');
        spyOn<any>(component, 'subscribeDecisionLaboratorio').and.returnValue(of(''));
    });

    it('Invoca al metodo getAccionesHabilitadas', () => {
        // Arrange

        // Act
        component.ngOnInit();
        // Assert
        expect(component['getAccionesHabilitadas']).toHaveBeenCalledTimes(1);
    });

    it('Invoca al metodo subscribeDecisionLaboratorio', () => {
        // Arrange

        // Act
        component.ngOnInit();
        // Assert
        expect(component['subscribeDecisionLaboratorio']).toHaveBeenCalledTimes(1);
    });
  });

describe('El metodo getAccionesHabilitadas', () => {
    const circuito = new Circuito();
    beforeEach(() => {
        spyOn(circuito, 'debeActivarCaracteristica').and.returnValue(false);
        component.accionesHabilitadas = [
            {
              accion: 'AprobarActivado',
              activada: false
            }, {
              accion: 'RechazarActivado',
              activada: false
            }, {
              accion: 'ReCalarActivado',
              activada: false
            }
          ];
    });

    it('No habilita la decision aprobar cuando la lista accionesHabilitadas no tiene la acción Aprobar', () => {
        // Arrange

        // Act
        component['getAccionesHabilitadas']();
        // Assert
        expect(component.AprobarActivado).toEqual(false);
    });

    it('No habilita la decision Rechazar cuando la lista accionesHabilitadas no tiene la acción Rechazar', () => {
        // Arrange

        // Act
        component['getAccionesHabilitadas']();
        // Assert
        expect(component.RechazarActivado).toEqual(false);
    });

    it('No habilita la decision ReCalar cuando la lista accionesHabilitadas no tiene la acción ReCalar', () => {
        // Arrange

        // Act
        component['getAccionesHabilitadas']();
        // Assert
        expect(component.ReCalarActivado).toEqual(false);
    });

    it('Habilita la decision Aprobado cuando la lista accionesHabilitadas tiene la acción Aprobado', () => {
        // Arrange
        component.accionesHabilitadas.find(e => e.accion === 'AprobarActivado').activada = true;
        // Act
        component['getAccionesHabilitadas']();
        // Assert
        expect(component.AprobarActivado).toEqual(true);
    });

    it('Habilita la decision Rechazar cuando la lista accionesHabilitadas tiene la acción Rechazar', () => {
        // Arrange
        component.accionesHabilitadas.find(e => e.accion === 'RechazarActivado').activada = true;
        // Act
        component['getAccionesHabilitadas']();
        // Assert
        expect(component.RechazarActivado).toEqual(true);
    });

    it('Habilita la decision reCalar cuando la lista accionesHabilitadas tiene la acción reCalar', () => {
        // Arrange
        component.accionesHabilitadas.find(e => e.accion === 'ReCalarActivado').activada = true;
        // Act
        component['getAccionesHabilitadas']();
        // Assert
        expect(component.ReCalarActivado).toEqual(true);
    });
  });

  describe('El metodo getDecisionLaboratorio', () => {
    beforeEach(() => {
        spyOn(component, 'AprobarActivado');
        spyOn(component, 'RechazarActivado');
        spyOn(component, 'ReCalarActivado');
    });

    it('Habilita la decision Aprobado cuando coincide con los filtros enviados', () => {
        // Arrange
        setDecision(DecisionesLaboratorio.Aprobado);
        // Act
        component['getDecisionLaboratorio']();
        // Assert
        expect(component.AprobarActivado).toEqual(true);
    });

    it('Habilita la decision Rechazado cuando coincide con los filtros enviados', () => {
        // Arrange
        setDecision(DecisionesLaboratorio.Rechazado);
        // Act
        component['getDecisionLaboratorio']();
        // Assert
        expect(component.RechazarActivado).toEqual(true);
    });

    it('Habilita la decision reCalar cuando coincide con los filtros enviados', () => {
        // Arrange
        setDecision(DecisionesLaboratorio.ReCalar);
        // Act
        component['getDecisionLaboratorio']();
        // Assert
        expect(component.ReCalarActivado).toEqual(true);
    });

    it('No habilita la decision Aprobado cuando no coincide con los filtros enviados', () => {
        // Arrange
        setDecision(DecisionesLaboratorio.Rechazado);
        // Act
        component['getDecisionLaboratorio']();
        // Assert
        expect(component.AprobarActivado).toEqual(false);
    });

    it('No habilita la decision Rechazado cuando no coincide con los filtros enviados', () => {
        // Arrange
        setDecision(DecisionesLaboratorio.Aprobado);
        // Act
        component['getDecisionLaboratorio']();
        // Assert
        expect(component.RechazarActivado).toEqual(false);
    });

    it('No habilita la decision reCalar cuando no coincide con los filtros enviados', () => {
        // Arrange
        setDecision(DecisionesLaboratorio.Rechazado);
        // Act
        component['getDecisionLaboratorio']();
        // Assert
        expect(component.ReCalarActivado).toEqual(false);
    });

  });
});
