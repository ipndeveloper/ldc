import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleAdministrarGrupoProductoComponent } from './detalle-administrar-grupo-producto.component';
import { configureTestSuite } from '../../../core/mocks/testing';
import { TestModule } from '../../../core/mocks/test.module';
import { AdministrarGrupoProductoService } from '../administrar-grupo-producto.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ProductoService } from '../../../shared/buscador-producto/producto.service';

describe('DetalleAdministrarGrupoProductoComponent', () => {
  let component: DetalleAdministrarGrupoProductoComponent;
  let fixture: ComponentFixture<DetalleAdministrarGrupoProductoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleAdministrarGrupoProductoComponent ],
      imports: [TestModule],
      providers: [ AdministrarGrupoProductoService, ProductoService ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleAdministrarGrupoProductoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
