import { ComponentFixture, fakeAsync, tick, TestBed } from '@angular/core/testing';
import { FiltroAdministrarTarjetaComponent } from './filtro-administrar-tarjeta.component';
import { configureTestSuite } from '../../../core/mocks/testing';
import { TestModule } from '../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FiltroAdministrarTarjetaComponent', () => {
  let component: FiltroAdministrarTarjetaComponent;
  let fixture: ComponentFixture<FiltroAdministrarTarjetaComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroAdministrarTarjetaComponent ],
      imports: [
        TestModule
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroAdministrarTarjetaComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('El metodo setFocus()', () => {
    beforeEach(() => {
      component.terminal.setFocus = jasmine.createSpy('setFocus');
    });

    it('invoca al metodo setFocus() del DesplegableTerminalComponent', fakeAsync(() => {
      component.setFocus();
      tick(3);
      expect(component.terminal.setFocus).toHaveBeenCalled();
    }));
  });
});
