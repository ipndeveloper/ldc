import {  ComponentFixture, TestBed } from '@angular/core/testing';
import { DesplegableCondicionManipuleoComponent } from './desplegable-condicion-manipuleo.component';
import { CondicionManipuleoService } from '../condicion-manipuleo.service';
import { configureTestSuite } from '../../../../core/mocks/testing';
import { CommandService } from '../../../../shared/command-service/command.service';
import { HotkeyModule } from 'angular2-hotkeys';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from '../../../../core/services/restClient/api.service';
import { RestHandlerService } from '../../../../core/services/restClient/restHandler.service';
import { PopupModule } from '../../../../core/services/popupService/popup.module';
import { RequestOptionsService } from '../../../../core/services/restClient/requestOptions.service';
import { AuthService } from '../../../../core/services/session/auth.service';

describe('DesplegableCondicionManipuleoComponent', () => {
  let component: DesplegableCondicionManipuleoComponent;
  let fixture: ComponentFixture<DesplegableCondicionManipuleoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ DesplegableCondicionManipuleoComponent ],
      imports: [
        HttpClientTestingModule,
        PopupModule,
        HotkeyModule.forRoot()
      ],
      providers: [
        CondicionManipuleoService,
        CommandService,
        ApiService,
        RestHandlerService,
        RequestOptionsService,
        AuthService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesplegableCondicionManipuleoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
