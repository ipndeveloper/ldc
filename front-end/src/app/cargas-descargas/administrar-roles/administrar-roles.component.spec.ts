import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarRolesComponent } from './administrar-roles.component';
import { configureTestSuite } from '../../core/mocks/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestModule } from '../../core/mocks/test.module';
import { AdministrarRolesService } from './administrar-roles.service';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { FormBuilder } from '@angular/forms';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { PopupService } from '../../core/services/popupService/popup.service';

describe('AdministrarRolesComponent', () => {
  let component: AdministrarRolesComponent;
  let fixture: ComponentFixture<AdministrarRolesComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarRolesComponent ],
      imports: [TestModule],
      providers: [
        AdministrarRolesService,
        SearchFormActionsNotifierService,
        PopupService,
        FormBuilder,
        FormComponentService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarRolesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
