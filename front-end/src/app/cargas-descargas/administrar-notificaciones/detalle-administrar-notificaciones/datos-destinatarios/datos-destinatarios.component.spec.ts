import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosDestinatariosComponent } from './datos-destinatarios.component';
import { FormBuilder } from '@angular/forms';
import { configureTestSuite } from '../../../../core/mocks/testing';
import { TestModule } from '../../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ApiService } from '../../../../core/services/restClient/api.service';
import { of } from 'rxjs';

describe('DatosDestinatariosComponent', () => {
  let component: DatosDestinatariosComponent;
  let fixture: ComponentFixture<DatosDestinatariosComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosDestinatariosComponent ],
      imports: [TestModule],
      providers: [FormBuilder],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosDestinatariosComponent);
    component = fixture.componentInstance;

    const apiService = fixture.debugElement.injector.get(ApiService);
    spyOn(apiService, 'get').and.returnValue(of([{} as any]));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
