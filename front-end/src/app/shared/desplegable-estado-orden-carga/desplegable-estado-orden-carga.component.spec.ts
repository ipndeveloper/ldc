import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesplegableEstadoOrdenCargaComponent } from './desplegable-estado-orden-carga.component';
import { DesplegableEstadoOrdenCargaService } from './desplegable-estado-orden-carga.service';
import { configureTestSuite } from '../../core/mocks/testing';
import { TestModule } from '../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

describe('DesplegableEstadoOrdenCargaComponent', () => {
  let component: DesplegableEstadoOrdenCargaComponent;
  let fixture: ComponentFixture<DesplegableEstadoOrdenCargaComponent>;
  let service: DesplegableEstadoOrdenCargaService;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [DesplegableEstadoOrdenCargaComponent],
      imports: [TestModule],
      providers: [DesplegableEstadoOrdenCargaService],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesplegableEstadoOrdenCargaComponent);
    component = fixture.componentInstance;

    service = fixture.debugElement.injector.get(DesplegableEstadoOrdenCargaService);
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
