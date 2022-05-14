import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FiltroImportarSobresTransporteComponent } from './filtro-importar-sobres-transporte.component';
import { configureTestSuite } from '../../../core/mocks/testing';
import { TestModule } from '../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FiltroImportarSobresTransporteComponent', () => {
  let component: FiltroImportarSobresTransporteComponent;
  let fixture: ComponentFixture<FiltroImportarSobresTransporteComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroImportarSobresTransporteComponent ],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroImportarSobresTransporteComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
