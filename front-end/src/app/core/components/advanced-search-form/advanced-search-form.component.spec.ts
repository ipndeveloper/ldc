import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedSearchFormComponent } from './advanced-search-form.component';
import { EntityWithCode } from '../../models/entity-with-code';
import { configureTestSuite } from '../../mocks/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestModule } from '../../mocks/test.module';

describe('AdvancedSearchFormComponent', () => {
  let component: AdvancedSearchFormComponent<TestClass>;
  let fixture: ComponentFixture<AdvancedSearchFormComponent<TestClass>>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvancedSearchFormComponent ],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancedSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class TestClass extends EntityWithCode { }
