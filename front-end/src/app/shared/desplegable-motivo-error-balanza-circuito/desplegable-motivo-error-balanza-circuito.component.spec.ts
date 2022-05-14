import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesplegableMotivoErrorBalanzaCircuitoComponent } from './desplegable-motivo-error-balanza-circuito.component';
import { configureTestSuite } from '../../core/mocks/testing';
import { TestModule } from '../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DesplegableMotivoErrorBalanzaCircuitoComponent', () => {
  let component: DesplegableMotivoErrorBalanzaCircuitoComponent;
  let fixture: ComponentFixture<DesplegableMotivoErrorBalanzaCircuitoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ DesplegableMotivoErrorBalanzaCircuitoComponent ],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesplegableMotivoErrorBalanzaCircuitoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
