import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesplegableAccionComponent } from './desplegable-accion.component';
import { DesplegableAccionService } from './desplegable-accion.service';
import { TestModule } from '../../core/mocks/test.module';
import { configureTestSuite } from '../../core/mocks/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

describe('DesplegableAccionComponent', () => {
  let component: DesplegableAccionComponent;
  let fixture: ComponentFixture<DesplegableAccionComponent>;
  let service: DesplegableAccionService;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [DesplegableAccionComponent],
      imports: [TestModule],
      providers: [DesplegableAccionService],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesplegableAccionComponent);
    component = fixture.componentInstance;

    service = TestBed.get(DesplegableAccionService);
    spyOn(service, 'getAll').and.returnValue(of([{}]));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('El metodo dataBind', () => {
    it('invoca al metodo getAll del service', () => {
      // Arrange

      // Act
      component['databind']();

      // Assert
      expect(service.getAll).toHaveBeenCalledTimes(1);
    });

    it('setea las entities del componente lo que devuelve el service', () => {
      // Arrange

      // Act
      component['databind']();

      // Assert
      expect(component.entities).toEqual([{} as any]);
    });
  });
});
