import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FiltroAdministrarTipoDocumentoPorteTipoProductoComponent } from './filtro-administrar-tipo-documento-porte-tipo-producto.component';
import { configureTestSuite } from '../../../core/mocks/testing';
import { TestModule } from '../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FiltroAdministrarTipoDocumentoPorteTipoProductoComponent', () => {
  let component: FiltroAdministrarTipoDocumentoPorteTipoProductoComponent;
  let fixture: ComponentFixture<FiltroAdministrarTipoDocumentoPorteTipoProductoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroAdministrarTipoDocumentoPorteTipoProductoComponent ],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroAdministrarTipoDocumentoPorteTipoProductoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
