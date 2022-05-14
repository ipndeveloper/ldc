import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AutocompleteLocalidadComponent } from './autocomplete-localidad.component';
import { configureTestSuite } from '../../core/mocks/testing';
import { TestModule } from '../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AutocompleteLocalidadService } from './autocomplete-localidad.service';

describe('AutocompleteLocalidadComponent', () => {
  let component: AutocompleteLocalidadComponent;
  let fixture: ComponentFixture<AutocompleteLocalidadComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ AutocompleteLocalidadComponent ],
      imports: [TestModule],
      providers: [AutocompleteLocalidadService],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteLocalidadComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
