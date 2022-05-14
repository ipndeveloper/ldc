import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { FiltroAdministrarImpresorasComponent } from './filtro-administrar-impresoras.component';
import { TestModule } from '../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { configureTestSuite } from '../../../core/mocks/testing';

describe('FiltroAdministrarImpresorasComponent', () => {
  let component: FiltroAdministrarImpresorasComponent;
  let fixture: ComponentFixture<FiltroAdministrarImpresorasComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroAdministrarImpresorasComponent ],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroAdministrarImpresorasComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('El metodo setFocus()', () => {
    beforeEach(() => {
      component.habilitado.setFocus = jasmine.createSpy('setFocus');
    });

    it('invoca al metodo setFocus() del DesplegableTerminalComponent', fakeAsync(() => {
      component.setFocus();
      tick(3);
      expect(component.habilitado.setFocus).toHaveBeenCalled();
    }));
  });
});
