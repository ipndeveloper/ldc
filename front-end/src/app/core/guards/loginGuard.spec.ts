import { TestBed } from '@angular/core/testing';

import { AuthService } from '../../core/services/session/auth.service';
import { NavigationService } from '../../core/services/navigationService/navigation.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { TestModule } from '../../core/mocks/test.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Routes, ActivatedRouteSnapshot } from '@angular/router';
import { LoginGuard } from './loginGuard';
import { BrowserModule } from '@angular/platform-browser';
import { MenuIdentifiers } from '../../../app/shared/enums/enums';
import { SecurityService } from '../services/session/security.service';
import { of } from 'rxjs';
import { configureTestSuite } from '../mocks/testing';

export const MockRoutes: Routes = [
  {
      path: '',
      component: LoginGuard,
      data: {
          title: 'Login'
      }
  }];

describe('LoginGuard', () => {
  let guard: LoginGuard;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
      ],
      imports: [
        TestModule,
        BrowserModule,
        RouterTestingModule.withRoutes(MockRoutes),
      ],
      providers: [
        LoginGuard,
        AuthService,
        NgxPermissionsService,
        NavigationService,
        SecurityService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {

    guard = TestBed.get(LoginGuard);

    const authService = TestBed.get(AuthService);
    spyOn(authService, 'isTokenExpired').and.returnValue(true);
    spyOn(authService, 'logout');

    const ngxPermissionsService = TestBed.get(NgxPermissionsService);
    spyOn(ngxPermissionsService, 'flushPermissions');
    spyOn(ngxPermissionsService, 'getPermissions').and.returnValue([]);
    spyOn(ngxPermissionsService, 'loadPermissions');

    const navigationService = TestBed.get(NavigationService);
    spyOn(navigationService, 'navigate');

    const securityService = TestBed.get(SecurityService);
    spyOn(securityService, 'getPermissions').and.returnValue(of([]));

    // .detectChanges();
  });

  it('should create', () => {
    expect(guard).toBeTruthy();
  });

  describe('El metodo canActivate', () => {

    let route: ActivatedRouteSnapshot;

    beforeEach(() => {
      route = new ActivatedRouteSnapshot();
      route.data = ['Identifier1'];
    });

    it('Valida si ha expirado el token', () => {
      // Arrange

      // Act
      guard.canActivate(route);

      // Assert
      const authService = TestBed.get(AuthService);
      expect(authService.isTokenExpired).toHaveBeenCalledTimes(1);
    });

    it('Si token ha expirado, realiza logout', () => {
      // Arrange
      const authService = TestBed.get(AuthService);
      (authService.isTokenExpired as jasmine.Spy).and.returnValue(true);

      // Act
      guard.canActivate(route);

      // Assert
      expect(authService.logout).toHaveBeenCalledTimes(1);
    });

    it('Si token ha expirado, limpia todos los permisos', () => {
      // Arrange
      const authService = TestBed.get(AuthService);
      (authService.isTokenExpired as jasmine.Spy).and.returnValue(true);

      // Act
      guard.canActivate(route);

      // Assert
      const ngxPermissionsService = TestBed.get(NgxPermissionsService);
      expect(ngxPermissionsService.flushPermissions).toHaveBeenCalledTimes(1);
    });

    it('Si token ha expirado, redirecciona a login', () => {
      // Arrange
      const authService = TestBed.get(AuthService);
      (authService.isTokenExpired as jasmine.Spy).and.returnValue(true);

      // Act
      guard.canActivate(route);

      // Assert
      const navigationService = TestBed.get(NavigationService);
      expect(navigationService.navigate).toHaveBeenCalledWith(route.data.identifier, MenuIdentifiers.Login);
      expect(navigationService.navigate).toHaveBeenCalledTimes(1);
    });

    it('Si token no ha expirado, el metodo devuelve true', () => {
      // Arrange
      const authService = TestBed.get(AuthService);
      (authService.isTokenExpired as jasmine.Spy).and.returnValue(false);

      // Act
      const respuesta = guard.canActivate(route);

      // Assert
      expect(respuesta).toBe(true);
    });

    it('Si token ha expirado, el metodo devuelve false', () => {
      // Arrange
      const authService = TestBed.get(AuthService);
      (authService.isTokenExpired as jasmine.Spy).and.returnValue(true);

      // Act
      const respuesta = guard.canActivate(route);

      // Assert
      expect(respuesta).toBe(false);
    });

  });
});
