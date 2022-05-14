import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AutocompleteIntermediarioComponent } from './autocomplete-intermediario.component';
import { configureTestSuite } from '../../core/mocks/testing';
import { AutocompleteIntermediarioService } from './autocomplete-intermediario.service';
import { TestModule } from '../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AutocompleteIntermediarioComponent', () => {
  let component: AutocompleteIntermediarioComponent;
  let fixture: ComponentFixture<AutocompleteIntermediarioComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [AutocompleteIntermediarioComponent],
      imports: [TestModule],
      providers: [AutocompleteIntermediarioService],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteIntermediarioComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
