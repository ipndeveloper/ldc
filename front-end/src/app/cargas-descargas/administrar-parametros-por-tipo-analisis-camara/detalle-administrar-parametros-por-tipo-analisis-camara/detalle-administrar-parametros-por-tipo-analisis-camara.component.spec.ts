import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleAdministrarParametrosPorTipoAnalisisCamaraComponent } from './detalle-administrar-parametros-por-tipo-analisis-camara.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DetalleAdministrarParametrosPorTipoAnalisisCamaraComponent', () => {
  let component: DetalleAdministrarParametrosPorTipoAnalisisCamaraComponent;
  let fixture: ComponentFixture<DetalleAdministrarParametrosPorTipoAnalisisCamaraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleAdministrarParametrosPorTipoAnalisisCamaraComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleAdministrarParametrosPorTipoAnalisisCamaraComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
