import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroAdministrarSobresTransporteComponent } from './filtro-administrar-sobres-transporte.component';
import { configureTestSuite } from '../../../core/mocks/testing';
import { TestModule } from '../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FiltroAdministrarSobresTransporteComponent', () => {
  let component: FiltroAdministrarSobresTransporteComponent;
  let fixture: ComponentFixture<FiltroAdministrarSobresTransporteComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroAdministrarSobresTransporteComponent ],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroAdministrarSobresTransporteComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
