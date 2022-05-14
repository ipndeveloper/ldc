import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { ModalComponent } from '../../../../core/components/modal/modal.component';
import { FormGroup, Validators, FormArray } from '@angular/forms';
import { FormComponentService } from '../../../../core/services/formComponent/formComponent.service';
import { DispositivoPuestoTrabajoDataView } from '../../../../shared/data-models/puesto-trabajo-data-view';
import { Resources } from '../../../../../locale/artifacts/resources';
import { Collection } from '../../../../core/models/collection';
import { PopupService } from '../../../../core/services/popupService/popup.service';
import { EntityWithDescription } from '../../../../core/models/entity-with-description';
import { DesplegableTipoDispositivoComponent } from '../../../../shared/desplegable-tipo-dispositivo/desplegable-tipo-dispositivo.component';
import { DesplegableDispositivoComponent } from '../../../../shared/desplegable-dispositivo/desplegable-dispositivo.component';

@Component({
  selector: 'yrd-modal-agregar-dispositivo',
  templateUrl: './modal-agregar-dispositivo.component.html',
  styleUrls: ['./modal-agregar-dispositivo.component.css']
})

export class ModalAgregarDispositivoComponent implements OnInit {

  @ViewChild('modalComponent') modal: ModalComponent;
  @ViewChild('tipoDispositivo') tipoDispositivo: DesplegableTipoDispositivoComponent;
  @ViewChild('tipoDispositivoActual') tipoDispositivoActual: DesplegableDispositivoComponent;
  @ViewChild('checkbox') checkBox: ElementRef;
  @Input() form: FormGroup;
  @Input() terminalActual: EntityWithDescription | null;
  @Input() formListaDispositivos: FormArray;
  @Output() accepted = new EventEmitter();
  @Output() closing = new EventEmitter();

  private readonly fcService: FormComponentService;
  private dispositivoPuestoTrabajo: DispositivoPuestoTrabajoDataView | null = null;
  labelHeader = 'Editar dispositivo por puesto de trabajo';

  validationMessagesTipoDispositivo = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.TipoDispositivo)
  };

  validationMessagesDispositivo = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Dispositivo)
  };

  constructor(private readonly popupService: PopupService) {
    this.fcService = new FormComponentService(this.popupService);
  }

  ngOnInit() {
  }

  open() {
    this.fcService.initialize(this.form);
    this.updateValidators(true);
    if (this.dispositivoPuestoTrabajo) {
      this.fcService.setValue('id', this.dispositivoPuestoTrabajo.id, {onlySelf: true});
      this.fcService.setValue('tipoDispositivo', this.dispositivoPuestoTrabajo.tipoDispositivo, {onlySelf: true}, true);
      this.fcService.setValue('dispositivo', this.dispositivoPuestoTrabajo.dispositivo, {onlySelf: true}, true);
      this.fcService.setValue('habilitado', this.dispositivoPuestoTrabajo.habilitado, {onlySelf: true}, false);
    } else {
      this.fcService.setValue('id', Math.floor(Math.random() * -1000), {onlySelf: true});
      this.fcService.enableControl('tipoDispositivo');
      this.fcService.enableControl('dispositivo');
      this.fcService.setValue('habilitado', true, {onlySelf: true}, true);
    }
    this.modal.open();
    if (this.dispositivoPuestoTrabajo) {
      setTimeout(() => this.checkBox.nativeElement.focus(), 0);
    } else {
      setTimeout(() => this.tipoDispositivo.setFocus(), 0);
    }
  }

  onAccept() {
    const dispositivo = this.fcService.getValue('dispositivo');
    if (!dispositivo && this.dispositivoPuestoTrabajo) {
      this.fcService.setValue('dispositivo', this.dispositivoPuestoTrabajo.dispositivo);
    }
    const errors = new Collection<string>();
    this.fcService.validateForm(this.form.controls, errors, '');
    this.fcService.showValidationError(errors);

    if (this.fcService.isValidForm() && !this.esDispositivoRepetido()) {
      this.accepted.emit();
    }
  }

  private esDispositivoRepetido(): boolean {
    if (this.formListaDispositivos &&
      this.form.value.tipoDispositivo &&
      this.form.value.dispositivo &&
      this.formListaDispositivos.controls.some(c => c.value.tipoDispositivo.id === this.form.value.tipoDispositivo.id &&
                                                    c.value.dispositivo.id === this.form.value.dispositivo.id)) {
        this.popupService.error(Resources.Messages.NoSePermiteIngresarDispositivosRepetidos, Resources.Labels.Error);
        return true;
    }
    return false;
  }

  close() {
    this.updateValidators(false);
    this.modal.close();
  }

  onClosing() {
    this.dispositivoPuestoTrabajo = null;
    this.form.reset();
    this.closing.emit();
    this.updateValidators(false);
  }

  modificar(dispositivoPuestoTrabajo: DispositivoPuestoTrabajoDataView) {
    this.dispositivoPuestoTrabajo = dispositivoPuestoTrabajo;
    this.open();
  }

  private updateValidators(required: boolean) {
    if (required) {
      this.form.controls.dispositivo.setValidators(Validators.required);
      this.form.controls.tipoDispositivo.setValidators(Validators.required);
    } else {
      this.form.controls.dispositivo.clearValidators();
      this.form.controls.tipoDispositivo.clearValidators();
    }
  }
}
