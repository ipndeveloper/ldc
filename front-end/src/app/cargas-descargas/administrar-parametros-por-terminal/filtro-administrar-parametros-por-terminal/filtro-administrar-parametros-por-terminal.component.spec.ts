import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FiltroAdministrarParametrosPorTerminalComponent } from './filtro-administrar-parametros-por-terminal.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { configureTestSuite } from '../../../core/mocks/testing';
import { TestModule } from '../../../core/mocks/test.module';

describe('FiltroAdministrarParametrosPorTerminalComponent', () => {
  let component: FiltroAdministrarParametrosPorTerminalComponent;
  let fixture: ComponentFixture<FiltroAdministrarParametrosPorTerminalComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [FiltroAdministrarParametrosPorTerminalComponent],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroAdministrarParametrosPorTerminalComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
