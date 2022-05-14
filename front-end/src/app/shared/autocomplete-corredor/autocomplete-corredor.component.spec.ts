import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AutocompleteCorredorComponent } from './autocomplete-corredor.component';
import { configureTestSuite } from '../../core/mocks/testing';
import { TestModule } from '../../core/mocks/test.module';
import { AutocompleteCorredorService } from './autocomplete-corredor.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AutocompleteCorredorComponent', () => {
  let component: AutocompleteCorredorComponent;
  let fixture: ComponentFixture<AutocompleteCorredorComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [AutocompleteCorredorComponent],
      imports: [TestModule],
      providers: [AutocompleteCorredorService],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteCorredorComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
