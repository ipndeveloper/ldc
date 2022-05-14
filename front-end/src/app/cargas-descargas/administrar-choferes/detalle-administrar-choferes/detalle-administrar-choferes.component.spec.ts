import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleAdministrarChoferesComponent } from './detalle-administrar-choferes.component';
import { configureTestSuite } from '../../../core/mocks/testing';
import { TestModule } from '../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DetalleAdministrarChoferesComponent', () => {
  let component: DetalleAdministrarChoferesComponent;
  let fixture: ComponentFixture<DetalleAdministrarChoferesComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleAdministrarChoferesComponent ],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleAdministrarChoferesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
