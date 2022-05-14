import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AutocompleteDestinatarioComponent } from './autocomplete-destinatario.component';
import { configureTestSuite } from '../../core/mocks/testing';
import { AutocompleteDestinatarioService } from './autocomplete-destinatario.service';
import { TestModule } from '../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AutocompleteDestinatarioComponent', () => {
  let component: AutocompleteDestinatarioComponent;
  let fixture: ComponentFixture<AutocompleteDestinatarioComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [AutocompleteDestinatarioComponent],
      imports: [TestModule],
      providers: [AutocompleteDestinatarioService],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteDestinatarioComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
