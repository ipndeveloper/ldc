import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroAdministrarRestriccionesPorPuestoTrabajoComponent } from './filtro-administrar-restricciones-por-puesto-trabajo.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ApiService } from '../../../core/services/restClient/api.service';
import { TestModule } from '../../../core/mocks/test.module';
import { HttpClientModule } from '@angular/common/http';

describe('FiltroAdministrarRestriccionesPorPuestoTrabajoComponent', () => {
  let component: FiltroAdministrarRestriccionesPorPuestoTrabajoComponent;
  let fixture: ComponentFixture<FiltroAdministrarRestriccionesPorPuestoTrabajoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroAdministrarRestriccionesPorPuestoTrabajoComponent ],
      imports: [
        TestModule,
        HttpClientModule
      ],
      providers: [ApiService],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroAdministrarRestriccionesPorPuestoTrabajoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
