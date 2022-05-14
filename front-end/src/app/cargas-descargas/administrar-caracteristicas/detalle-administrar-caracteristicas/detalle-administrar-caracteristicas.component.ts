import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AdministrarCaracteristicasService } from '../administrar-caracteristicas.service';
import { Caracteristica } from '../../../shared/data-models/caracteristica';
import { DesplegableCaracteristicaComponent } from '../../../shared/desplegable-caracteristica/desplegable-caracteristica.component';
import { distinctUntilChanged } from 'rxjs/operators';
import { Actividad } from '../../../shared/data-models/actividad';
import { DesplegableCircuitoComponent } from '../../../shared/desplegable-circuito/desplegable-circuito.component';
import { Resources } from '../../../../locale/artifacts/resources';
import { Permission } from '../../../shared/enums/enums';

@Component({
  selector: 'yrd-detalle-administrar-caracteristicas',
  templateUrl: './detalle-administrar-caracteristicas.component.html',
  styleUrls: ['./detalle-administrar-caracteristicas.component.css']
})
export class DetalleAdministrarCaracteristicasComponent implements OnInit {

  @ViewChild('desplegableCaracteristica') desplegableCaracteristica: DesplegableCaracteristicaComponent;
  @ViewChild('desplegableCircuito') desplegableCircuito: DesplegableCircuitoComponent;
  @ViewChild('habilitado') habilitado: ElementRef;
  @Input() form: FormGroup;
  @Input() esConsulta: false;
  @Input() esModificacion: false;
  constructor(private readonly service: AdministrarCaracteristicasService) { }

  Permission = Permission;
  validationMessagesCircuito = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Circuito)
  };

  validationMessagesActividad = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Actividad)
  };

  validationMessagesCaracteristica = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Caracteristica)
  };

  ngOnInit() {
    this.subscribeCambioDetalle();
  }

  private subscribeCambioDetalle() {
    this.subscribeCambioActividad();
  }

  private subscribeCambioActividad() {
    const actividad = this.form.get('actividadCircuito');
    if (actividad) {
      actividad.valueChanges.pipe(distinctUntilChanged()).subscribe((value: Actividad) => {
        if (value && value.id) {
          this.service.getCaracteristicasPorActividad(value.id).subscribe(data => {
            if (data && !this.esConsulta && !this.esModificacion ) {
              this.setCaracteristicas(data);
            }});
        }
      });
    }
  }

  setFocusCircuito() {
    setTimeout(() => {
      this.desplegableCircuito.setFocus();
    }, 0);
  }

  setFocusHabilitado() {
    setTimeout(() => {
      this.habilitado.nativeElement.focus();
    }, 500);
  }

  public setCaracteristicas(caracteristica: Caracteristica[]) {
    this.desplegableCaracteristica.entities = caracteristica;
  }

  public clearCaracteristicas() {
    this.desplegableCaracteristica.clear();
  }

}
