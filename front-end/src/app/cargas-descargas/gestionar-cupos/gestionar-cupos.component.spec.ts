import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GestionarCuposComponent } from './gestionar-cupos.component';
import { configureTestSuite } from '../../core/mocks/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdenesCargaService } from '../gestionar-ordenes-carga/ordenes-carga.service';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { NavigationService } from '../../core/services/navigationService/navigation.service';
import { TestModule } from '../../core/mocks/test.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import { CircuitoService } from '../shared/services/circuito.service';
import { EstadoMovimientoService } from '../../shared/desplegable-estado-movimiento/estado-movimiento.service';
import { MovimientoService } from '../shared/services/movimiento.service';
import { PageStateService } from '../../core/services/pageStateService/page-state.service';
import { TipoDocumentoPorteService } from '../shared/desplegable-tipo-documento-porte/tipo-documento-porte.service';

export const MockRoutes: Routes = [
  {
      path: '',
      component: GestionarCuposComponent,
      data: {
          title: 'GestionarCuposComponent'
      },
      pathMatch: 'full'
  }
];

describe('GestionarCuposComponent', () => {
  let component: GestionarCuposComponent;
  let fixture: ComponentFixture<GestionarCuposComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        GestionarCuposComponent,
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        OrdenesCargaService,
        SearchFormActionsNotifierService,
        ExcelService,
        NavigationService,
        CircuitoService,
        MovimientoService,
        EstadoMovimientoService,
        PageStateService,
        TipoDocumentoPorteService
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
    fixture = TestBed.createComponent(GestionarCuposComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
