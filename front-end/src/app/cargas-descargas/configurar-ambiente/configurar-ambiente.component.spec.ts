import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurarAmbienteComponent } from './configurar-ambiente.component';
import { TestModule } from '../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { configureTestSuite } from '../../core/mocks/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { PermisoService } from '../administrar-roles/detalle-administrar-roles/permiso.service';

describe('ConfigurarAmbienteComponent', () => {
  let component: ConfigurarAmbienteComponent;
  let fixture: ComponentFixture<ConfigurarAmbienteComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurarAmbienteComponent ],
      imports: [
        TestModule,
        RouterModule,
        RouterTestingModule,
      ],
      providers: [PermisoService, FormComponentService, SearchFormActionsNotifierService],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurarAmbienteComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
