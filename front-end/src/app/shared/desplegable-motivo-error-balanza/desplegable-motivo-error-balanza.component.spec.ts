import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesplegableMotivoErrorBalanzaComponent } from './desplegable-motivo-error-balanza.component';
import { configureTestSuite } from '../../core/mocks/testing';
import { TestModule } from '../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DesplegableMotivoErrorBalanzaComponent', () => {
  let component: DesplegableMotivoErrorBalanzaComponent;
  let fixture: ComponentFixture<DesplegableMotivoErrorBalanzaComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ DesplegableMotivoErrorBalanzaComponent ],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesplegableMotivoErrorBalanzaComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
