import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AutocompleteIntermediarioFleteComponent } from './autocomplete-intermediario-flete.component';
import { configureTestSuite } from '../../core/mocks/testing';
import { AutocompleteIntermediarioFleteService } from './autocomplete-intermediario-flete.service';
import { TestModule } from '../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AutocompleteIntermediarioFleteComponent', () => {
  let component: AutocompleteIntermediarioFleteComponent;
  let fixture: ComponentFixture<AutocompleteIntermediarioFleteComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [AutocompleteIntermediarioFleteComponent],
      imports: [TestModule],
      providers: [AutocompleteIntermediarioFleteService],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteIntermediarioFleteComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
