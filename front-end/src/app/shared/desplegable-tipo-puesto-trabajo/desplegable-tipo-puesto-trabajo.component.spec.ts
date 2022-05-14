import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesplegableTipoPuestoTrabajoComponent } from './desplegable-tipo-puesto-trabajo.component';
import { TipoPuestoTrabajoService } from './desplegable-tipo-puesto-trabajo.service';
import { configureTestSuite } from '../../core/mocks/testing';
import { TestModule } from '../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';


describe('DesplegableTipoPuestoTrabajoComponent', () => {
  let component: DesplegableTipoPuestoTrabajoComponent;
  let fixture: ComponentFixture<DesplegableTipoPuestoTrabajoComponent>;
  let service: TipoPuestoTrabajoService;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [DesplegableTipoPuestoTrabajoComponent],
      imports: [TestModule],
      providers: [TipoPuestoTrabajoService],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesplegableTipoPuestoTrabajoComponent);
    component = fixture.componentInstance;

    service = fixture.debugElement.injector.get(TipoPuestoTrabajoService);
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
