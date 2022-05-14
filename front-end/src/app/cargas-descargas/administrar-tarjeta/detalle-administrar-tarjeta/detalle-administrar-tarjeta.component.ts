import { Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DesplegableTerminalComponent } from '../../../shared/desplegable-terminal/desplegable-terminal.component';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { AdministrarTarjetaService } from '../administrar-tarjeta.service';
import { EntityWithDescription } from '../../../core/models/entity-with-description';
import { Resources } from '../../../../locale/artifacts/resources';
import { Permission } from '../../../shared/enums/enums';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'yrd-detalle-administrar-tarjeta',
  templateUrl: './detalle-administrar-tarjeta.component.html',
  styleUrls: ['./detalle-administrar-tarjeta.component.css']
})
export class DetalleAdministrarTarjetaComponent
  implements OnInit, OnDestroy {

  @Input() form: FormGroup;
  @Input() esAltaMasiva = false;
  @ViewChild('terminal') terminal: DesplegableTerminalComponent;
  private onDestroy: ReplaySubject<boolean> = new ReplaySubject(1);
  readonly permission = Permission;
  readonly validationMessagesTerminal = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Terminal)
  };
  readonly validationMessagesNumero = {
    required: Resources.Messages.ElXEsRequerido.format(Resources.Labels.NumeroTarjeta),
    rangoIngresadoIncorrecto: Resources.Messages.CodigoTarjetaHastaMayorACodigoTarjetaDesde
  };

  constructor(private readonly service: AdministrarTarjetaService) {
  }

  ngOnInit(): void {
    this.subscribeCambioTerminal();
  }

  ngOnDestroy(): void {
    this.onDestroy.next(true);
    this.onDestroy.complete();
  }

  setFocus(): void {
    setTimeout(() => {
      this.terminal.setFocus();
    }, 0);
  }

  private subscribeCambioTerminal(): void {
    const terminal = this.form.get('terminal');
    if (terminal) {
      terminal.valueChanges.pipe(
        distinctUntilChanged(),
        takeUntil(this.onDestroy)
      ).subscribe((value: EntityWithDescription) => {
        if (value && value.id) {
          this.service.getTipoTarjetaPorTerminal(value.id).subscribe((data: EntityWithDescription) => {
            if (data) {
              this.form.controls.tipoTarjeta.setValue(data.descripcion);
            }
          });
        }
      });
    }
  }
}
