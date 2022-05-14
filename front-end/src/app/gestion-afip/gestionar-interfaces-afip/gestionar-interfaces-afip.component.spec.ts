import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarInterfacesAfipComponent } from './gestionar-interfaces-afip.component';
import { DesplegableServicioAfipComponent } from './filtro/desplegable-servicio-afip/desplegable-servicio-afip.component';
import { FiltroBusquedaInterfacesAfipComponent } from './filtro/filtro-busqueda-interfaces-afip/filtro-busqueda-interfaces-afip.component';
import { TestModule } from '../../core/mocks/test.module';
import { ServicioAfipService } from './filtro/servicio-afip.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { GestionarInterfacesAfipService } from './services/gestionar-interfaces-afip.service';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { CoreSharedModule } from '../../core/core-shared.module';
import { HotkeyModule } from 'angular2-hotkeys';
import { ModalConfirmacionManualComponent } from './modal-confirmacion-manual/modal-confirmacion-manual.component';
import { configureTestSuite } from '../../core/mocks/testing';

describe('GestionarInterfacesAfipComponent', () => {
  let component: GestionarInterfacesAfipComponent;
  let fixture: ComponentFixture<GestionarInterfacesAfipComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        GestionarInterfacesAfipComponent,
        FiltroBusquedaInterfacesAfipComponent,
        DesplegableServicioAfipComponent,
        ModalConfirmacionManualComponent
      ],
      imports: [
        CoreSharedModule,
        TestModule,
        NgxDatatableModule,
        ReactiveFormsModule,
        HotkeyModule.forRoot()
      ],
      providers: [
        ServicioAfipService,
        SearchFormActionsNotifierService,
        FormComponentService,
        GestionarInterfacesAfipService
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarInterfacesAfipComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
