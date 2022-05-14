import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalComponent } from '../../../../core/components/modal/modal.component';
import { Resources } from '../../../../../locale/artifacts/resources';
import { AgregarTrabajoGeneracionArchivoMuestrasCommand } from '../../../../shared/data-models/commands/cargas-descargas/agregar-trabajo-generacion-archivo-muestras-command';
import { fechaDebeSerMenorIgualAFechaDelDia } from '../../validators/fecha.validator';

@Component({
  selector: 'yrd-modal-agregar-trabajo-generacion-archivos-muestra',
  templateUrl: './modal-agregar-trabajo-generacion-archivos-muestra.component.html',
  styleUrls: ['./modal-agregar-trabajo-generacion-archivos-muestra.component.css']
})
export class ModalAgregarTrabajoGeneracionArchivosMuestraComponent implements OnInit {

  @ViewChild('modalComponent') modal: ModalComponent;
  @Output() accepted: EventEmitter<AgregarTrabajoGeneracionArchivoMuestrasCommand> = new EventEmitter();
  @Input() labelHeader = 'Enviar muestra a Cámara';
  agregarTrabajoGeneracionArchivosMuestraForm: FormGroup;

  validationMessagesFechaAutorizacionDesde = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.FechaAutorizacionDesde),
    fechaDebeSerMenorIgualAFechaDelDia: Resources.Messages.FechaIngresadaMenorOIgualADiaHoy
  };

  validationMessagesFechaAutorizacionHasta = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.FechaAutorizacionHasta),
    fechaDebeSerMenorIgualAFechaDelDia: Resources.Messages.FechaIngresadaMenorOIgualADiaHoy
  };

  constructor(private readonly fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.agregarTrabajoGeneracionArchivosMuestraForm = this.fb.group({
      fechaAutorizacionDesde: [{ value: '', disabled: false }, [Validators.required, fechaDebeSerMenorIgualAFechaDelDia()]],
      fechaAutorizacionHasta: [{ value: '', disabled: false }, [Validators.required, fechaDebeSerMenorIgualAFechaDelDia()]],
      enviaMail: { value: false, disabled: false }
    });
  }

  onAccept() {
    if (this.agregarTrabajoGeneracionArchivosMuestraForm.valid) {
      const command = new AgregarTrabajoGeneracionArchivoMuestrasCommand(
        this.agregarTrabajoGeneracionArchivosMuestraForm.controls.fechaAutorizacionDesde.value,
        this.agregarTrabajoGeneracionArchivosMuestraForm.controls.fechaAutorizacionHasta.value,
        this.agregarTrabajoGeneracionArchivosMuestraForm.controls.enviaMail.value,
        true);
      this.accepted.emit(command);
      this.modal.close();
    } else {
      const fechaDesde = this.agregarTrabajoGeneracionArchivosMuestraForm.get('fechaAutorizacionDesde');
      const fechaHasta = this.agregarTrabajoGeneracionArchivosMuestraForm.get('fechaAutorizacionHasta');
      if (fechaDesde && fechaHasta) {
        fechaDesde.markAsTouched();
        fechaHasta.markAsTouched();

        fechaDesde.updateValueAndValidity();
        fechaHasta.updateValueAndValidity();
      }
    }
  }

  open() {
    this.modal.open();
    this.createForm();
  }

  onClosing() {
    this.agregarTrabajoGeneracionArchivosMuestraForm.reset();
  }
}
