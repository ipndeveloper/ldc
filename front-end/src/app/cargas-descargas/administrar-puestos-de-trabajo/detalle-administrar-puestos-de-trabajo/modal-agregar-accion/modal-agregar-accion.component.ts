import { ModalComponent } from '../../../../core/components/modal/modal.component';
import { Component, OnInit, ViewChild, Output, EventEmitter, Input, ElementRef } from '@angular/core';
import { FormComponentService } from '../../../../core/services/formComponent/formComponent.service';
import { AccionPuestoTrabajoDataView } from '../../../../shared/data-models/puesto-trabajo-data-view';
import { Resources } from '../../../../../locale/artifacts/resources';
import { PopupService } from '../../../../core/services/popupService/popup.service';
import { FormGroup, Validators, FormArray } from '@angular/forms';
import { Collection } from '../../../../core/models/collection';
import { DesplegableAccionComponent } from '../../../../shared/desplegable-accion/desplegable-accion.component';

@Component({
  selector: 'yrd-modal-agregar-accion',
  templateUrl: './modal-agregar-accion.component.html',
  styleUrls: ['./modal-agregar-accion.component.css']
})

export class ModalAgregarAccionComponent implements OnInit {

  @ViewChild('modalComponent') modal: ModalComponent;
  @ViewChild('accion') accion: DesplegableAccionComponent;
  @ViewChild('automatico') checkBox: ElementRef;
  @Input() form: FormGroup;
  @Input() formListaAcciones: FormArray;
  @Output() accepted = new EventEmitter();
  @Output() closing = new EventEmitter();

  private readonly fcService: FormComponentService;
  private accionPuestoTrabajo: AccionPuestoTrabajoDataView | null = null;
  labelHeader = 'Editar acción por puesto de trabajo';

  validationMessagesAccion = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Accion)
  };

  constructor(private readonly popupService: PopupService) {
    this.fcService = new FormComponentService(this.popupService);
  }

  ngOnInit() {
  }

  open() {
    this.fcService.initialize(this.form);
    this.updateValidators(true);
    if (this.accionPuestoTrabajo) {
      this.fcService.setValue('id', this.accionPuestoTrabajo.id, {onlySelf: true});
      this.fcService.setValue('accion', this.accionPuestoTrabajo.accion, {onlySelf: true}, true);
      this.fcService.setValue('automatico', this.accionPuestoTrabajo.automatico, {onlySelf: true}, false);
      this.fcService.setValue('habilitado', this.accionPuestoTrabajo.habilitado, {onlySelf: true}, false);
    } else {
      this.fcService.setValue('id', Math.floor(Math.random() * -1000), {onlySelf: true});
      this.fcService.enableControl('accion');
      this.fcService.setValue('automatico', true, {onlySelf: true});
      this.fcService.setValue('habilitado', true, {onlySelf: true}, true);
    }
    this.modal.open();
    if (this.accionPuestoTrabajo) {
      setTimeout(() => this.checkBox.nativeElement.focus(), 0);
    } else {
      setTimeout(() => this.accion.setFocus(), 0);
    }
  }

  onAccept() {
    const errors = new Collection<string>();
    this.fcService.validateForm(this.form.controls, errors, '');
    this.fcService.showValidationError(errors);

    if (this.fcService.isValidForm() && !this.esAccionRepetida()) {
      this.accepted.emit();
    }
  }

  private esAccionRepetida(): boolean {
    if (this.formListaAcciones &&
      this.form.value.accion &&
      this.formListaAcciones.controls.some(c => c.value.accion.id === this.form.value.accion.id)) {
        this.popupService.error(Resources.Messages.NoSePermiteIngresarAccionesRepetidas, Resources.Labels.Error);
        return true;
    }
    return false;
  }

  close() {
    this.updateValidators(false);
    this.modal.close();
  }

  onClosing() {
    this.accionPuestoTrabajo = null;
    this.form.reset();
    this.closing.emit();
    this.updateValidators(false);
  }

  modificar(rolTerminal: AccionPuestoTrabajoDataView) {
    this.accionPuestoTrabajo = rolTerminal;
    this.open();
  }

  private updateValidators(required: boolean) {
    if (required) {
      this.form.controls.accion.setValidators(Validators.required);
    } else {
      this.form.controls.accion.clearValidators();
    }
  }
}
