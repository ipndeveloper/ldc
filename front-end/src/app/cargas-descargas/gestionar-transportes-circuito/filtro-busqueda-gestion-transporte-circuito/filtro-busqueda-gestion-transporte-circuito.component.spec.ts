import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configureTestSuite } from '../../../core/mocks/testing';
import { FiltroBusquedaGestionTransporteCircuitoComponent } from './filtro-busqueda-gestion-transporte-circuito.component';

describe('FiltroBusquedaControlComponent', () => {
  let component: FiltroBusquedaGestionTransporteCircuitoComponent;
  let fixture: ComponentFixture<FiltroBusquedaGestionTransporteCircuitoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroBusquedaGestionTransporteCircuitoComponent ],
      schemas: [NO_ERRORS_SCHEMA],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroBusquedaGestionTransporteCircuitoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
