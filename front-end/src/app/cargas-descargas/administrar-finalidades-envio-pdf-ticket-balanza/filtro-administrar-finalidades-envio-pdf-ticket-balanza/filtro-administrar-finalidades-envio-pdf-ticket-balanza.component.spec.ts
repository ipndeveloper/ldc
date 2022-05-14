import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configureTestSuite } from '../../../core/mocks/testing';
import { FiltroAdministrarFinalidadesEnvioPdfTicketBalanzaComponent } from './filtro-administrar-finalidades-envio-pdf-ticket-balanza.component';

describe('FiltroAdministrarFinalidadesEnvioPdfTicketBalanzaComponent', () => {
  let component: FiltroAdministrarFinalidadesEnvioPdfTicketBalanzaComponent;
  let fixture: ComponentFixture<FiltroAdministrarFinalidadesEnvioPdfTicketBalanzaComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroAdministrarFinalidadesEnvioPdfTicketBalanzaComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroAdministrarFinalidadesEnvioPdfTicketBalanzaComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
