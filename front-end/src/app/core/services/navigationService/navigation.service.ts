import { Injectable } from '@angular/core';
import { Router, NavigationExtras, Route, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';

import { Resources } from '../../../../locale/artifacts/resources';
import { PopupService } from '../popupService/popup.service';
import { ApiService } from '../restClient/api.service';

@Injectable()
export class NavigationService {

  private readonly gestionTransporteCircuito: string = 'GestionarTransportesCircuito';
  private subscription$: Subscription;

  constructor(private readonly router: Router,
              private readonly activeRoute: ActivatedRoute,
              private readonly apiService: ApiService,
              private readonly popupService: PopupService) {
  }

  public navigate(fromIdentifier: string, toIdentifier: string, extras?: NavigationExtras): void {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }

    if (!fromIdentifier) { throw new Error('The parameter "fromIdentifier" can not be  null.' ); }
    if (!toIdentifier) { throw new Error('The parameter "toIdentifier" can not be  null.' ); }

    if (this.getPathByIdentifier(fromIdentifier) === this.getPathByIdentifier(this.gestionTransporteCircuito)) {
      sessionStorage.setItem('source_gestionar_transporte_path', this.getPathByIdentifier(fromIdentifier));
    }

    sessionStorage.setItem('previous_path', this.getPathByIdentifier(fromIdentifier));
    this.router.navigate([this.getPathByIdentifier(toIdentifier)], extras);
  }

  public navigateBack(extras?: NavigationExtras): void {
    const previousPath = sessionStorage.getItem('previous_path');
    this.clearPathCache();
    this.router.navigate([previousPath], extras);
  }

  public requestExtras(): Observable<Params> {
    return this.activeRoute.queryParams;
  }

  public getPathByIdentifier(identifier: string): string {
    const routes = this.router.config.filter( item => item.data && item.path !== null && item.data.identifier );
    const finalPath = this.searchPath(routes, identifier);
    return finalPath ? finalPath : '';
  }

  private searchPath(routes: Route[], identifier: string): string | undefined {
    const finalRoute = routes.find((route) => route.data ? route.data.identifier === identifier : false);
    if (finalRoute) {
      return this.getPath(finalRoute);
    } else {
      for (const currentRoute of routes) {
        if (currentRoute.children) {
          const childRoute = this.searchPath(currentRoute.children, identifier);
          if (childRoute) {
            return `/${this.getPath(currentRoute)}/${childRoute}`;
          }
        }
      }
    }
  }

  private getPath(route: Route): string {
    return route.path ? route.path : '';
  }

  public getDataByPath(routes: Route[] | undefined, url: string): any {
    if (routes && url) {
      const urls = url.split('/').filter(r => r);
      if (urls && urls[0]) {
        const firstUrl = urls[0].split('?')[0];
        const parentRoute = routes.find(route => route.path === firstUrl);
        if (parentRoute) {
          if (urls.length === 1) {
            return parentRoute.data;
          } else {
            const urlRemaining = url.substr(firstUrl.length + 1, url.length);
            return this.getDataByPath(parentRoute.children, urlRemaining);
          }
        }
      }
    }
    return {};
  }

  public navigateByMovement(idMovimiento: number, fromIdentifier: string, extras?: NavigationExtras,
    esTransporteEnCircuito: boolean = false): void {
    this.subscription$ = this.apiService.get<string>(`paginas/siguiente?idMovimiento=${idMovimiento}&esTransporteEnCircuito=${esTransporteEnCircuito}`)
      .subscribe((relativePath: string) => {
        if (relativePath === 'CircuitoFinalizado') {
          this.clearPathCache();
          this.popupService.success(Resources.Messages.ElMovimientoHaFinalizadoElCircuito);
          relativePath = this.gestionTransporteCircuito;
        }
        this.navigate(fromIdentifier, relativePath, extras);
      });
  }

  public clearCache(): void {
    sessionStorage.clear();
  }

  public clearPathCache(): void {
    sessionStorage.removeItem('previous_path');
    sessionStorage.removeItem('source_gestionar_transporte_path');
  }

  public navigateBackToSource(): void {
    const sourcePath = sessionStorage.getItem('source_gestionar_transporte_path');
    if (sourcePath) {
      sessionStorage.setItem('previous_path', this.getPathByIdentifier(this.gestionTransporteCircuito));
      this.navigateBack();
    }
  }

  public isFromGestionarTransporteCircuito(): boolean {
    const sourcePath = sessionStorage.getItem('source_gestionar_transporte_path');
    return !!sourcePath;
  }
}
