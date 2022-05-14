import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HotkeyModule } from 'angular2-hotkeys';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TestModule } from '../../core/mocks/test.module';
import { EstadoMovimientoComponent } from './estado-movimiento.component';
import { FocusDirective } from '../../core/directives/focus/focus.directive';
import { TextoConEtiquetaComponent } from '../../core/controls/texto-con-etiqueta/texto-con-etiqueta.component';
import { configureTestSuite } from '../../core/mocks/testing';

describe('DatosEstadoMovimientoComponent', () => {
  let component: EstadoMovimientoComponent;
  let fixture: ComponentFixture<EstadoMovimientoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        EstadoMovimientoComponent,
        TextoConEtiquetaComponent,
        FocusDirective
      ],
      imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        HotkeyModule.forRoot(),
        TestModule,
        NgbModule
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadoMovimientoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
