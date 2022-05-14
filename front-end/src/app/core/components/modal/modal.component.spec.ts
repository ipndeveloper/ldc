import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';
import { HotkeysService } from 'angular2-hotkeys';
import { configureTestSuite } from '../../mocks/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MockHotkeysService } from '../../mocks/mockHotkeysService';
import { AuthService } from '../../services/session/auth.service';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        ModalComponent
      ],
      imports: [
      ],
      providers: [
        { provide: HotkeysService, useClass: MockHotkeysService },
        AuthService,
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
