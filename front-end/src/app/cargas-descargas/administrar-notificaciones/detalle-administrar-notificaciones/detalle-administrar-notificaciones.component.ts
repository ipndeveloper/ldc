import { Component, Input, ViewChild, OnChanges, SimpleChanges, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { DatosDestinatariosComponent } from './datos-destinatarios/datos-destinatarios.component';
import { DestinatarioDataView } from '../../../shared/data-models/mail-template-data-view';
import { Resources } from '../../../../locale/artifacts/resources';
import { DesplegableTerminalComponent } from '../../../shared/desplegable-terminal/desplegable-terminal.component';
import { TextoConEtiquetaComponent } from '../../../core/controls/texto-con-etiqueta/texto-con-etiqueta.component';
import { Permission, TiposNotificacion } from '../../../shared/enums/enums';
import { takeUntil, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { EntityWithDescription } from '../../../core/models/entity-with-description';

@Component({
  selector: 'yrd-detalle-administrar-notificaciones',
  templateUrl: './detalle-administrar-notificaciones.component.html',
  styleUrls: ['./detalle-administrar-notificaciones.component.css']
})
export class DetalleAdministrarNotificacionesComponent
  implements OnChanges, OnDestroy {

  @ViewChild('datosDestinatarios') datosDestinatarios: DatosDestinatariosComponent;
  @ViewChild('terminal') terminal: DesplegableTerminalComponent;
  @ViewChild('asunto') asunto: TextoConEtiquetaComponent;
  @Input() form: FormGroup;
  @Input() disableActions = false;
  @Input() esConsulta = false;
  @Input() esModificacion = false;
  @Output() eliminarDestinatarios = new EventEmitter();
  private readonly onDestroy = new Subject();
  disableActionsDatos = false;
  enableDesplegableMotivo = false;
  enableDesplegableEstado = false;
  readonly Permission = Permission;
  readonly validationMessagesTerminal = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Terminal)
  };
  readonly validationMessagesTipoNotificacion = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Notificacion)
  };
  readonly validationMessagesAsunto = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Subject)
  };
  readonly validationMessagesCuerpo = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Cuerpo)
  };
  readonly validationMessagesMotivo = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Motivo)
  };
  readonly validationMessagesEstado = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Estado)
  };

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    // Las notificaciones de suplencias tienen destinatarios dinamicos,
    // por lo que no debe habilitarse la seccion de destinatarios
    const changesForm = changes['form'];
    if (this.form && changesForm && changesForm.previousValue !== changesForm.currentValue) {
      this.form.controls.tipoNotificacion.valueChanges
        .pipe(
          takeUntil(this.onDestroy),
          distinctUntilChanged()
        )
        .subscribe((tipoNotificacion: EntityWithDescription) => {
          if (tipoNotificacion) {
            const tiposNotificacionSuplencias = [
              TiposNotificacion.SuplenciaGeneracionSuplencia,
              TiposNotificacion.SuplenciaInicioSuplencia,
              TiposNotificacion.SuplenciaFinSuplencia,
            ];
            const tiposNotificacionBalanza = [
              TiposNotificacion.BalanzaErroresSalidaSinDescarga,
              TiposNotificacion.BalanzaErroresSalidaConDescarga,
              TiposNotificacion.BalanzaErroresEntrada
            ];

            this.disableActionsDatos = tiposNotificacionSuplencias.some(n => tipoNotificacion.id === n);
            if (this.disableActionsDatos) {
              this.eliminarDestinatarios.emit();
            }

            this.enableDesplegableMotivo = tiposNotificacionBalanza.some(n => tipoNotificacion.id === n);
            if (this.enableDesplegableMotivo) {
              this.form.controls.motivo.setValidators(Validators.required);
              this.form.controls.motivo.updateValueAndValidity();
            } else {
              this.form.controls.motivo.setValue('');
              this.form.controls.motivo.clearValidators();
              this.form.controls.motivo.updateValueAndValidity();
            }

            this.enableDesplegableEstado = tipoNotificacion.id === TiposNotificacion.MovimientoTiempolimiteExcedidoEstado;
            if (this.enableDesplegableEstado) {
              this.form.controls.estado.setValidators(Validators.required);
              this.form.controls.estado.updateValueAndValidity();
            } else {
              this.form.controls.estado.setValue('');
              this.form.controls.estado.clearValidators();
              this.form.controls.estado.updateValueAndValidity();
            }

          } else {
            this.disableActionsDatos = false;
          }
        });
    }
  }

  onIncluirCuerpo(): void {
    this.agregarVariableTemplateAlControl(this.form.controls.cuerpo);
  }

  private agregarVariableTemplateAlControl(control: AbstractControl): void {
    const tags = (this.form.controls.variableTemplate.value).map(e => `{${e.descripcion}}`);
    const stringTags = tags.join(' ');
    control.setValue(`${control.value || ''}${stringTags}`);
  }

  refreshGrid(): void {
    this.datosDestinatarios.refreshGrid();
  }

  setDestinatarios(destinatarios: DestinatarioDataView[]): any {
    this.datosDestinatarios.setDestinatarios(destinatarios);
  }

  setFocus(): void {
    setTimeout(() => {
      if (this.esModificacion) {
        this.asunto.setFocus();
      } else {
        this.terminal.setFocus();
      }
    }, 0);
  }

  ngOnDestroy(): void {
    this.onDestroy.next(true);
    this.onDestroy.complete();
    this.onDestroy.unsubscribe();
  }
}
