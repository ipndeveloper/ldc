import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiselectVariableTemplateComponent } from './multiselect-variable-template.component';
import { configureTestSuite } from '../../core/mocks/testing';
import { TestModule } from '../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { VariableTemplateService } from './variable-template.service';
import { ApiService } from '../../core/services/restClient/api.service';
import { of } from 'rxjs';

describe('MultiselectVariableTemplateComponent', () => {
  let component: MultiselectVariableTemplateComponent;
  let fixture: ComponentFixture<MultiselectVariableTemplateComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiselectVariableTemplateComponent ],
      imports: [TestModule],
      providers: [VariableTemplateService],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiselectVariableTemplateComponent);
    component = fixture.componentInstance;

    const apiService = fixture.debugElement.injector.get(ApiService);
    spyOn(apiService, 'get').and.returnValue(of([{} as any]));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
