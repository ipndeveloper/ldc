import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompletePatenteComponent } from './autocomplete-patente.component';
import { TestModule } from '../../core/mocks/test.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PatenteService } from '../../cargas-descargas/shared/services/patente.service';
import { FocusDirective } from '../../core/directives/focus/focus.directive';
import { configureTestSuite } from '../../core/mocks/testing';

describe('AutocompletePatenteComponent', () => {
  let component: AutocompletePatenteComponent;
  let fixture: ComponentFixture<AutocompletePatenteComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ AutocompletePatenteComponent, FocusDirective ],
      imports: [
          TestModule,
          ReactiveFormsModule,
          NgbModule
      ],
      providers: [
        PatenteService
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompletePatenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
