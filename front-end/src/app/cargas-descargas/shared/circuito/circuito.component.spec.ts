import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { CircuitoComponent } from './circuito.component';
import { TestModule } from '../../../core/mocks/test.module';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HotkeyModule } from 'angular2-hotkeys';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DespegableTipoProductoComponent } from '../../../shared/desplegable-tipo-producto/desplegable-tipo-producto.component';
import { TipoProductoService } from '../../../shared/desplegable-tipo-producto/tipo-producto.service';
import { configureTestSuite } from '../../../core/mocks/testing';

describe('CircuitoComponent', () => {
  let component: CircuitoComponent;
  let fixture: ComponentFixture<CircuitoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        CircuitoComponent,
        DespegableTipoProductoComponent
      ],
      imports: [
        BrowserModule,
        ReactiveFormsModule,
        HotkeyModule.forRoot(),
        NgbModule,
        TestModule
      ],
      providers: [
        TipoProductoService
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CircuitoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
