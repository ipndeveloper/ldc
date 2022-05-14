import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateARParserFormatter } from './core/controls/fecha-con-etiqueta/ngb-date-ar-parser-formatter';
import { environment } from '../environments/environment';
import { NavigationService } from './core/services/navigationService/navigation.service';
import { MenuIdentifiers } from './shared/enums/enums';
import { NgxPermissionsService } from 'ngx-permissions';
import { setupSubscriptions } from './core/rxjs/subscriptions';
import { VersionCheckService } from './core/services/versionCheck/version-check.service';
import { UrlService } from './core/services/restClient/url.service';
import { ToolbarService } from './home/toolbar/toolbar.service';

@Component({
  selector: 'yrd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [{provide: NgbDateParserFormatter, useClass: NgbDateARParserFormatter}]
})
export class AppComponent implements OnInit {

  inputTypes = ['text',
                'password',
                'file',
                'search',
                'email',
                'number',
                'date',
                'color',
                'datetime',
                'datetime-local',
                'month',
                'range',
                'search',
                'tel',
                'time',
                'url',
                'week'];

  constructor(private readonly elRef: ElementRef,
              private readonly navigationService: NavigationService,
              private readonly ngxPermissionsService: NgxPermissionsService,
              private readonly versionCheckService: VersionCheckService,
              private readonly urlService: UrlService,
              private readonly toolbarService: ToolbarService) { }

  ngOnInit() {
    setupSubscriptions();
    if (environment.production) {
      this.versionCheckService.initVersionCheck(this.urlService.getFrontEndUrl() + '/version.json', 1000 * 60);
    }
    if (this.browserIsIE()) {
      this.setFocusableToSVGs();
      this.toolbarService.routeChanged
        .subscribe((_: any) => {
          this.setFocusableToSVGs();
        });
    }
  }

  // determina si el navegador es IE
  private browserIsIE(): boolean {
    return /MSIE|Trident|Edge\//.test(window.navigator.userAgent);
  }

  // se previene que los svg sea focusables en IE
  private setFocusableToSVGs() {
    setTimeout(() => {
      const svgArray = this.elRef.nativeElement.querySelectorAll('svg');
      if (svgArray && svgArray.length) {
        for (const svg of svgArray) {
          svg.setAttribute('focusable', 'false');
        }
      }
    }, 0);
  }

  // se previene que el backspace vuelva atras en IE
  @HostListener('document:keydown', ['$event'])
  onKeyDown(evt: KeyboardEvent) {
    // tslint:disable:deprecation
    if (evt.keyCode === 8 || evt.which === 8) {
      let doPrevent = true;

      const target = evt.target as HTMLInputElement;

      if (target.isContentEditable) {
        doPrevent = false;
      } else if (target.nodeName === 'INPUT') {
        let type = target.type;
        if (type) {
          type = type.toLowerCase();
        }
        if (this.inputTypes.indexOf(type) > -1) {
          doPrevent = false;
        }
      } else if (target.nodeName === 'TEXTAREA') {
        doPrevent = false;
      }
      if (doPrevent) {
        evt.preventDefault();
      }
    }
  }

  // se maneja las sesiones entre pestañas de navegadores
  @HostListener('window:storage', ['$event'])
  onStorageChange(event: StorageEvent) {
    if (event.storageArea === localStorage) {
      const token = localStorage.getItem(environment.tokenKey);
      if (!token) {
        this.navigationService.navigate(MenuIdentifiers.Home, MenuIdentifiers.Login);
      } else {
        this.navigationService.navigate(MenuIdentifiers.Login, MenuIdentifiers.Home);
      }

      const jsonPermissions = localStorage.getItem(environment.permissionsKey);
      if (jsonPermissions) {
        const perms = JSON.parse(jsonPermissions);
        this.ngxPermissionsService.loadPermissions(perms);
      } else {
        this.ngxPermissionsService.flushPermissions();
      }
    }
  }

  // // Se solicita confirmacion antes de cerrar el browser.
  // @HostListener('window:beforeunload', ['$event'])
  // onbeforeunload(event) {
  //   event.returnValue = 'Se perderán todos sus datos.';
  // }

}
