import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesplegableTipoNotificacionComponent } from './desplegable-tipo-notificacion.component';
import { configureTestSuite } from '../../core/mocks/testing';
import { TestModule } from '../../core/mocks/test.module';
import { TipoNotificacionService } from './tipo-notificacion.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ApiService } from '../../core/services/restClient/api.service';
import { of } from 'rxjs';

describe('DesplegableTipoNotificacionComponent', () => {
  let component: DesplegableTipoNotificacionComponent;
  let fixture: ComponentFixture<DesplegableTipoNotificacionComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ DesplegableTipoNotificacionComponent ],
      imports: [TestModule],
      providers: [TipoNotificacionService],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesplegableTipoNotificacionComponent);
    component = fixture.componentInstance;

    const apiService = fixture.debugElement.injector.get(ApiService);
    spyOn(apiService, 'get').and.returnValue(of([{} as any]));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
