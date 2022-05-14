import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators,  } from '@angular/forms';
import { LoginService } from '../core/services/session/login.service';
import { AuthService } from '../core/services/session/auth.service';
import { NavigationService } from '../core/services/navigationService/navigation.service';
import { SecurityService } from '../core/services/session/security.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { MenuIdentifiers } from '../shared/enums/enums';
import { Resources } from '../../locale/artifacts/resources';
import { FormComponentService } from '../core/services/formComponent/formComponent.service';
import { Collection } from '../core/models/collection';
import { environment } from '../../environments/environment';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { PopupService } from '../core/services/popupService/popup.service';
import { NgProgressRef, NgProgress } from '@ngx-progressbar/core';
import { ParametrosService } from '../shared/parametros-service/parametros.service';
import { Terminal } from '../shared/data-models/terminal';
import { DesplegableTerminalLoginComponent } from '../shared/desplegable-terminal-login/desplegable-terminal-login.component';

@Component({
  selector: 'yrd-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  faUser = faUser;
  faLock = faLock;

  formUsuarioContrasenia: FormGroup;
  formUsuarioTerminal: FormGroup;
  ambiente = '';
  version = '';
  ubicacionFisica = '';
  muestraContrasenia = true;
  muestraTerminales = false;
  progressRef: NgProgressRef;

  terminales: Terminal[];
  @ViewChild('terminal') desplegableTerminalLoginComponent: DesplegableTerminalLoginComponent;

  private fcsUsuarioContrasenia: FormComponentService;
  private fcsUsuarioTerminal: FormComponentService;

  constructor(private readonly formBuilder: FormBuilder,
              private readonly loginService: LoginService,
              private readonly authenticationService: AuthService,
              private readonly navigationService: NavigationService,
              private readonly securityService: SecurityService,
              private readonly permissionsService: NgxPermissionsService,
              private readonly popupService: PopupService,
              private readonly progress: NgProgress,
              private readonly parametrosService: ParametrosService) {
                this.fcsUsuarioContrasenia = new FormComponentService(this.popupService);
                this.fcsUsuarioTerminal = new FormComponentService(this.popupService);
              }

  validationMessagesTerminal = {
    required: Resources.Messages.ElCampoXEsRequerido.format('Terminal')
  };

  ngOnInit() {
    this.crearForm();
    this.progressRef = this.progress.ref('loginProgress');

    this.authenticationService.logout();

    this.version = this.parametrosService.version;
    this.parametrosService.obtenerAmbiente().subscribe((ambiente: string) => this.ambiente = ambiente);
    this.parametrosService.obtenerUbicacionFisica().subscribe((ubicacionFisica: string) => this.ubicacionFisica = ubicacionFisica);
  }

  private crearForm(): void {

    this.formUsuarioContrasenia = this.formBuilder.group({
      usuario: [ {value: '', disabled: false}, Validators.required],
      contrasenia: [{ value: '', disabled: false }, Validators.required]
    });
    this.formUsuarioTerminal = this.formBuilder.group({
      usuario: [ {value: '', disabled: true}, Validators.required],
      contrasenia: [{ value: '', disabled: false }, Validators.required],
      terminal: [{ value: '', disabled: false }, Validators.required]
    });

    this.fcsUsuarioTerminal.initialize(this.formUsuarioTerminal);
    this.fcsUsuarioContrasenia.initialize(this.formUsuarioContrasenia);
  }

  buscarTerminales(): void {
    if (!this.fcsUsuarioContrasenia.isValidForm()) {
      const errors = new Collection<string>();
      this.fcsUsuarioContrasenia.validateForm(this.formUsuarioContrasenia.controls, errors, '');
      this.fcsUsuarioContrasenia.showValidationError(errors);

      return;
    }

    const usuario = this.fcsUsuarioContrasenia.getValue('usuario');
    const contrasenia = this.fcsUsuarioContrasenia.getValue('contrasenia');

    this.loginService.obtenerTerminalesUsuario(usuario, contrasenia).subscribe(terminales => {
      this.terminales = terminales;

      this.muestraContrasenia = false;
      this.muestraTerminales = true;

      setTimeout(() => {
        this.desplegableTerminalLoginComponent.setFocus();
      }, 0);

      this.fcsUsuarioTerminal.setValue('usuario',  usuario, {onlySelf: true}, true);
      this.fcsUsuarioTerminal.setValue('contrasenia',  contrasenia, {onlySelf: true});

      if (this.terminales.length === 1) {
        this.fcsUsuarioTerminal.setValue('terminal',  this.terminales[0], {onlySelf: true});

        setTimeout(() => this.ingresar(), 0);
      }
    });
  }

  ingresar(): void {
    if (!this.fcsUsuarioTerminal.isValidForm()) {
      const errors = new Collection<string>();
      this.fcsUsuarioTerminal.validateForm(this.formUsuarioTerminal.controls, errors, '');
      this.fcsUsuarioTerminal.showValidationError(errors);

      return;
    }

    this.progressRef.start();

    const usuario = this.fcsUsuarioTerminal.getValue('usuario');
    const contrasenia = this.fcsUsuarioTerminal.getValue('contrasenia');
    const terminal = this.fcsUsuarioTerminal.getValue('terminal');

    this.loginService.login(usuario, contrasenia, terminal).subscribe(token => {

      if (token != null) {
        this.authenticationService.setSession(token);

        localStorage.setItem(environment.currentUserKey, usuario);
        localStorage.setItem(environment.terminalKey, this.formUsuarioTerminal.controls.terminal.value.descripcion);

        this.securityService.getPermissions().subscribe(permissions => {

          if ((permissions && permissions.length === 0) || !permissions) {
            this.popupService.error(Resources.Messages.FaltaConfigurarLosPermisosDeAccesoALasOpcionesDeMenuEnLaPcIngresada);
          }

          localStorage.setItem(environment.permissionsKey, JSON.stringify(permissions));

          this.permissionsService.loadPermissions(permissions);
          this.navigationService.navigate(MenuIdentifiers.Login, MenuIdentifiers.Home);
        });
      }

      this.progressRef.complete();
    });
  }

}
