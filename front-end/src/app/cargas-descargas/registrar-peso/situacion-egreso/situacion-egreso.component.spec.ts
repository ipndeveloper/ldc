import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { SituacionEgresoComponent } from './situacion-egreso.component';
import { ListaMotivosNoDescargaComponent } from '../situacion-entrada/lista-motivos-no-descarga/lista-motivos-no-descarga.component';
import { BrowserModule } from '@angular/platform-browser';
import { TestModule } from '../../../core/mocks/test.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HotkeyModule } from 'angular2-hotkeys';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { configureTestSuite } from '../../../core/mocks/testing';

describe('SituacionEgresoComponent', () => {
  let component: SituacionEgresoComponent;
  let fixture: ComponentFixture<SituacionEgresoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        SituacionEgresoComponent,
        ListaMotivosNoDescargaComponent,
      ],
      imports: [
        BrowserModule,
        TestModule,
        ReactiveFormsModule,
        HotkeyModule.forRoot(),
        ToastrModule.forRoot(),
        NgbModule
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SituacionEgresoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
