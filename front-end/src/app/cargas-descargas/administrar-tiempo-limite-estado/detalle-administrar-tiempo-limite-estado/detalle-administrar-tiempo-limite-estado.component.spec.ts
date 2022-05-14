import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleAdministrarTiempoLimiteEstadoComponent } from './detalle-administrar-tiempo-limite-estado.component';
import { configureTestSuite } from '../../../core/mocks/testing';
import { TestModule } from '../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DetalleAdministrarTiempoLimiteEstadoComponent', () => {
  let component: DetalleAdministrarTiempoLimiteEstadoComponent;
  let fixture: ComponentFixture<DetalleAdministrarTiempoLimiteEstadoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleAdministrarTiempoLimiteEstadoComponent],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleAdministrarTiempoLimiteEstadoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
