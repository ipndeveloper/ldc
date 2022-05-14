import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdministrarParametrosPorTerminalComponent } from './administrar-parametros-por-terminal.component';
import { TestModule } from '../../core/mocks/test.module';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { configureTestSuite } from '../../core/mocks/testing';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { ExcelService } from '../../core/services/excelService/excel.service';

describe('AdministrarParametrosPorTerminalComponent', () => {
  let component: AdministrarParametrosPorTerminalComponent;
  let fixture: ComponentFixture<AdministrarParametrosPorTerminalComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [AdministrarParametrosPorTerminalComponent],
      imports: [
        TestModule,
        RouterModule,
        RouterTestingModule,
      ],
      providers: [
        FormComponentService,
        SearchFormActionsNotifierService,
        ExcelService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarParametrosPorTerminalComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
