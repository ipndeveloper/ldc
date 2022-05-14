import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarOrdenesCargaComponent } from './gestionar-ordenes-carga.component';
import { configureTestSuite } from '../../core/mocks/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { OrdenesCargaService } from './ordenes-carga.service';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { NavigationService } from '../../core/services/navigationService/navigation.service';
import { TestModule } from '../../core/mocks/test.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

export const MockRoutes: Routes = [
  {
      path: '',
      component: GestionarOrdenesCargaComponent,
      data: {
          title: 'GestionarOrdenesCarga'
      },
      pathMatch: 'full'
  }
];

describe('GestionarOrdenesCargaComponent', () => {
  let component: GestionarOrdenesCargaComponent;
  let fixture: ComponentFixture<GestionarOrdenesCargaComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        GestionarOrdenesCargaComponent,
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        OrdenesCargaService,
        SearchFormActionsNotifierService,
        ExcelService,
        NavigationService
      ],
      imports: [
        TestModule,
        NgbModule,
        RouterModule,
        RouterTestingModule.withRoutes(MockRoutes),
      ],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarOrdenesCargaComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
