import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FiltroAdministrarParametrosPorTipoAnalisisCamaraComponent } from './filtro-administrar-parametros-por-tipo-analisis-camara.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FiltroAdministrarParametrosPorTipoAnalisisCamaraComponent', () => {
  let component: FiltroAdministrarParametrosPorTipoAnalisisCamaraComponent;
  let fixture: ComponentFixture<FiltroAdministrarParametrosPorTipoAnalisisCamaraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FiltroAdministrarParametrosPorTipoAnalisisCamaraComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroAdministrarParametrosPorTipoAnalisisCamaraComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
