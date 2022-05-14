import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { SituacionEntradaComponent } from './situacion-entrada.component';
import { BrowserModule } from '@angular/platform-browser';
import { TestModule } from '../../../core/mocks/test.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HotkeyModule } from 'angular2-hotkeys';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListaMotivosNoDescargaComponent } from './lista-motivos-no-descarga/lista-motivos-no-descarga.component';
import { MotivosNoDescargaService } from './lista-motivos-no-descarga/motivos-no-descarga.service';
import { DesplegableCondicionManipuleoComponent } from './desplegable-condicion-manipuleo/desplegable-condicion-manipuleo.component';
import { CondicionManipuleoService } from './condicion-manipuleo.service';
import { configureTestSuite } from '../../../core/mocks/testing';

describe('SituacionEntradaComponent', () => {
  let component: SituacionEntradaComponent;
  let fixture: ComponentFixture<SituacionEntradaComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        SituacionEntradaComponent,
        DesplegableCondicionManipuleoComponent,
        ListaMotivosNoDescargaComponent
      ],
      imports: [
        BrowserModule,
        TestModule,
        ReactiveFormsModule,
        HotkeyModule.forRoot(),
        ToastrModule.forRoot(),
        NgbModule
      ],
      providers: [
        CondicionManipuleoService,
        MotivosNoDescargaService
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SituacionEntradaComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
