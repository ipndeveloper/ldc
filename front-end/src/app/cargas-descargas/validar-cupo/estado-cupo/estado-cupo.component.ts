import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { EstadoVigenciaCupoDataView } from '../../../shared/data-models/Estado-vigencia-cupo-data-view';
import { EstadosCupo } from '../../../shared/enums/enums';

@Component({
  selector: 'yrd-estado-cupo',
  templateUrl: './estado-cupo.component.html',
  styleUrls: ['./estado-cupo.component.css']
})
export class EstadoCupoComponent implements OnInit, OnChanges {
  @Input() estadoCupoForm: FormGroup;
  @Input() estadoCupoDataView: EstadoVigenciaCupoDataView;

  constructor(private readonly fcService: FormComponentService) { }
  ngOnInit() {
  }

  ngOnChanges(): void {
    if (this.estadoCupoDataView) {
        this.resetEstadoCupoGroup();
        this.loadDatosCupo();
    }
  }

  private resetEstadoCupoGroup() {
    const estadoCupoFormGroup = this.fcService.getControl('datosDocumento.estadoCupo');
    if (estadoCupoFormGroup) {
      estadoCupoFormGroup.reset();
    }
  }

  loadDatosCupo() {
    if (this.estadoCupoDataView) {
      if (this.estadoCupoDataView.estadoCodigoCupo) {
        if (this.estadoCupoDataView.estadoCodigoCupo.id === EstadosCupo.ConCupoAnterior) {
          this.LoadEstadoCupo('datosDocumento.estadoCupo.estadoCupoAnterior');
        }
        if (this.estadoCupoDataView.estadoCodigoCupo.id === EstadosCupo.ConCupoVigente) {
          this.LoadEstadoCupo('datosDocumento.estadoCupo.estadoCupoVigente');
        }
        if (this.estadoCupoDataView.estadoCodigoCupo.id === EstadosCupo.ConCupoSiguiente) {
          this.LoadEstadoCupo('datosDocumento.estadoCupo.estadoCupoSiguiente');
        }
        if (this.estadoCupoDataView.estadoCodigoCupo.id === EstadosCupo.SinCupo) {
          this.LoadEstadoCupo('datosDocumento.estadoCupo.sinCupo');
        }
      } else {
        this.LoadEstadoCupo('datosDocumento.estadoCupo.sinCupo');
      }
    }
  }

  private LoadEstadoCupo(formGroup: string) {
    this.fcService.setValue(formGroup + `.otorgados`, this.estadoCupoDataView.otorgados, {onlySelf: true});
    this.fcService.setValue(formGroup + `.ingresados`, this.estadoCupoDataView.ingresados, {onlySelf: true});
    this.fcService.setValue(formGroup + `.saldo`, this.estadoCupoDataView.saldo, {onlySelf: true});
    this.fcService.setValue(formGroup + `.fechaCupo`, this.estadoCupoDataView.fechaFormat, {onlySelf: true});
    this.fcService.setValue(formGroup + `.habilitado`, true, {onlySelf: true});
  }
}
