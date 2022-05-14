import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from '../../../core/components/modal/modal.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Resources } from '../../../../locale/artifacts/resources';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { GestionarInterfacesAfipService } from '../services/gestionar-interfaces-afip.service';

@Component({
  selector: 'yrd-modal-confirmacion-manual',
  templateUrl: './modal-confirmacion-manual.component.html',
  styleUrls: ['./modal-confirmacion-manual.component.css']
})
export class ModalConfirmacionManualComponent implements OnInit {

  @ViewChild('modal') modal: ModalComponent;

  @Output() interfazConfirmada = new EventEmitter();

  confirmacionManualForm: FormGroup;

  validationMessagesCodigo = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.CodigoConfirmacionManual)
  };

  private idInterfaz: number;

  constructor(
    private readonly fb: FormBuilder,
    private readonly formService: FormComponentService,
    private readonly service: GestionarInterfacesAfipService) { }

  ngOnInit() {
    this.confirmacionManualForm = this.fb.group({
      codigoConfirmacion: ['', Validators.required]
    });

    this.formService.initialize(this.confirmacionManualForm);
  }

  abrir(idInterfaz: number) {
    this.idInterfaz = idInterfaz;
    this.modal.open();
  }

  aceptar(completed) {
    if (this.formService.isValidForm()) {
      const codigoConfirmacion: number = this.formService.getValue('codigoConfirmacion');

      this.service.confirmarManual(this.idInterfaz, codigoConfirmacion)
        .subscribe(() => {
          completed();
          this.interfazConfirmada.emit();
        });
    }
  }

  reinicializar() {
    this.formService.resetForm();
  }
}
