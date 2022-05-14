import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarDatosAfipComponent } from './consultar-datos-afip.component';
import { BrowserModule } from '@angular/platform-browser';
import { TestModule } from '../../core/mocks/test.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HotkeyModule } from 'angular2-hotkeys';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConsultarDatosAfipService } from './consultar-datos-afip-service';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { configureTestSuite } from '../../core/mocks/testing';

describe('ConsultarDatosAfipComponent', () => {
  let component: ConsultarDatosAfipComponent;
  let fixture: ComponentFixture<ConsultarDatosAfipComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultarDatosAfipComponent ],
      imports: [
        BrowserModule,
        TestModule,
        ReactiveFormsModule,
        HotkeyModule.forRoot(),
        ToastrModule.forRoot(),
        NgbModule
      ],
      providers: [
        ConsultarDatosAfipService,
        FormComponentService
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultarDatosAfipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
