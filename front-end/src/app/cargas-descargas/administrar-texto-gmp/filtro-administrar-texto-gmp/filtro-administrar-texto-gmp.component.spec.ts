import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configureTestSuite } from '../../../core/mocks/testing';
import { FiltroAdministrarTextoGmpComponent } from './filtro-administrar-texto-gmp.component';

describe('FiltroAdministrarTextoGmpComponent', () => {
  let component: FiltroAdministrarTextoGmpComponent;
  let fixture: ComponentFixture<FiltroAdministrarTextoGmpComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [FiltroAdministrarTextoGmpComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroAdministrarTextoGmpComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
