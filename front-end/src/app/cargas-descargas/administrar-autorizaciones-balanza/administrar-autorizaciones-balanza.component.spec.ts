import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarAutorizacionesBalanzaComponent } from './administrar-autorizaciones-balanza.component';
import { configureTestSuite } from '../../core/mocks/testing';
import { TestModule } from '../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { FormBuilder } from '@angular/forms';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { AdministrarAutorizacionesBalanzaService } from './administrar-autorizaciones-balanza.service';

describe('AdministrarAutorizacionesBalanzaComponent', () => {
  let component: AdministrarAutorizacionesBalanzaComponent;
  let fixture: ComponentFixture<AdministrarAutorizacionesBalanzaComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarAutorizacionesBalanzaComponent ],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        AdministrarAutorizacionesBalanzaService,
        SearchFormActionsNotifierService,
        FormBuilder,
        FormComponentService
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarAutorizacionesBalanzaComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
