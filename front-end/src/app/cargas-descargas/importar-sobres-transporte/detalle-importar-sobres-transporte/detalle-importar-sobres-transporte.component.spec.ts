import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleImportarSobresTransporteComponent } from './detalle-importar-sobres-transporte.component';
import { configureTestSuite } from '../../../core/mocks/testing';
import { TestModule } from '../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DetalleImportarSobresTransporteComponent', () => {
  let component: DetalleImportarSobresTransporteComponent;
  let fixture: ComponentFixture<DetalleImportarSobresTransporteComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleImportarSobresTransporteComponent ],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleImportarSobresTransporteComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
