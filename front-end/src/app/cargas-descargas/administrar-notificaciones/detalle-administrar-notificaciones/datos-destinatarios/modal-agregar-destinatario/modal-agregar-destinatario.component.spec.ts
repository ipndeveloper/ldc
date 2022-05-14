import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgregarDestinatarioComponent } from './modal-agregar-destinatario.component';
import { configureTestSuite } from '../../../../../core/mocks/testing';
import { TestModule } from '../../../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ApiService } from '../../../../../core/services/restClient/api.service';
import { of } from 'rxjs';

describe('ModalAgregarDestinatarioComponent', () => {
  let component: ModalAgregarDestinatarioComponent;
  let fixture: ComponentFixture<ModalAgregarDestinatarioComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAgregarDestinatarioComponent ],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAgregarDestinatarioComponent);
    component = fixture.componentInstance;

    const apiService = fixture.debugElement.injector.get(ApiService);
    spyOn(apiService, 'get').and.returnValue(of([{} as any]));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
