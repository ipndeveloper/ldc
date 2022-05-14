import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesplegableDispositivoComponent } from './desplegable-dispositivo.component';
import { DesplegableDispositivoService } from './desplegable-dispositivo.service';
import { configureTestSuite } from '../../core/mocks/testing';
import { of } from 'rxjs';
import { TestModule } from '../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DesplegableDispositivoComponent', () => {
  let component: DesplegableDispositivoComponent;
  let fixture: ComponentFixture<DesplegableDispositivoComponent>;
  let service: DesplegableDispositivoService;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [DesplegableDispositivoComponent],
      imports: [TestModule],
      providers: [DesplegableDispositivoService],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesplegableDispositivoComponent);
    component = fixture.componentInstance;

    service = fixture.debugElement.injector.get(DesplegableDispositivoService);
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
