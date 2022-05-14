import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroAdministrarChoferesComponent } from './filtro-administrar-choferes.component';
import { configureTestSuite } from '../../../core/mocks/testing';
import { TestModule } from '../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FiltroAdministrarChoferesComponent', () => {
  let component: FiltroAdministrarChoferesComponent;
  let fixture: ComponentFixture<FiltroAdministrarChoferesComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroAdministrarChoferesComponent ],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroAdministrarChoferesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
