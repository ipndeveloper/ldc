import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AutocompleteMercadoTerminoComponent } from './autocomplete-mercado-termino.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AutocompleteMercadoTerminoService } from './autocomplete-mercado-termino.service';
import { configureTestSuite } from '../../core/mocks/testing';
import { TestModule } from '../../core/mocks/test.module';

describe('AutocompleteMercadoTerminoComponent', () => {
  let component: AutocompleteMercadoTerminoComponent;
  let fixture: ComponentFixture<AutocompleteMercadoTerminoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [AutocompleteMercadoTerminoComponent],
      imports: [TestModule],
      providers: [AutocompleteMercadoTerminoService],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteMercadoTerminoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
