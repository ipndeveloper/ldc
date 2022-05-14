import {  ComponentFixture, TestBed } from '@angular/core/testing';
import { GestionarControlComponent } from './gestionar-control.component';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { DropdownNotificationService } from '../../core/shared/super/dropdown-notification.service';
import { CircuitoService } from '../shared/services/circuito.service';
import { NavigationService } from '../../core/services/navigationService/navigation.service';
import { EstadoMovimientoService } from '../../shared/desplegable-estado-movimiento/estado-movimiento.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HotkeyModule } from 'angular2-hotkeys';
import { TestModule } from '../../core/mocks/test.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from '../../core/components/modal/modal.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RouterModule, Routes, NavigationExtras } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchControlService } from './services/search-control.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { MovimientoService } from '../shared/services/movimiento.service';
import { TiposProducto } from '../../shared/enums/enums';
import { configureTestSuite } from '../../core/mocks/testing';
import { PageStateService } from '../../core/services/pageStateService/page-state.service';
import { TipoDocumentoPorteService } from '../shared/desplegable-tipo-documento-porte/tipo-documento-porte.service';

export const MockRoutes: Routes = [
  {
      path: '',
      component: GestionarControlComponent,
      data: {
          title: 'GestionarControl'
      },
      pathMatch: 'full'
  }
];

describe('GestionarControlComponent', () => {
  let component: GestionarControlComponent;
  let fixture: ComponentFixture<GestionarControlComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        GestionarControlComponent,
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        SearchControlService,
        SearchFormActionsNotifierService,
        ExcelService,
        DropdownNotificationService,
        CircuitoService,
        NavigationService,
        EstadoMovimientoService,
        MovimientoService,
        PageStateService,
        TipoDocumentoPorteService
      ],
      imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        HotkeyModule.forRoot(),
        TestModule,
        NgbModule,
        ModalModule,
        NgxDatatableModule,
        RouterModule,
        RouterTestingModule.withRoutes(MockRoutes),
      ],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarControlComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('El metodo navigateVagon', () => {
    let navigationService;
    let pageStateService;
    const gestionarControlPath = 'GestionarControl';
    const navigationExtras = {} as NavigationExtras;

    beforeEach(() => {

      navigationService = fixture.debugElement.injector.get(NavigationService);
      spyOn(navigationService, 'navigate');
      pageStateService = TestBed.get(PageStateService);
      spyOn(pageStateService, 'getState');
      spyOn(pageStateService, 'saveState');
    });

    it('llama al metodo navigate del navigationService con la url ' +
      'ConsultarModificarControlarDescargaVagonCereales cuando el producto es cereales', () => {
      // Arrange
      const consultarModificarControlarDescargaVagonCerealesPath = 'ConsultarModificarControlarDescargaVagonCereales';

      // Act
      component['navigateVagon'](TiposProducto.Cereal, navigationExtras);

      // Assert
      expect(navigationService.navigate).toHaveBeenCalledTimes(1);
      expect(navigationService.navigate).toHaveBeenCalledWith(gestionarControlPath,
                                                              consultarModificarControlarDescargaVagonCerealesPath,
                                                              navigationExtras);
    });

    it('llama al metodo navigate del navigationService con la url ' +
      'ConsultarModificarControlarDescargaVagonNoGranos cuando el producto es no granos', () => {
      // Arrange
      const consultarModificarControlarDescargaVagonNoGranosPath = 'ConsultarModificarControlarDescargaVagonNoGranos';

      // Act
      component['navigateVagon'](TiposProducto.NoGranos, navigationExtras);

      // Assert
      expect(navigationService.navigate).toHaveBeenCalledTimes(1);
      expect(navigationService.navigate).toHaveBeenCalledWith(gestionarControlPath,
                                                              consultarModificarControlarDescargaVagonNoGranosPath,
                                                              navigationExtras);
    });

  });
});
