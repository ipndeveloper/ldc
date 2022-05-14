import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesplegableTerminalComponent } from './desplegable-terminal.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { configureTestSuite } from '../../core/mocks/testing';
import { TestModule } from '../../core/mocks/test.module';
import { of } from 'rxjs';
import { TerminalService } from '../desplegable-terminal-login/terminal.service';

describe('DesplegableTerminalComponent', () => {
  let component: DesplegableTerminalComponent;
  let fixture: ComponentFixture<DesplegableTerminalComponent>;
  let service: TerminalService;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [DesplegableTerminalComponent],
      imports: [TestModule],
      providers: [TerminalService],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesplegableTerminalComponent);
    component = fixture.componentInstance;

    service = fixture.debugElement.injector.get(TerminalService);
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
