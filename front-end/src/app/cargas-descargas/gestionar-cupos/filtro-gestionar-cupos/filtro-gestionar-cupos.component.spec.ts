import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroGestionarCuposComponent } from './filtro-gestionar-cupos.component';
import { configureTestSuite } from '../../../core/mocks/testing';
import { TestModule } from '../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FiltroGestionarCuposComponent', () => {
  let component: FiltroGestionarCuposComponent;
  let fixture: ComponentFixture<FiltroGestionarCuposComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        FiltroGestionarCuposComponent,
      ],
      imports: [
        TestModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroGestionarCuposComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
