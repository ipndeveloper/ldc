import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteComponent } from './autocomplete.component';
import { configureTestSuite } from '../../mocks/testing';
import { TestModule } from '../../mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AutocompleteComponent', () => {
  let component: AutocompleteComponent<any>;
  let fixture: ComponentFixture<AutocompleteComponent<any>>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ AutocompleteComponent ],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
