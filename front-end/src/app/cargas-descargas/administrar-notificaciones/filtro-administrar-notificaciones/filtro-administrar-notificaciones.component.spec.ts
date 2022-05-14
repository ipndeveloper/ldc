import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroAdministrarNotificacionesComponent } from './filtro-administrar-notificaciones.component';
import { configureTestSuite } from '../../../core/mocks/testing';
import { TestModule } from '../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ApiService } from '../../../core/services/restClient/api.service';
import { of } from 'rxjs';

describe('FiltroAdministrarNotificacionesComponent', () => {
  let component: FiltroAdministrarNotificacionesComponent;
  let fixture: ComponentFixture<FiltroAdministrarNotificacionesComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroAdministrarNotificacionesComponent ],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroAdministrarNotificacionesComponent);
    component = fixture.componentInstance;

    const apiService = fixture.debugElement.injector.get(ApiService);
    spyOn(apiService, 'get').and.returnValue(of([{} as any]));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
