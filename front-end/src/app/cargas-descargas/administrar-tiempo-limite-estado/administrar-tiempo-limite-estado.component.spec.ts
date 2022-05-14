import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdministrarTiempoLimiteEstadoComponent } from './administrar-tiempo-limite-estado.component';
import { TestModule } from '../../core/mocks/test.module';
import { configureTestSuite } from '../../core/mocks/testing';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { ConfirmationService } from '@jaspero/ng-confirmations';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AdministrarTiempoLimiteEstadoService } from './administrar-tiempo-limite-estado.service';

describe('AdministrarTiempoLimiteEstadoComponent', () => {
  let component: AdministrarTiempoLimiteEstadoComponent;
  let fixture: ComponentFixture<AdministrarTiempoLimiteEstadoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [AdministrarTiempoLimiteEstadoComponent],
      imports: [TestModule],
      providers: [
        FormComponentService,
        SearchFormActionsNotifierService,
        ExcelService,
        ConfirmationService,
        AdministrarTiempoLimiteEstadoService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarTiempoLimiteEstadoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
