import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleAdministrarLecturaHumedimetroComponent } from './detalle-administrar-lectura-humedimetro.component';
import { configureTestSuite } from '../../../core/mocks/testing';
import { TestModule } from '../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RubrosCalidadService } from '../../ingresar-calidad-calado/rubros-calidad/rubros-calidad.service';

describe('DetalleAdministrarLecturaHumedimetroComponent', () => {
  let component: DetalleAdministrarLecturaHumedimetroComponent;
  let fixture: ComponentFixture<DetalleAdministrarLecturaHumedimetroComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleAdministrarLecturaHumedimetroComponent ],
      imports: [TestModule],
      providers: [ RubrosCalidadService ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleAdministrarLecturaHumedimetroComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
