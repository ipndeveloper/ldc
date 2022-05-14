import { Component, OnInit, EventEmitter, ViewChild, Output, HostListener, ElementRef } from '@angular/core';
import { FormComponentService } from '../../../../core/services/formComponent/formComponent.service';
import { ModalComponent } from '../../../../core/components/modal/modal.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Resources } from '../../../../../locale/artifacts/resources';
import { AsignarTarjetaService } from './asignar-tarjeta.service';
import { PopupService } from '../../../../core/services/popupService/popup.service';
import { NumeroConEtiquetaComponent } from '../../../../core/controls/numero-con-etiqueta/numero-con-etiqueta.component';
import { LecturaTarjetaService } from '../../services/lectura-tarjeta.service';
import { LecturaTarjetaEnAutomaticoDataView } from '../../../../shared/data-models/lectura-tarjeta-en-automatico-data-view';

@Component({
  selector: 'yrd-modal-asignar-tarjeta',
  providers: [FormComponentService],
  templateUrl: './modal-asignar-tarjeta.component.html',
  styleUrls: ['./modal-asignar-tarjeta.component.css']
})
export class ModalAsignarTarjetaComponent implements OnInit {

  @ViewChild('modal') modal: ModalComponent;
  @ViewChild('numeroTarjeta') tarjeta: NumeroConEtiquetaComponent;
  @ViewChild('foco') focoLecturaAutomatica: ElementRef;
  @Output() tarjetaAsignada = new EventEmitter();

  asignarTarjetaForm: FormGroup;

  lecturaEnModoAutomatico = true;
  sufijo: number;
  prefijoPrimerKeycode: number;
  prefijoSegundoKeycode: number;
  tarjetaEscrita: string;
  primerPrefijoLeido: boolean;
  segundoPrefijoLeido: boolean;
  DLE_KEYCODE = 16;

  validationMessagesTarjeta = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Tarjeta)
  };

  private idMovimiento: number | null;

  get botonAceptarDeshabilitado(): boolean {
    return this.lecturaEnModoAutomatico;
  }

  constructor(private readonly fb: FormBuilder,
              private readonly formService: FormComponentService,
              private readonly asignarTarjetaService: AsignarTarjetaService,
              private readonly popupService: PopupService,
              private readonly lecturaTarjetaService: LecturaTarjetaService) {
    }

  ngOnInit() {
    this.asignarTarjetaForm = this.fb.group({
      numeroTarjeta: ['', Validators.required]
    });

    this.formService.initialize(this.asignarTarjetaForm);
  }

  abrir(idMovimiento: number | null = null) {
    this.idMovimiento = idMovimiento;
    this.limpiarTarjetaEscrita();
    this.lecturaTarjetaService.consultarModoLecturaTarjeta()
      .subscribe((lecturaTarjetaEnAutomatico: LecturaTarjetaEnAutomaticoDataView) => {
        this.lecturaEnModoAutomatico = lecturaTarjetaEnAutomatico.esAutomatico;
        this.sufijo = lecturaTarjetaEnAutomatico.sufijoKeycode;
        this.prefijoPrimerKeycode = lecturaTarjetaEnAutomatico.prefijoPrimerKeycode;
        this.prefijoSegundoKeycode = lecturaTarjetaEnAutomatico.prefijoSegundoKeycode;

        this.modal.open();
        setTimeout(() => {
          if (this.lecturaEnModoAutomatico) {
            this.focoLecturaAutomatica.nativeElement.focus();
          } else {
            this.tarjeta.setFocus();
          }
        }, 0);
      });
  }

  aceptar(completed) {
    if (this.formService.isValidForm()) {
      const numeroTarjeta = this.formService.getValue('numeroTarjeta');

      if (this.idMovimiento) {
        this.asignarTarjetaService.asignarTarjeta(this.idMovimiento, numeroTarjeta)
        .subscribe(() => {
          completed();
          this.tarjetaAsignada.emit();
        }, () => this.resetModal());
      } else {
        this.asignarTarjetaService.tarjetaEnUso(numeroTarjeta).subscribe((enUso: boolean) => {
          if (enUso) {
            this.popupService.error(Resources.Messages.TarjetaEnUso, Resources.Messages.ErrorValidacion);
            this.resetModal();
          } else {
            this.tarjetaAsignada.emit();
            completed();
          }
        }, () => this.resetModal());
      }
    } else {
      if (this.lecturaEnModoAutomatico) {
        this.popupService.error(Resources.Messages.TarjetaInvalidaIntenteNuevamente);
        this.limpiarTarjetaEscrita();
      }
    }
  }

  private limpiarTarjetaEscrita() {
    this.tarjetaEscrita = '';
    this.primerPrefijoLeido = false;
    this.segundoPrefijoLeido = false;
  }

  resetModal() {
    this.asignarTarjetaForm.controls.numeroTarjeta.setValue('');
    this.limpiarTarjetaEscrita();
    if (this.lecturaEnModoAutomatico) {
      this.focoLecturaAutomatica.nativeElement.focus();
    } else {
      this.tarjeta.setFocus();
    }
  }

  reinicializar() {
    this.formService.resetForm();
  }

  onBlurTarjeta() {
    if (this.lecturaEnModoAutomatico) {
      this.modal.accept();
    }
  }

  @HostListener(':keydown', ['$event'])
  onkeydown(event: KeyboardEvent) {
    if (this.lecturaEnModoAutomatico) {
      // tslint:disable:deprecation
      const keycode = event.keyCode || event.which;

      // Se ignora el Data Link Escape ya que LDC tiene dos DLE antes de cada prefijo

      if (keycode === 13) {
        event.preventDefault();
        event.stopPropagation();
        event.cancelBubble = true;
      } else {
        if (keycode !== this.DLE_KEYCODE) {
          if (keycode === this.sufijo) {
            this.formService.setValue('numeroTarjeta', this.tarjetaEscrita, {onlySelf: true}, false);
            this.modal.accept();
          } else if (keycode === this.prefijoPrimerKeycode && !this.primerPrefijoLeido) {
            this.primerPrefijoLeido = true;
          } else if (keycode === this.prefijoSegundoKeycode && this.primerPrefijoLeido && !this.segundoPrefijoLeido) {
            this.segundoPrefijoLeido = true;
          } else if (this.primerPrefijoLeido && this.segundoPrefijoLeido) {
            this.tarjetaEscrita += event.key;
          }
        }
      }
    }
  }
}
