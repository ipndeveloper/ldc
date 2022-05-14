import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleAdministrarRolesComponent } from './detalle-administrar-roles.component';
import { TestModule } from '../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { configureTestSuite } from '../../../core/mocks/testing';
import { PermisoService } from './permiso.service';

describe('DetalleAdministrarRolesComponent', () => {
  let component: DetalleAdministrarRolesComponent;
  let fixture: ComponentFixture<DetalleAdministrarRolesComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleAdministrarRolesComponent ],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [PermisoService]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleAdministrarRolesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
