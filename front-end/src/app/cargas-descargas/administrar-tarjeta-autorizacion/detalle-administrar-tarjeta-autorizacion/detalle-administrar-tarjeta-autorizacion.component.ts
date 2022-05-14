import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DesplegableTerminalComponent } from '../../../shared/desplegable-terminal/desplegable-terminal.component';
import { Permission } from '../../../shared/enums/enums';
import { Resources } from '../../../../locale/artifacts/resources';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { EntityWithDescription } from '../../../core/models/entity-with-description';
import { AdministrarTarjetaAutorizacionService } from '../administrar-tarjeta-autorizacion.service';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'yrd-detalle-administrar-tarjeta-autorizacion',
  templateUrl: './detalle-administrar-tarjeta-autorizacion.component.html',
  styleUrls: ['./detalle-administrar-tarjeta-autorizacion.component.css']
})
export class DetalleAdministrarTarjetaAutorizacionComponent
  implements OnInit, OnDestroy {

  @Input() form: FormGroup;
  @ViewChild('terminal') terminal: DesplegableTerminalComponent;

  private onDestroy: ReplaySubject<boolean> = new ReplaySubject(1);
  readonly Permission = Permission;
  readonly validationMessagesTerminal = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Terminal)
  };
  readonly validationMessagesUsuario = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Usuario),
    searchValueNotValid: Resources.Messages.ElValorIngresadoParaElCampoXNoEsValido.format(Resources.Labels.Usuario)
  };
  readonly validationMessagesNumero = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.CodigoTarjeta)
  };

  constructor(private readonly service: AdministrarTarjetaAutorizacionService) {}

  ngOnInit(): void {
    this.subscribeCambioTerminal();
  }

  ngOnDestroy(): void {
    this.onDestroy.next(true);
    this.onDestroy.complete();
  }

  private subscribeCambioTerminal(): void {
    const terminalCtrl = this.form.get('terminal');
    if (terminalCtrl) {
      terminalCtrl.valueChanges.pipe(
        distinctUntilChanged(),
        takeUntil(this.onDestroy)
      ).subscribe((terminal: EntityWithDescription) => {
        if (terminal && terminal.id) {
          this.service.getTipoTarjetaPorTerminal(terminal.id).pipe(
            takeUntil(this.onDestroy)
          ).subscribe((tipoTarjeta: EntityWithDescription) => {
            if (tipoTarjeta) {
              this.form.controls.tipoTarjeta.setValue(tipoTarjeta.descripcion);
            }
          });
        }
      });
    }
  }

  setFocus(): void {
    setTimeout(() => this.terminal.setFocus(), 0);
  }
}
