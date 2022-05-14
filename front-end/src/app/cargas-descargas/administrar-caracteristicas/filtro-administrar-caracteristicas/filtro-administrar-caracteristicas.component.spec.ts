import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroAdministrarCaracteristicasComponent } from './filtro-administrar-caracteristicas.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FiltroAdministrarCaracteristicasComponent', () => {
  let component: FiltroAdministrarCaracteristicasComponent;
  let fixture: ComponentFixture<FiltroAdministrarCaracteristicasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroAdministrarCaracteristicasComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroAdministrarCaracteristicasComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
