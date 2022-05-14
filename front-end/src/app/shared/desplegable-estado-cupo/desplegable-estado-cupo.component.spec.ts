import {  ComponentFixture, TestBed } from '@angular/core/testing';
import { DesplegableEstadoCupoComponent } from './desplegable-estado-cupo.component';
import { DesplegableEstadoCupoService } from './desplegable-estado-cupo.service';
import { TestModule } from '../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { configureTestSuite } from '../../core/mocks/testing';

describe('DesplegableEstadoCupoComponent', () => {
  let component: DesplegableEstadoCupoComponent;
  let fixture: ComponentFixture<DesplegableEstadoCupoComponent>;
  let service: DesplegableEstadoCupoService;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [DesplegableEstadoCupoComponent],
      imports: [TestModule],
      providers: [DesplegableEstadoCupoService],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesplegableEstadoCupoComponent);
    component = fixture.componentInstance;

    service = fixture.debugElement.injector.get(DesplegableEstadoCupoService);
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

