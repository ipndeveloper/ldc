import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgregarDispositivoComponent } from './modal-agregar-dispositivo.component';
import { TestModule } from '../../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { configureTestSuite } from '../../../../core/mocks/testing';
import { ApiService } from '../../../../core/services/restClient/api.service';
import { of } from 'rxjs';

describe('ModalAgregarDispositivoComponent', () => {
  let component: ModalAgregarDispositivoComponent;
  let fixture: ComponentFixture<ModalAgregarDispositivoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAgregarDispositivoComponent ],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAgregarDispositivoComponent);
    component = fixture.componentInstance;

    const apiService = fixture.debugElement.injector.get(ApiService);
    spyOn(apiService, 'get').and.returnValue(of([{} as any]));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
