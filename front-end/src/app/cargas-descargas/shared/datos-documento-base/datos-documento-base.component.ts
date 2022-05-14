import { OnDestroy, ViewChild, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DescargaEventsNotifierService } from '../services/descarga-events-notifier.service';
import { Movimiento } from '../../../shared/data-models/movimiento';
import { PatentesComponent } from '../../../shared/patentes/patentes.component';
import { ParametrosTerminalService } from '../services/parametros-terminal.service';
import { FormComponentService } from '../../../../app/core/services/formComponent/formComponent.service';
import { Destinatario } from '../../../shared/data-models/destinatario';

export abstract class DatosDocumentoBaseComponent implements OnDestroy {

  @Input() esAlta = false;
  @Input() circuitoContemplaCupo = false;
  @ViewChild('patentes') patentesComponent: PatentesComponent;
  protected onDestroy = new Subject();
  protected destinatarioPorDefecto: Destinatario;
  protected kgsBrutosEstimados: number;
  protected kgsTaraEstimados: number;

  constructor(protected readonly eventsNotifierService: DescargaEventsNotifierService,
              protected readonly parametrosTerminalService: ParametrosTerminalService,
              protected readonly formComponentService: FormComponentService) {
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  focusPatente(): void {
    if (this.patentesComponent) {
      this.patentesComponent.setFocus();
    }
  }

  protected subscribeFormInteraction(): void {
    this.eventsNotifierService.parentFormHasBeenReseted
      .pipe(
        takeUntil(this.onDestroy)
      )
      .subscribe(() =>
        this.resetForm()
      );

    this.eventsNotifierService.movimientoRetrieved
      .pipe(
        takeUntil(this.onDestroy)
      )
      .subscribe((movimiento: Movimiento) => {
        this.loadMovimiento(movimiento);
      }
    );
  }

  protected abstract createForm(): void;
  protected abstract resetForm(): void;
  protected abstract loadMovimiento(movimiento: Movimiento): void;

  protected setearDestinatarioPorDefecto(esConsulta: boolean, esFueraCircuito: boolean, accessor = 'destinatario'): void {
    if (!esConsulta && !esFueraCircuito && !this.circuitoContemplaCupo) {
      this.parametrosTerminalService.getParametros().pipe(takeUntil(this.onDestroy))
      .subscribe(parametros => {
        if (parametros.destinatarioPorDefecto) {
          this.destinatarioPorDefecto = parametros.destinatarioPorDefecto;
          this.formComponentService.setValue(accessor, parametros.destinatarioPorDefecto, {onlySelf: true});
        }
      });
    }
  }

  protected obtenerKgsEstimadosPorDefecto(esAlta: boolean, accessor = 'kilosBrutosTaraGroup'): void {
    if (esAlta) {
      this.parametrosTerminalService.getParametros().pipe(takeUntil(this.onDestroy))
      .subscribe(parametros => {
        this.kgsBrutosEstimados = parametros.kgsBrutosEstimados;
        this.kgsTaraEstimados = parametros.kgsTaraEstimados;
        this.formComponentService.setValue(accessor, { kilosBruto: this.kgsBrutosEstimados, kilosTara: this.kgsTaraEstimados });
      });
    }
  }
}
