import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FiltroAdministrarActividadesCircuitoComponent } from './filtro-administrar-actividades-circuito.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { configureTestSuite } from '../../../core/mocks/testing';

describe('FiltroAdministrarActividadesCircuitoComponent', () => {
  let component: FiltroAdministrarActividadesCircuitoComponent;
  let fixture: ComponentFixture<FiltroAdministrarActividadesCircuitoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [FiltroAdministrarActividadesCircuitoComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroAdministrarActividadesCircuitoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
