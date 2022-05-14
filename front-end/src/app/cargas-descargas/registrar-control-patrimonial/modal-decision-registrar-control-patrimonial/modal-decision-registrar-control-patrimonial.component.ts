import { Component, OnDestroy, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { DecisionRegistrarControlPatrimonialComponent } from '../decision-registrar-control-patrimonial/decision-registrar-control-patrimonial.component';
import { FormGroup } from '@angular/forms';
import { ModalComponent } from '../../../core/components/modal/modal.component';
import { DesplegableValorBooleanoComponent } from '../../../shared/desplegable-valor-booleano/desplegable-valor-booleano.component';
import { Subject } from 'rxjs';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { Collection } from '../../../core/models/collection';
import { PopupService } from '../../../core/services/popupService/popup.service';
import { Terminal } from '../../../shared/data-models/terminal';

@Component({
  selector: 'yrd-modal-decision-registrar-control-patrimonial',
  templateUrl: './modal-decision-registrar-control-patrimonial.component.html',
  styleUrls: ['./modal-decision-registrar-control-patrimonial.component.css']
})
export class ModalDecisionRegistrarControlPatrimonialComponent
  extends DecisionRegistrarControlPatrimonialComponent
  implements OnDestroy {
  @Input() form: FormGroup;
  @Input() esModificacion: boolean;
  @Input() isLoading: boolean;
  @Input() idMovimiento: number;
  @Input() terminal: Terminal;

  @Output() accepted = new EventEmitter();
  @Output() modalCancel = new EventEmitter();

  @ViewChild('modalComponent') modal: ModalComponent;
  @ViewChild('decision') decisionComponent: DesplegableValorBooleanoComponent;

  labelHeader = 'Registrar decision';
  private readonly onDestroy = new Subject();
  private readonly fcService: FormComponentService;
  esContinuar = false;

  constructor(popupService: PopupService) {
    super();
    this.fcService = new FormComponentService(popupService);
    this.fcService.initialize(this.form);
  }

  setFocus() {
    this.decisionComponent.setFocus();
  }

  open() {
    this.modal.open();
    this.esContinuar = false;
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
      this.accepted.emit(this.esContinuar);
    }
  }

  aceptarContinuar() {
    this.esContinuar = true;
    this.onAccept();
  }
}
