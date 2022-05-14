import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AutocompleteChoferComponent } from './autocomplete-chofer.component';
import { configureTestSuite } from '../../core/mocks/testing';
import { TestModule } from '../../core/mocks/test.module';
import { AutocompleteChoferService } from './autocomplete-chofer.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AutocompleteChoferComponent', () => {
  let component: AutocompleteChoferComponent;
  let fixture: ComponentFixture<AutocompleteChoferComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [AutocompleteChoferComponent],
      imports: [TestModule],
      providers: [AutocompleteChoferService],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteChoferComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
