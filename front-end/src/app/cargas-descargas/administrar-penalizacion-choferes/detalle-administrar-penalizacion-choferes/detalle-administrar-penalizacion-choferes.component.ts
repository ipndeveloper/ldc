import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs/operators';
import { Resources } from '../../../../locale/artifacts/resources';
import { BuscadorChoferComponent } from '../../../shared/buscador-chofer/buscador-chofer.component';

@Component({
  selector: 'yrd-detalle-administrar-penalizacion-choferes',
  templateUrl: './detalle-administrar-penalizacion-choferes.component.html',
  styleUrls: ['./detalle-administrar-penalizacion-choferes.component.css']
})
export class DetalleAdministrarPenalizacionChoferesComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() esConsulta: boolean;

  @ViewChild('chofer') chofer: BuscadorChoferComponent;

  validationMessagesChofer = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Chofer)
  };

  validationMessagesResponsablePenalizacion = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Responsable)
  };

  validationMessagesCuerpo = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.MotivoSancion)
  };

  validationMessagesFechaDesde = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.FechaDesde)
  };

  validationMessagesFechaHasta = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.FechaHasta)
  };


  constructor() { }

  ngOnInit() {
    this.subscribeCambioDetalle();
  }

  private subscribeCambioDetalle() {
    this.subscribeCambioHabilitado();
  }

  private subscribeCambioHabilitado() {
    const actividad = this.form.get('habilitado');
    const responsableLevantamiento = this.form.get('responsableLevantamiento');
    if (actividad) {
      actividad.valueChanges.pipe(distinctUntilChanged()).subscribe((value: boolean) => {
        if (responsableLevantamiento && !this.esConsulta) {
          if (value) {
            responsableLevantamiento.disable();
          } else {
            responsableLevantamiento.enable();
          }
        }
      });
    }
  }

  public setFocus(): void {
    setTimeout(() => {
      this.chofer.setFocus();
    }, 0);
  }

}
