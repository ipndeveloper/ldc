import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { configureTestSuite } from '../../../core/mocks/testing';
import { TestModule } from '../../../core/mocks/test.module';
import { DetalleAdministrarParametrosPorTerminalComponent } from './detalle-administrar-parametros-por-terminal.component';
import { FormatoPatenteService } from '../../shared/services/formato-patente.service';

describe('DetalleAdministrarParametrosPorTerminalComponent', () => {
  let component: DetalleAdministrarParametrosPorTerminalComponent;
  let fixture: ComponentFixture<DetalleAdministrarParametrosPorTerminalComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleAdministrarParametrosPorTerminalComponent],
      imports: [TestModule],
      providers: [FormatoPatenteService],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleAdministrarParametrosPorTerminalComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
