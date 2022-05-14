import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CodigoTarjetaConEtiquetaComponent } from './codigo-tarjeta-con-etiqueta.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { configureTestSuite } from '../../../core/mocks/testing';

describe('CodigoTarjetaConEtiquetaComponent', () => {
  let component: CodigoTarjetaConEtiquetaComponent;
  let fixture: ComponentFixture<CodigoTarjetaConEtiquetaComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [CodigoTarjetaConEtiquetaComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodigoTarjetaConEtiquetaComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
