import { Component, OnInit, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { Collection } from '../../../../core/models/collection';
import { PopupService } from '../../../../core/services/popupService/popup.service';
import { ModalComponent } from '../../../../core/components/modal/modal.component';
import { FormGroup } from '@angular/forms';
import { FormComponentService } from '../../../../core/services/formComponent/formComponent.service';
import { RubroPorTerminalDataView } from '../../../../shared/data-models/rubro-por-terminal-data-view';
import { Resources } from '../../../../../locale/artifacts/resources';

@Component({
  selector: 'yrd-modal-agregar-rubro',
  templateUrl: './modal-agregar-rubro.component.html',
  styleUrls: ['./modal-agregar-rubro.component.css']
})
export class ModalAgregarRubroComponent implements OnInit {

  @ViewChild('modalComponent') modal: ModalComponent;
  @Input() form: FormGroup;
  @Output() accepted = new EventEmitter();
  @Output() closing = new EventEmitter();

  validationMessagesValorMinimo = {
    min: Resources.Messages.ElCampoXDebeSerMayorAY.format(Resources.Labels.valorRecepcionMinimo, '0')
  };
  validationMessagesValorMaximo = {
    min: Resources.Messages.ElCampoXDebeSerMayorAY.format(Resources.Labels.valorRecepcionMaximo, '0')
  };

  private readonly fcService: FormComponentService;
  private rubroPorTerminal: RubroPorTerminalDataView | null = null;
  labelHeader = 'Rubros por Terminal';

  constructor(private readonly popupService: PopupService) {
    this.fcService = new FormComponentService(this.popupService);
  }

  ngOnInit() {
  }

  open() {
    this.fcService.initialize(this.form);
    if (this.rubroPorTerminal) {
      this.fcService.setValue('id', this.rubroPorTerminal.id, { onlySelf: true });
      this.fcService.setValue('producto', this.rubroPorTerminal.producto, { onlySelf: true }, true);
      this.fcService.setValue('rubroCalidad', this.rubroPorTerminal.rubroCalidad, { onlySelf: true }, true);
      this.fcService.setValue('orden',  this.rubroPorTerminal.orden, { onlySelf: true }, false);
      this.fcService.setValue('minimo', this.rubroPorTerminal.minimo, { onlySelf: true }, false);
      this.fcService.setValue('maximo', this.rubroPorTerminal.maximo, { onlySelf: true }, false);
      this.fcService.setValue('requeridoSAN', this.rubroPorTerminal.requeridoSAN, { onlySelf: true }, true);
      this.fcService.setValue('requeridoPlanta',
                              this.rubroPorTerminal.requeridoPlanta,
                              { onlySelf: true }, this.rubroPorTerminal.requeridoSAN);
    }
    this.modal.open();
  }

  onAccept() {
    const errors = new Collection<string>();
    this.fcService.validateForm(this.form.controls, errors, '');
    this.fcService.showValidationError(errors);

    if (this.fcService.isValidForm()) {
      this.accepted.emit();
    }
  }

  close() {
    this.modal.close();
  }

  onClosing() {
    this.rubroPorTerminal = null;
    this.form.reset();
    this.closing.emit();
  }

  modificar(rubroTerminal: RubroPorTerminalDataView) {
    this.rubroPorTerminal = rubroTerminal;
    this.open();
  }

}
