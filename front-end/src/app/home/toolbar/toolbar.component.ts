import { Component, OnInit, Input } from '@angular/core';
import { ToolbarService } from './toolbar.service';
import { MenuItem } from '../../core/models/menuItem';
import { Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../core/services/session/auth.service';
import { NavigationService } from '../../core/services/navigationService/navigation.service';
import { MenuIdentifiers } from '../../shared/enums/enums';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'yrd-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  menuItems: MenuItem[];
  title: string;
  faPowerOff = faPowerOff;

  @Input() ambiente = '';
  @Input() ubicacionFisica = '';

  get usuarioLogueado(): string {
    return localStorage.getItem(environment.currentUserKey) as string;
  }

  get terminalLogueada(): string {
    return localStorage.getItem(environment.terminalKey) as string;
  }

  constructor(private readonly toolbarService: ToolbarService,
              private readonly router: Router,
              private readonly titleService: Title,
              private readonly authService: AuthService,
              private readonly navigationService: NavigationService) {
  }

  ngOnInit() {
    this.menuItems = this.toolbarService.getMenuItems();
    this.setTitle();

    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {
        this.setTitle();
    });
  }

  private setTitle() {
    const menuItem = this.toolbarService.resolveMenuItem();
    if (menuItem) {
      this.titleService.setTitle(menuItem.title);
      this.title = menuItem.title;
    }
  }

  onCerrarSesion() {
    this.authService.logout();
    this.navigationService.clearCache();
    this.navigationService.navigate(MenuIdentifiers.Home, MenuIdentifiers.Login);
  }
}
