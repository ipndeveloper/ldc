import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FiltroAdministrarTiempoLimiteEstadoComponent } from './filtro-administrar-tiempo-limite-estado.component';
import { configureTestSuite } from '../../../core/mocks/testing';
import { TestModule } from '../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FiltroAdministrarTiempoLimiteEstadoComponent', () => {
  let component: FiltroAdministrarTiempoLimiteEstadoComponent;
  let fixture: ComponentFixture<FiltroAdministrarTiempoLimiteEstadoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [FiltroAdministrarTiempoLimiteEstadoComponent],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroAdministrarTiempoLimiteEstadoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
