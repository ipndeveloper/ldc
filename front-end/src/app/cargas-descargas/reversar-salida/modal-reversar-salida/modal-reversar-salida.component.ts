import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalComponent } from '../../../core/components/modal/modal.component';
import { ReversarSalidaService } from '../services/reversar-salida.service';
import { AccionesReversarSalida } from '../../../shared/enums/enums';
import { ReversarSalidaCommand } from '../../../shared/data-models/commands/cargas-descargas/reversar-salida-command';
import { Resources } from '../../../../locale/artifacts/resources';
import { PopupService } from '../../../core/services/popupService/popup.service';
import { Circuito } from '../../../shared/data-models/circuito/circuito';
import { EntityWithDescription } from '../../../core/models/entity-with-description';

@Component({
  selector: 'yrd-modal-reversar-salida',
  templateUrl: './modal-reversar-salida.component.html',
  styleUrls: ['./modal-reversar-salida.component.css']
})
export class ModalReversarSalidaComponent implements OnInit {

  reversarSalidaForm: FormGroup;
  @Input() resultados: EntityWithDescription[];
  @Input() labelHeader = 'Confirmación';
  @Input() selectedRow: any;
  @Input() circuito: Circuito;
  @Output() accepted: EventEmitter<string> = new EventEmitter();
  @ViewChild('modalComponent') modal: ModalComponent;
  @ViewChildren('radioRetornaA') radioRetornaA: QueryList<ElementRef>;

  validationMessagesObservaciones = {
    maxlength: Resources.Messages.DebeIngresarHasta250Caracteres
  };

  constructor(private readonly fb: FormBuilder,
    private readonly reversarSalidaService: ReversarSalidaService,
    public readonly popupService: PopupService) { }

  ngOnInit() {
    this.reversarSalidaForm = this.fb.group({
      destinoRetornoMovimiento: { value: '', disabled: false },
      observaciones: [{ value: '', disabled: false }, [Validators.maxLength(250)]]
    });
  }

  onAccept() {
    if (this.reversarSalidaForm.valid) {
      const destinoRetornoMovimiento = this.reversarSalidaForm.controls.destinoRetornoMovimiento.value;
      if (destinoRetornoMovimiento) {
        const observaciones = this.reversarSalidaForm.controls.observaciones.value;
        const command = new ReversarSalidaCommand(this.selectedRow[0].id, observaciones);

        if (destinoRetornoMovimiento === AccionesReversarSalida.ReversarHaciaBalanzaEntrada) {
          this.reversarSalidaService.reversarHaciaBalanzaEntrada(command).subscribe(() => {
            this.accepted.emit(Resources.Messages.SeReversoSalidaHaciaBalanzaEntrada);
            this.modal.close();
          });
        } else if (destinoRetornoMovimiento === AccionesReversarSalida.ReversarHaciaCalado) {
          this.reversarSalidaService.reversarHaciaCalado(command).subscribe(() => {
            this.accepted.emit(Resources.Messages.SeReversoSalidaHaciaCalado);
            this.modal.close();
          });
        } else if (destinoRetornoMovimiento === AccionesReversarSalida.ReversarHaciaSupervisorCalado) {
          this.reversarSalidaService.reversarHaciaSupervisorCalado(command).subscribe(() => {
            this.accepted.emit(Resources.Messages.SeReversoSalidaHaciaSupervisorCalado);
            this.modal.close();
          });
        } else if (destinoRetornoMovimiento === AccionesReversarSalida.ReversarHaciaBalanzaEntradaCarga) {
          this.reversarSalidaService.reversarHaciaBalanzaEntradaCarga(command).subscribe(() => {
            this.accepted.emit(Resources.Messages.SeReversoSalidaHaciaBalanzaEntrada);
            this.modal.close();
          });
        } else if (destinoRetornoMovimiento === AccionesReversarSalida.ReversarHaciaControlCalidad) {
          this.reversarSalidaService.reversarHaciaControlCalidad(command).subscribe(() => {
            this.accepted.emit(Resources.Messages.SeReversoSalidaHaciaControlCalidad);
            this.modal.close();
          });
        } else if (destinoRetornoMovimiento === AccionesReversarSalida.ReversarHaciaControlPatrimonial) {
          this.reversarSalidaService.reversarHaciaControlPatrimonial(command).subscribe(() => {
            this.accepted.emit(Resources.Messages.SeReversoSalidaHaciaControlPatrimonial);
            this.modal.close();
          });
        }
      } else {
        this.popupService.error(Resources.Messages.DebeIndicarEstadoRetornoCircuito);
      }
    }
  }

  open() {
    this.modal.open();
    this.determinarFocoAcciones();
  }

  onClosing() {
    this.reversarSalidaForm.reset();
  }

  private determinarFocoAcciones() {
    this.radioRetornaA.changes.subscribe((radioList: QueryList<ElementRef>) => {
      if (radioList && radioList.first) {
        radioList.first.nativeElement.focus();
      }
    });
  }
}
