import { OnInit } from '@angular/core';

import { ControlarDescargasBaseComponent } from '../controlar-descargas-base/controlar-descargas-base.component';
import { PopupService } from '../../../core/services/popupService/popup.service';
import { NavigationService } from '../../../core/services/navigationService/navigation.service';
import { MovimientoService } from '../services/movimiento.service';
import { CircuitoService } from '../services/circuito.service';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { AuthService } from '../../../core/services/session/auth.service';
import { Resources } from '../../../../locale/artifacts/resources';
import { DescargaEventsNotifierService } from '../services/descarga-events-notifier.service';
import { CommandService } from '../../../shared/command-service/command.service';

export abstract class ModificarDescargasBaseComponent extends ControlarDescargasBaseComponent implements OnInit {
  nroDocModificado = '';
  esFueraCircuito = false;

  constructor(popupService: PopupService,
              navigationService: NavigationService,
              movimientoService: MovimientoService,
              circuitoService: CircuitoService,
              fcService: FormComponentService,
              authService: AuthService,
              eventsNotifierService: DescargaEventsNotifierService,
              protected readonly commandService: CommandService) {
    super(popupService,
      navigationService,
      movimientoService,
      circuitoService,
      fcService,
      authService,
      eventsNotifierService,
      commandService);
    const userContext = this.authService.getUserContext();
    if (userContext) {
      this.terminal = userContext.terminal;
    }
  }

  ngOnInit() {
    this.createForm();
    this.fcService.initialize(this.form);
    this.subscribeToControlChanges();
    this.subscribeNavigation();
    this.subscribeFormInteraction();
  }

  protected successfulResult() {
    this.popupService.success(Resources.Messages.DescargaCamionGuardada, Resources.Labels.Aceptar);
    setTimeout(() => { this.navigationService.navigateBack(); }, 1500);
    this.resetForm();
  }

  cancelar() {
    this.popupService.warning('Se Canceló el ingreso de la descarga.', 'Cancelar');
    if (this.esModificacion) {
      this.destroyedByNavigation = true;
      setTimeout(() => this.navigationService.navigateBack(), 1500);
    } else {
      this.resetForm();
    }
  }
}
