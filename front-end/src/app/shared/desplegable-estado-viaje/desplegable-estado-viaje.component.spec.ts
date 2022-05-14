import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesplegableEstadoViajeComponent } from './desplegable-estado-viaje.component';
import { configureTestSuite } from '../../core/mocks/testing';
import { TestModule } from '../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { DesplegableEstadoViajeService } from './desplegable-estado-viaje.service';

describe('DesplegableEstadoViajeComponent', () => {
  let component: DesplegableEstadoViajeComponent;
  let fixture: ComponentFixture<DesplegableEstadoViajeComponent>;
  let service: DesplegableEstadoViajeService;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [DesplegableEstadoViajeComponent],
      imports: [TestModule],
      providers: [DesplegableEstadoViajeService],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesplegableEstadoViajeComponent);
    component = fixture.componentInstance;

    service = fixture.debugElement.injector.get(DesplegableEstadoViajeService);
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
