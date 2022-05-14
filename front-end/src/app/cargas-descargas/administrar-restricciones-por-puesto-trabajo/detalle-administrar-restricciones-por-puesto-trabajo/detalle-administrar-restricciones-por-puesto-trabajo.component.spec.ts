import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleAdministrarRestriccionesPorPuestoTrabajoComponent } from './detalle-administrar-restricciones-por-puesto-trabajo.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ApiService } from '../../../core/services/restClient/api.service';
import { HttpClientModule } from '@angular/common/http';
import { TestModule } from '../../../core/mocks/test.module';

describe('DetalleAdministrarRestriccionesPorPuestoTrabajoComponent', () => {
  let component: DetalleAdministrarRestriccionesPorPuestoTrabajoComponent;
  let fixture: ComponentFixture<DetalleAdministrarRestriccionesPorPuestoTrabajoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleAdministrarRestriccionesPorPuestoTrabajoComponent ],
      imports: [
        TestModule,
        HttpClientModule
      ],
      providers: [ApiService],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleAdministrarRestriccionesPorPuestoTrabajoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
