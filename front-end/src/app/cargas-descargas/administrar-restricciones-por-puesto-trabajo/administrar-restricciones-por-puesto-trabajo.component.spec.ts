import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarRestriccionesPorPuestoTrabajoComponent } from './administrar-restricciones-por-puesto-trabajo.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestModule } from '../../core/mocks/test.module';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';

describe('AdministrarRestriccionesPorPuestoTrabajoComponent', () => {
  let component: AdministrarRestriccionesPorPuestoTrabajoComponent;
  let fixture: ComponentFixture<AdministrarRestriccionesPorPuestoTrabajoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarRestriccionesPorPuestoTrabajoComponent ],
      providers: [SearchFormActionsNotifierService, FormComponentService],
      imports: [
        TestModule
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarRestriccionesPorPuestoTrabajoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
