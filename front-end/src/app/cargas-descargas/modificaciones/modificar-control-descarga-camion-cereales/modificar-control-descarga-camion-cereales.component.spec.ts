import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarControlDescargaCamionCerealesComponent } from './modificar-control-descarga-camion-cereales.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HotkeyModule } from 'angular2-hotkeys';
import { ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { Routes } from '@angular/router';
import { TestModule } from '../../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CircuitoService } from '../../shared/services/circuito.service';
import { MovimientoService } from '../../shared/services/movimiento.service';
import { ControlarDescargaCamionCerealesService } from '../../controlar-descarga-camion-cereales/controlar-descarga-camion-cereales.service';
import { AuthService } from '../../../core/services/session/auth.service';
import { DescargaEventsNotifierService } from '../../shared/services/descarga-events-notifier.service';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { NavigationService } from '../../../core/services/navigationService/navigation.service';
import { configureTestSuite } from '../../../core/mocks/testing';
import { CommandService } from '../../../shared/command-service/command.service';
import { TipoDocumentoPorteService } from '../../shared/desplegable-tipo-documento-porte/tipo-documento-porte.service';

export const MockRoutes: Routes = [
  {
      path: '',
      component: ModificarControlDescargaCamionCerealesComponent,
      data: {
          title: 'ControlarDescargaCamionSubproductos'
      },
      pathMatch: 'full'
  }
];

describe('ModificarControlDescargaCerealesComponent', () => {
  let component: ModificarControlDescargaCamionCerealesComponent;
  let fixture: ComponentFixture<ModificarControlDescargaCamionCerealesComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        ModificarControlDescargaCamionCerealesComponent,
      ],
      imports: [
        TestModule,
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        HotkeyModule.forRoot(),
        ToastrModule.forRoot(),
        RouterTestingModule.withRoutes(MockRoutes)
      ],
      providers : [
        CircuitoService,
        MovimientoService,
        ControlarDescargaCamionCerealesService,
        AuthService,
        DescargaEventsNotifierService,
        FormComponentService,
        NavigationService,
        CommandService,
        TipoDocumentoPorteService,
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarControlDescargaCamionCerealesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
