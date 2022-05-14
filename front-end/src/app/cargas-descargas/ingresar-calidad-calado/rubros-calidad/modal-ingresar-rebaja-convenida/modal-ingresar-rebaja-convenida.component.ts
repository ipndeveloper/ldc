import { Component, OnInit, ViewChild, Output, EventEmitter, Input, ElementRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from '../../../../core/components/modal/modal.component';
import { Resources } from '../../../../../locale/artifacts/resources';
import { PopupService } from '../../../../core/services/popupService/popup.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'yrd-modal-ingresar-rebaja-convenida',
  templateUrl: './modal-ingresar-rebaja-convenida.component.html',
  styleUrls: ['./modal-ingresar-rebaja-convenida.component.css']
})
export class ModalIngresarRebajaConvenidaComponent implements OnInit, OnDestroy {

  rebajaConvenidaForm: FormGroup;
  selectedRubroId: number;
  private onDestroy = new Subject();
  @ViewChild('modalComponent') modal: ModalComponent;
  @ViewChild('selectRubro') element: ElementRef;
  @Input() labelHeader = 'Rebaja Convenida';
  @Input() rubrosCalidad: any;
  @Output() accepted: EventEmitter<FormGroup> = new EventEmitter();

  validationMessagesPorcentajeRebajaConvenida = {
    required: Resources.Messages.RebajaConvenidaPorcentajeEntreCeroYCien,
    min: Resources.Messages.RebajaConvenidaPorcentajeEntreCeroYCien,
    max: Resources.Messages.RebajaConvenidaPorcentajeEntreCeroYCien
  };

  constructor(private readonly fb: FormBuilder,
    private readonly popupService: PopupService) { }

  ngOnInit() {
    this.rebajaConvenidaForm = this.fb.group({
      rubro: { value: '', disabled: false },
      valor: { value: '', disabled: true },
      porcentajeRebajaConvenida: [{ value: '', disabled: false }, [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  onAccept() {
    const formValid = this.validateForm();
    if (formValid) {
      const rubro = this.getRubroModificado();
      this.setRebajaConvenida(rubro);
      this.accepted.emit(rubro);
      this.modal.close();
    }
  }

  open() {
    this.modal.open();
    this.subscribeToRubroChanges();
    this.setDefaultValue();
    this.setFocus();
  }

  setFocus(): void {
    setTimeout(() => {
      if (this.element) {
        this.element.nativeElement.focus();
      }
    }, 250);
  }

  onClosing() {
    this.rebajaConvenidaForm.reset();
  }

  private subscribeToRubroChanges() {
    this.rebajaConvenidaForm.controls.rubro.valueChanges
    .pipe(takeUntil(this.onDestroy))
    .subscribe((newValue) => {
      const valorRubroCtrl = this.rebajaConvenidaForm.get('valor');
      const rebajaConvenidaCtrl = this.rebajaConvenidaForm.get('porcentajeRebajaConvenida');
      if (valorRubroCtrl && rebajaConvenidaCtrl && newValue) {
        const rubro = this.rubrosCalidad.find((r) => {
          return r.controls.id.value === +newValue;
        });
        const valorRubro = rubro.controls.valorMedido.value;
        valorRubroCtrl.setValue(valorRubro);

        let rebajaConvenida = +rubro.controls.porcentajeRebajaConvenida.value;
        if (rebajaConvenida < 0) {
          rebajaConvenida = rebajaConvenida * (-1);
        }
        rebajaConvenidaCtrl.setValue(rebajaConvenida.toString());
      }
    });
  }

  private getRubroModificado() {
    const rubroCtrl = this.rebajaConvenidaForm.get('rubro');
    if (rubroCtrl) {
      return this.rubrosCalidad.find((r) => {
        return r.controls.id.value === +rubroCtrl.value;
      });
    }
  }

  private setRebajaConvenida(rubro: FormGroup) {
    const rebajaConvenidaCtrl = this.rebajaConvenidaForm.get('porcentajeRebajaConvenida');
    if (rebajaConvenidaCtrl) {
      rubro.controls.porcentajeRebajaConvenida.setValue(+rebajaConvenidaCtrl.value > 0 ?
                                                        +rebajaConvenidaCtrl.value * (-1) :
                                                        +rebajaConvenidaCtrl.value);
    }
  }

  private setDefaultValue() {
    const rubroCtrl = this.rebajaConvenidaForm.get('rubro');
    if (rubroCtrl) {
      rubroCtrl.setValue(this.rubrosCalidad[0].controls.id.value);
    }
  }

  private validateForm(): boolean {
    let formValid = this.rebajaConvenidaForm.valid;
    const rebajaConvenidaCtrl = this.rebajaConvenidaForm.get('porcentajeRebajaConvenida');
    const valorRubroCtrl = this.rebajaConvenidaForm.get('valor');
    if (rebajaConvenidaCtrl && valorRubroCtrl) {
      rebajaConvenidaCtrl.markAsTouched();
      rebajaConvenidaCtrl.updateValueAndValidity();

      if (!valorRubroCtrl.value || valorRubroCtrl.value < 0) {
        formValid = false;
        this.popupService.error(Resources.Messages.RubroSeleccionadoValorMayorACero);
      }
    }
    return formValid;
  }
}

