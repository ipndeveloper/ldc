import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from '../../../../core/components/modal/modal.component';
import { FormGroup } from '@angular/forms/src/model';
import { Validators, FormBuilder } from '@angular/forms';
import { FormComponentService } from '../../../../core/services/formComponent/formComponent.service';
import { RechazarDescargaService } from './rechazar-descarga.service';
import { Resources } from '../../../../../locale/artifacts/resources';

@Component({
  selector: 'yrd-modal-rechazar-descarga',
  providers: [FormComponentService],
  templateUrl: './modal-rechazar-descarga.component.html',
  styleUrls: ['./modal-rechazar-descarga.component.css']
})
export class ModalRechazarDescargaComponent implements OnInit {

  @ViewChild('modal') modal: ModalComponent;

  @Output() descargaRechazada = new EventEmitter();

  rechazarDescargaForm: FormGroup;

  validationMessagesObservacion = {
    maxlength: Resources.Messages.DebeIngresarHasta250Caracteres
  };

  private idDescarga: number;

  constructor(
    private readonly fb: FormBuilder,
    private readonly formService: FormComponentService,
    private readonly service: RechazarDescargaService) { }

  ngOnInit() {
    this.rechazarDescargaForm = this.fb.group({
      observacion: [{ value: '', disabled: false }, Validators.maxLength(250)]
    });

    this.formService.initialize(this.rechazarDescargaForm);
  }

  abrir(idDescarga: number) {
    this.idDescarga = idDescarga;
    this.modal.open();
  }

  aceptar(completed) {
    if (this.formService.isValidForm()) {
      const observacion: string = this.formService.getValue('observacion');

      this.service.rechazarDescarga(this.idDescarga, observacion)
        .subscribe(() => {
          completed();
          this.descargaRechazada.emit();
        });
    }
  }

  reset() {
    this.formService.resetForm();
  }
}
