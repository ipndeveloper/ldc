import { Injectable, EventEmitter } from '@angular/core';
import { Router, NavigationEnd, Route } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MenuItem } from '../../core/models/menuItem';
import { NavigationService } from '../../core/services/navigationService/navigation.service';
import { MenuIdentifiers } from '../../../app/shared/enums/enums';

@Injectable()
export class ToolbarService {
    routeChanged: EventEmitter<MenuItem> = new EventEmitter();

    constructor(private readonly router: Router,
                private readonly navigationService: NavigationService) {
        this.initialize();
    }

    getMenuItems(): MenuItem[] {

        // El enrutamiento tendra nodos padres "Home" y "Login", que no mostraremos en el menu.
        const homeNode = this.router.config.filter(route => route.data && route.data.identifier === MenuIdentifiers.Home)[0];

        const menuItems = homeNode.children && homeNode.children.filter(item => item.data && !item.data.hide);
        return menuItems ? menuItems.map(route => this.mapRoute(route)) : [];
    }

    private mapRoute(route: Route) {

        const children = route.children && route.children.filter(item => item.data && !item.data.hide);

        return {
            path: route && route.data && route.data.identifier && this.navigationService.getPathByIdentifier(route.data.identifier) || '',
            title: route && route.data && route.data.title || '',
            icon: route && route.data && route.data.icon || '',
            children: children && children.map(childRoute => this.mapRoute(childRoute)) || null,
            permissions: route && route.data && route.data.permissions && this.getPermissions(route.data.permissions) || null
        };
    }

    private getPermissions(permissions): any[] | string {
        let resultPermissions: any[] = [];
        if (Array.isArray(permissions)) {
            resultPermissions = permissions;
        } else if (typeof permissions === 'string') {
            resultPermissions.push(permissions);
        } else if ('only' in permissions) {
            resultPermissions = permissions.only;
        }
        return resultPermissions;
    }

    private onRouteChanged(menuItem: MenuItem) {
        this.routeChanged.emit(menuItem);
    }

    private initialize(): void {
        this.router.events
            .pipe(filter(e => e instanceof NavigationEnd))
            .subscribe(() => {
                const menuItem = this.resolveMenuItem();
                this.onRouteChanged(menuItem);
            });
    }

    public resolveMenuItem(): MenuItem {
        const url = this.router.url.toString();
        const homeRoute = this.router.config.find(r => r.data !== undefined && r.data.identifier === MenuIdentifiers.Home);
        if (homeRoute) {
            const data = this.navigationService.getDataByPath(homeRoute.children, url);
            if (data && data.title) {
                return MenuItem.fromTitle(data.title);
            }
        }

        return MenuItem.empty;
    }
}
