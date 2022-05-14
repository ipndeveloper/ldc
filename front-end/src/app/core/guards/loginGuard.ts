import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/session/auth.service';
import { Injectable } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { NavigationService } from '../services/navigationService/navigation.service';
import { MenuIdentifiers } from '../../../app/shared/enums/enums';

@Injectable()
export class LoginGuard implements CanActivate {

    constructor(private readonly authService: AuthService,
        private readonly ngxPermissionsService: NgxPermissionsService,
        private readonly navigationService: NavigationService) {
    }

    canActivate(route: ActivatedRouteSnapshot): Promise<boolean> | boolean {

        const isTokenExpired = this.authService.isTokenExpired();
        if (isTokenExpired) {
          this.authService.logout();
          this.ngxPermissionsService.flushPermissions();
          this.navigationService.navigate(route.data.identifier, MenuIdentifiers.Login);

          return false;
        }

        return true;
    }
}
