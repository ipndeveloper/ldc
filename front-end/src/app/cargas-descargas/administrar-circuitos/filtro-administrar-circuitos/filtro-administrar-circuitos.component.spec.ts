import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroAdministrarCircuitosComponent } from './filtro-administrar-circuitos.component';
import { configureTestSuite } from '../../../core/mocks/testing';
import { TestModule } from '../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FiltroAdministrarCircuitosComponent', () => {
  let component: FiltroAdministrarCircuitosComponent;
  let fixture: ComponentFixture<FiltroAdministrarCircuitosComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroAdministrarCircuitosComponent ],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroAdministrarCircuitosComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
