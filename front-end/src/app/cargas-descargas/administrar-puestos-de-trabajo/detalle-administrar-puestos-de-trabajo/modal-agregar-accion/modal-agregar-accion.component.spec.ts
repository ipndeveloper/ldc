import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgregarAccionComponent } from './modal-agregar-accion.component';
import { configureTestSuite } from '../../../../core/mocks/testing';
import { TestModule } from '../../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ApiService } from '../../../../core/services/restClient/api.service';
import { of } from 'rxjs';

describe('ModalAgregarAccionComponent', () => {
  let component: ModalAgregarAccionComponent;
  let fixture: ComponentFixture<ModalAgregarAccionComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAgregarAccionComponent ],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAgregarAccionComponent);
    component = fixture.componentInstance;

    const apiService = fixture.debugElement.injector.get(ApiService);
    spyOn(apiService, 'get').and.returnValue(of([{} as any]));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
