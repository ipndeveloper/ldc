import { Component, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { ModalComponent } from '../../../../core/components/modal/modal.component';
import { Resources } from '../../../../../locale/artifacts/resources';
import { FormGroup } from '@angular/forms';
import { DesplegableImpresorasPorUsuarioComponent } from '../../../../shared/desplegable-impresoras-por-usuario/desplegable-impresoras-por-usuario.component';

@Component({
  selector: 'yrd-modal-confirmar-impresion',
  templateUrl: './modal-confirmar-impresion.component.html',
  styleUrls: ['./modal-confirmar-impresion.component.css']
})
export class ModalConfirmarImpresionComponent {

  @ViewChild('modalComponent') modal: ModalComponent;
  @ViewChild('desplegableImpresora') desplegableImpresora: DesplegableImpresorasPorUsuarioComponent;
  @Input() form: FormGroup;
  @Input() readonly labelHeader = 'Ingrese un mensaje';
  @Output() confirmacion = new EventEmitter<boolean>();

  private closingOnAccept = false;
  readonly btnAcceptText = Resources.Labels.Si;
  readonly btnCancelText = Resources.Labels.No;

  constructor() {
  }

  onAccept(): void {
    this.closingOnAccept = true;
    this.confirmacion.emit(true);
    this.modal.close();
  }

  onClosing(): void {
    if (!this.closingOnAccept) {
      this.confirmacion.emit(false);
    }
  }

  open(): void {
    this.closingOnAccept = false;
    this.modal.open();
    setTimeout(() => this.desplegableImpresora.setFocus(), 0);
  }
 }
