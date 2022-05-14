import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesplegableRolComponent } from './desplegable-rol.component';
import { configureTestSuite } from '../../core/mocks/testing';
import { TestModule } from '../../core/mocks/test.module';
import { TipoNotificacionService } from '../desplegable-tipo-notificacion/tipo-notificacion.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ApiService } from '../../core/services/restClient/api.service';
import { of } from 'rxjs';

describe('DesplegableRolComponent', () => {
  let component: DesplegableRolComponent;
  let fixture: ComponentFixture<DesplegableRolComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ DesplegableRolComponent ],
      imports: [TestModule],
      providers: [TipoNotificacionService],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesplegableRolComponent);
    component = fixture.componentInstance;

    const apiService = fixture.debugElement.injector.get(ApiService);
    spyOn(apiService, 'get').and.returnValue(of([{} as any]));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
