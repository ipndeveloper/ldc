import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImportarSobresTransporteComponent } from './importar-sobres-transporte.component';
import { configureTestSuite } from '../../core/mocks/testing';
import { TestModule } from '../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ImportarSobresTransporteService } from './importar-sobres-transporte.service';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';

describe('ImportarSobresTransporteComponent', () => {
  let component: ImportarSobresTransporteComponent;
  let fixture: ComponentFixture<ImportarSobresTransporteComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportarSobresTransporteComponent ],
      imports: [TestModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        ImportarSobresTransporteService,
        SearchFormActionsNotifierService,
        FormComponentService
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportarSobresTransporteComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
