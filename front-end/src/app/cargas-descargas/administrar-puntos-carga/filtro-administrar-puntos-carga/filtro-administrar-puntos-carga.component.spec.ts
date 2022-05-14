import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FiltroAdministrarPuntosCargaComponent } from './filtro-administrar-puntos-carga.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FiltroAdministrarPuntosCargaComponent', () => {
  let component: FiltroAdministrarPuntosCargaComponent;
  let fixture: ComponentFixture<FiltroAdministrarPuntosCargaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroAdministrarPuntosCargaComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroAdministrarPuntosCargaComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
