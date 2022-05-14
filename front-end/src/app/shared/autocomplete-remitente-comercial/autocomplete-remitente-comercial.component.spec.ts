import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AutocompleteRemitenteComercialComponent } from './autocomplete-remitente-comercial.component';
import { configureTestSuite } from '../../core/mocks/testing';
import { AutocompleteRemitenteComercialService } from './autocomplete-remitente-comercial.service';
import { TestModule } from '../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AutocompleteRemitenteComercialComponent', () => {
  let component: AutocompleteRemitenteComercialComponent;
  let fixture: ComponentFixture<AutocompleteRemitenteComercialComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [AutocompleteRemitenteComercialComponent],
      imports: [TestModule],
      providers: [AutocompleteRemitenteComercialService],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteRemitenteComercialComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
