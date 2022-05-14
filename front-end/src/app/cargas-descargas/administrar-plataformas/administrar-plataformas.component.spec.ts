import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarPlataformasComponent } from './administrar-plataformas.component';
import { TestModule } from '../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';

describe('AdministrarPlataformasComponent', () => {
  let component: AdministrarPlataformasComponent;
  let fixture: ComponentFixture<AdministrarPlataformasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarPlataformasComponent ],
      providers: [SearchFormActionsNotifierService, ExcelService, FormComponentService],
      imports: [TestModule],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarPlataformasComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
