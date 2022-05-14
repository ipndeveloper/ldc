import { Component, OnDestroy, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalComponent } from '../../../core/components/modal/modal.component';
import { DesplegableValorBooleanoComponent } from '../../../shared/desplegable-valor-booleano/desplegable-valor-booleano.component';
import { Subject } from 'rxjs';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { Collection } from '../../../core/models/collection';
import { PopupService } from '../../../core/services/popupService/popup.service';

@Component({
  selector: 'yrd-modal-decision-controlar-calidad-camion-carga',
  templateUrl: './modal-decision-controlar-calidad-camion-carga.component.html',
  styleUrls: ['./modal-decision-controlar-calidad-camion-carga.component.css']
})
export class ModalDecisionControlarCalidadCamionCargaComponent
  implements OnDestroy {
  @Input() form: FormGroup;
  @Input() esModificacion: boolean;
  @Input() isLoading: boolean;

  @Output() accepted = new EventEmitter();
  @Output() modalCancel = new EventEmitter();

  @ViewChild('modalComponent') modal: ModalComponent;
  @ViewChild('decision') decisionComponent: DesplegableValorBooleanoComponent;

  labelHeader = 'Registrar decision';
  private readonly onDestroy = new Subject();
  private readonly fcService: FormComponentService;

  constructor(popupService: PopupService) {
    this.fcService = new FormComponentService(popupService);
    this.fcService.initialize(this.form);
  }

  setFocus() {
    this.decisionComponent.setFocus();
  }

  open() {
    this.modal.open();
    setTimeout(() => this.setFocus(), 0);
  }

  close() {
    this.modal.close();
  }

  ngOnDestroy() {
    this.onDestroy.next(true);
    this.onDestroy.unsubscribe();
  }

  onClosing() {
    this.form.reset();
    this.modalCancel.emit();
  }

  onAccept() {
    const errors = new Collection<string>();
    this.fcService.initialize(this.form);
    this.fcService.validateForm(this.form.controls, errors, '');
    this.fcService.showValidationError(errors);

    if (this.fcService.isValidForm()) {
      this.accepted.emit();
    }
  }
}
