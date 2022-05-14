import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlarDescargaCamionSubproductosComponent } from './controlar-descarga-camion-subproductos.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HotkeyModule } from 'angular2-hotkeys';
import { ToastrModule } from 'ngx-toastr';
import { NavigationService } from '../../core/services/navigationService/navigation.service';
import { MovimientoService } from '../shared/services/movimiento.service';
import { Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DescargaEventsNotifierService } from '../shared/services/descarga-events-notifier.service';
import { TestModule } from '../../core/mocks/test.module';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { AuthService } from '../../core/services/session/auth.service';
import { ControlarDescargaCamionSubproductosService } from './controlar-descarga-camion-subproductos.service';
import { CircuitoService } from '../shared/services/circuito.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { configureTestSuite } from '../../core/mocks/testing';
import { CommandService } from '../../shared/command-service/command.service';

export const MockRoutes: Routes = [
  {
      path: '',
      component: ControlarDescargaCamionSubproductosComponent,
      data: {
          title: 'ControlarDescargaCamionSubproductos'
      },
      pathMatch: 'full'
  }
];

describe('ControlarDescargaCamionSubproductosComponent', () => {
  let component: ControlarDescargaCamionSubproductosComponent;
  let fixture: ComponentFixture<ControlarDescargaCamionSubproductosComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        ControlarDescargaCamionSubproductosComponent,
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
        ControlarDescargaCamionSubproductosService,
        CircuitoService,
        FormComponentService,
        NavigationService,
        MovimientoService,
        AuthService,
        DescargaEventsNotifierService,
        CommandService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlarDescargaCamionSubproductosComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
