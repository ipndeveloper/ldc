import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleAdministrarPuntosCargaComponent } from './detalle-administrar-puntos-carga.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DetalleAdministrarPuntosCargaComponent', () => {
  let component: DetalleAdministrarPuntosCargaComponent;
  let fixture: ComponentFixture<DetalleAdministrarPuntosCargaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleAdministrarPuntosCargaComponent ],
      imports: [HttpClientTestingModule],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleAdministrarPuntosCargaComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
