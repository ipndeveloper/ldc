import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalConfirmarImpresionComponent } from './modal-confirmar-impresion.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { configureTestSuite } from '../../../../core/mocks/testing';

describe('ModalConfirmarImpresionComponent', () => {
  let component: ModalConfirmarImpresionComponent;
  let fixture: ComponentFixture<ModalConfirmarImpresionComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ModalConfirmarImpresionComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalConfirmarImpresionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
