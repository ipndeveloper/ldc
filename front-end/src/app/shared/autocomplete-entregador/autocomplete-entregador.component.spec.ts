import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AutocompleteEntregadorComponent } from './autocomplete-entregador.component';
import { configureTestSuite } from '../../core/mocks/testing';
import { AutocompleteEntregadorService } from './autocomplete-entregador.service';
import { TestModule } from '../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AutocompleteEntregadorComponent', () => {
  let component: AutocompleteEntregadorComponent;
  let fixture: ComponentFixture<AutocompleteEntregadorComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [AutocompleteEntregadorComponent],
      imports: [TestModule],
      providers: [AutocompleteEntregadorService],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteEntregadorComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
