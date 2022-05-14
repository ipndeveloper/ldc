import {  ComponentFixture, TestBed } from '@angular/core/testing';
import { PatentesComponent } from './patentes.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HotkeyModule } from 'angular2-hotkeys';
import { TestModule } from '../../core/mocks/test.module';
import { ParametrosTerminalService } from '../../cargas-descargas/shared/services/parametros-terminal.service';
import { configureTestSuite } from '../../core/mocks/testing';

describe('PatentesComponent', () => {
  let component: PatentesComponent;
  let fixture: ComponentFixture<PatentesComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [PatentesComponent],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HotkeyModule.forRoot(),
        NgbModule,
        TestModule
      ],
      providers: [ ParametrosTerminalService ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatentesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
