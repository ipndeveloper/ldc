import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroAdministrarProductosHabilitadosPorTerminalComponent } from './filtro-administrar-productos-habilitados-por-terminal.component';
import { TestModule } from '../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FiltroAdministrarProductosHabilitadosPorTerminalComponent', () => {
  let component: FiltroAdministrarProductosHabilitadosPorTerminalComponent;
  let fixture: ComponentFixture<FiltroAdministrarProductosHabilitadosPorTerminalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroAdministrarProductosHabilitadosPorTerminalComponent ],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroAdministrarProductosHabilitadosPorTerminalComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
