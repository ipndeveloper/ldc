import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configureTestSuite } from '../../../core/mocks/testing';
import { DetalleAdministrarFinalidadesEnvioPdfTicketBalanzaComponent } from './detalle-administrar-finalidades-envio-pdf-ticket-balanza.component';

describe('DetalleAdministrarFinalidadesEnvioPdfTicketBalanzaComponent', () => {
  let component: DetalleAdministrarFinalidadesEnvioPdfTicketBalanzaComponent;
  let fixture: ComponentFixture<DetalleAdministrarFinalidadesEnvioPdfTicketBalanzaComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleAdministrarFinalidadesEnvioPdfTicketBalanzaComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleAdministrarFinalidadesEnvioPdfTicketBalanzaComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
