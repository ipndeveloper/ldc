import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FormComponentService } from '../core/services/formComponent/formComponent.service';
import { LoginService } from '../core/services/session/login.service';
import { AuthService } from '../core/services/session/auth.service';
import { NavigationService } from '../core/services/navigationService/navigation.service';
import { SecurityService } from '../core/services/session/security.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { TestModule } from '../core/mocks/test.module';
import { BrowserModule } from '@angular/platform-browser';
import { CoreSharedModule } from '../core/core-shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Routes } from '@angular/router';
import { of } from 'rxjs';
import { JwtSecurityToken } from '../core/services/session/jwt-security-token';
import { MenuIdentifiers } from '../shared/enums/enums';
import { configureTestSuite } from '../core/mocks/testing';
import { TerminalService } from '../shared/desplegable-terminal-login/terminal.service';
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';
import { ParametrosService } from '../shared/parametros-service/parametros.service';

export const MockRoutes: Routes = [
  {
    path: '',
    component: LoginComponent,
    data: {
        title: 'Login'
    }
  }
];

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let progressRef: NgProgressRef;
  let parametrosService: ParametrosService;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent
      ],
      imports: [
        TestModule,
        BrowserModule,
        NgbModule,
        CoreSharedModule,
        RouterTestingModule.withRoutes(MockRoutes)
      ],
      providers: [
        NavigationService,
        FormBuilder,
        FormComponentService,
        LoginService,
        AuthService,
        SecurityService,
        NgxPermissionsService,
        TerminalService,
        NgProgress,
        ParametrosService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    const formBuilder = TestBed.get(FormBuilder);
    spyOn(formBuilder, 'group').and.returnValue(of({}));

    const formComponentService = TestBed.get(FormComponentService);
    spyOn(formComponentService, 'initialize');
    spyOn(formComponentService, 'validateForm');
    spyOn(formComponentService, 'showValidationError');
    spyOn(formComponentService, 'getValue');
    spyOn(formComponentService, 'isValidForm');

    component['fcsUsuarioContrasenia'] = formComponentService;
    component['fcsUsuarioTerminal'] = formComponentService;

    const loginService = TestBed.get(LoginService);
    spyOn(loginService, 'login').and.returnValue(of());

    const authService = TestBed.get(AuthService);
    spyOn(authService, 'setSession');
    spyOn(authService, 'logout');

    const securityService = TestBed.get(SecurityService);
    spyOn(securityService, 'getPermissions').and.returnValue(of(['']));

    const ngxPermissionsService = TestBed.get(NgxPermissionsService);
    spyOn(ngxPermissionsService, 'loadPermissions');

    const navigationService = TestBed.get(NavigationService);
    spyOn(navigationService, 'navigate');

    const terminalService = TestBed.get(TerminalService);
    spyOn(terminalService, 'getAll').and.returnValue(of([{}]));

    const progress = TestBed.get(NgProgress);
    progressRef = {start: () => {}, complete: () => {}} as NgProgressRef;
    spyOn(progress, 'ref').and.returnValue(progressRef);
    spyOn(progressRef, 'start');
    spyOn(progressRef, 'complete');

    parametrosService = TestBed.get(ParametrosService);
    spyOn(parametrosService, 'obtenerAmbiente').and.returnValue(of(''));
    spyOn(parametrosService, 'obtenerUbicacionFisica').and.returnValue(of(''));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('El metodo ngOnInit', () => {

    it('Crea un form usando formbuilder', () => {
      // Arrange

      // Act
      component.ngOnInit();

      // Assert
      const formBuilder = TestBed.get(FormBuilder);
      expect(formBuilder.group).toHaveBeenCalledTimes(2);
    });

    it('Llama método ref de progress', () => {
      // Arrange

      // Act
      component.ngOnInit();

      // Assert
      const progress = TestBed.get(NgProgress);
      expect(progress.ref).toHaveBeenCalledWith('loginProgress');
      expect(progress.ref).toHaveBeenCalledTimes(1);
    });

    it('Inicializar form component service', () => {
      // Arrange
      const formBuilder = TestBed.get(FormBuilder);
      const form = {'a': 1};
      (formBuilder.group as jasmine.Spy).and.callFake(() => (form));

      // Act
      component.ngOnInit();

      // Assert
      const formComponentService = TestBed.get(FormComponentService);
      expect(formComponentService.initialize).toHaveBeenCalledWith(form);
      expect(formComponentService.initialize).toHaveBeenCalledTimes(2);
    });

    it('Llama una vez al metodo logout de authenticationService', () => {
      // Arrange

      // Act
      component.ngOnInit();

      // Assert
      const authService = TestBed.get(AuthService);
      expect(authService.logout).toHaveBeenCalledTimes(1);
    });

  });

  describe('El metodo Ingresar', () => {

    beforeEach(() => {

      const formComponentService = TestBed.get(FormComponentService);
      (formComponentService.isValidForm as jasmine.Spy).and.returnValue(of(true));

      component.progressRef = progressRef;

      component['crearForm']();

      component.formUsuarioTerminal = new FormGroup({
        terminal: new FormControl({'descripcion': 'hola'})
      });

    });

    it('Llama al método start de progressRef', () => {
      // Arrange

      // Act
      component.ingresar();

      // Assert
      expect(progressRef.start).toHaveBeenCalledTimes(1);
    });

    it('Solicita login a servicio de login con parametros correspondientes', () => {
      // Arrange
      const formComponentService = component['fcsUsuarioContrasenia'];
      (formComponentService.getValue as jasmine.Spy).and.returnValues('usuario', 'contrasenia', 'terminal');

      // Act
      component.ingresar();

      // Assert
      const loginService = TestBed.get(LoginService);
      expect(loginService.login).toHaveBeenCalledWith('usuario', 'contrasenia', 'terminal');
      expect(loginService.login).toHaveBeenCalledTimes(1);
    });

    it('Cuando servicio de loguin devuelve token, llama lo guarda en la sesion', () => {
      // Arrange
      const token = new JwtSecurityToken('1', 2, '3');

      const loginService = TestBed.get(LoginService);
      (loginService.login as jasmine.Spy).and.returnValue(of(token));

      // Act
      component.ingresar();

      // Assert
      const authService = TestBed.get(AuthService);
      expect(authService.setSession).toHaveBeenCalledWith(token);
      expect(authService.setSession).toHaveBeenCalledTimes(1);
    });

    it('Cuando servicio de loguin devuelve token, obtiene los permisos correspondientes', () => {
      // Arrange
      const token = new JwtSecurityToken('1', 2, '3');

      const loginService = TestBed.get(LoginService);
      (loginService.login as jasmine.Spy).and.returnValue(of(token));

      // Act
      component.ingresar();

      // Assert
      const securityService = TestBed.get(SecurityService);
      expect(securityService.getPermissions).toHaveBeenCalledTimes(1);
    });

    it('Cuando servicio de permisos devuelve resultados, los envia a servicio de permisos', () => {
      // Arrange
      const token = new JwtSecurityToken('1', 2, '3');
      const loginService = TestBed.get(LoginService);
      (loginService.login as jasmine.Spy).and.returnValue(of(token));

      const permisos = ['Permiso1', 'Permiso2'];
      const securityService = TestBed.get(SecurityService);
      (securityService.getPermissions as jasmine.Spy).and.returnValue(of(permisos));

      // Act
      component.ingresar();

      // Assert
      const permissionsService = TestBed.get(NgxPermissionsService);

      expect(permissionsService.loadPermissions).toHaveBeenCalledWith(permisos);
      expect(permissionsService.loadPermissions).toHaveBeenCalledTimes(1);
    });

    it('Cuando servicio de permisos devuelve resultados, redirecciona a home', () => {
      // Arrange
      const token = new JwtSecurityToken('1', 2, '3');
      const loginService = TestBed.get(LoginService);
      (loginService.login as jasmine.Spy).and.returnValue(of(token));

      const permisos = ['Permiso1', 'Permiso2'];
      const securityService = TestBed.get(SecurityService);
      (securityService.getPermissions as jasmine.Spy).and.returnValue(of(permisos));

      // Act
      component.ingresar();

      // Assert
      const navigationService = TestBed.get(NavigationService);

      expect(navigationService.navigate).toHaveBeenCalledWith(MenuIdentifiers.Login, MenuIdentifiers.Home);
      expect(navigationService.navigate).toHaveBeenCalledTimes(1);
    });

    it('Llama al método complete de progressRef', () => {
      // Arrange
      const token = new JwtSecurityToken('1', 2, '3');
      const loginService = TestBed.get(LoginService);
      (loginService.login as jasmine.Spy).and.returnValue(of(token));

      // Act
      component.ingresar();

      // Assert
      expect(progressRef.complete).toHaveBeenCalledTimes(1);
    });

  });

});
