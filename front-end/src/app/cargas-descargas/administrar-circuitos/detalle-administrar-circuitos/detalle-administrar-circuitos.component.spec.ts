import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleAdministrarCircuitosComponent } from './detalle-administrar-circuitos.component';
import { configureTestSuite } from '../../../core/mocks/testing';
import { TestModule } from '../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FinalidadService } from '../../../shared/desplegable-finalidad/finalidad.service';
import { MotivoErrorBalanzaService } from './motivo-error-balanza.service';

describe('DetalleAdministrarCircuitosComponent', () => {
  let component: DetalleAdministrarCircuitosComponent;
  let fixture: ComponentFixture<DetalleAdministrarCircuitosComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleAdministrarCircuitosComponent ],
      imports: [TestModule],
      providers: [
        FinalidadService,
        MotivoErrorBalanzaService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleAdministrarCircuitosComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
