import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleAdministrarTipoDocumentoPorteTipoProductoComponent } from './detalle-administrar-tipo-documento-porte-tipo-producto.component';
import { configureTestSuite } from '../../../core/mocks/testing';
import { TestModule } from '../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DetalleAdministrarTipoDocumentoPorteTipoProductoComponent', () => {
  let component: DetalleAdministrarTipoDocumentoPorteTipoProductoComponent;
  let fixture: ComponentFixture<DetalleAdministrarTipoDocumentoPorteTipoProductoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleAdministrarTipoDocumentoPorteTipoProductoComponent ],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleAdministrarTipoDocumentoPorteTipoProductoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
