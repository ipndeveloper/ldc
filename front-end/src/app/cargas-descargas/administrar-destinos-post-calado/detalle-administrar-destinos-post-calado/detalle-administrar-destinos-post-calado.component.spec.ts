import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleAdministrarDestinosPostCaladoComponent } from './detalle-administrar-destinos-post-calado.component';
import { configureTestSuite } from '../../../core/mocks/testing';
import { TestModule } from '../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DetalleAdministrarDestinosPostCaladoComponent', () => {
  let component: DetalleAdministrarDestinosPostCaladoComponent;
  let fixture: ComponentFixture<DetalleAdministrarDestinosPostCaladoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleAdministrarDestinosPostCaladoComponent ],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleAdministrarDestinosPostCaladoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
