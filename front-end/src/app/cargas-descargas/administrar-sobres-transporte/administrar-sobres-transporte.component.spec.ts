import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarSobresTransporteComponent } from './administrar-sobres-transporte.component';
import { configureTestSuite } from '../../core/mocks/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestModule } from '../../core/mocks/test.module';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { AdministrarSobresTransporteService } from './administrar-sobres-transporte.service';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';

describe('AdministrarSobresTransporteComponent', () => {
  let component: AdministrarSobresTransporteComponent;
  let fixture: ComponentFixture<AdministrarSobresTransporteComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarSobresTransporteComponent ],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        SearchFormActionsNotifierService,
        AdministrarSobresTransporteService,
        FormComponentService
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarSobresTransporteComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
