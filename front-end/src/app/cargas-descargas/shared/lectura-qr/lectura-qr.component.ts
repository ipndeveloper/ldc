import { Component, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { Observable, Subscription, timer } from 'rxjs';
import { Resources } from '../../../../locale/artifacts/resources';
import { PopupService } from '../../../core/services/popupService/popup.service';
import { take, map } from 'rxjs/operators';
import { LecturaQRService } from '../services/lectura-qr.service';
import { LecturaQREnAutomaticoDataView } from '../../../shared/data-models/lectura-qr-en-automatico-data-view';
import { ModalLecturaQRComponent } from './modal-lectura-qr/modal-lectura-qr.component';
import { TextoConEtiquetaComponent } from '../../../core/controls/texto-con-etiqueta/texto-con-etiqueta.component';

@Component({
  selector: 'yrd-lectura-qr',
  templateUrl: './lectura-qr.component.html',
  styleUrls: ['./lectura-qr.component.css']
})
export class LecturaQRComponent {

  @ViewChild('modalComponent') modalComponent: ModalLecturaQRComponent;
  @ViewChild('codigoQR') codigoQR: TextoConEtiquetaComponent;
  @ViewChild('botonLeerQR') botonLeerQR: ElementRef;
  @Input() form: FormGroup;
  @Input() cssClassBoton = 'col-sm-4';
  @Input() cssClassBotonInner = 'btn btn-default';
  @Input() cssClassRow = '';
  @Input() textoBoton = 'Leer QR';
  @Input() mostrarQR = true;
  @Input() mostrarBoton = true;
  @Input() previousValidation: Observable<boolean>;
  @Output() qrLeido = new EventEmitter<string>();
  @Input() cssClassEtiquetaManual = 'col-sm-4';
  @Input() cssClassControlManual = 'col-sm-8';

  get control(): AbstractControl {
    return this.form.controls.qr;
  }

  get deshabilitarLecturaQR(): boolean {
    return this.control ? this.control.status === 'DISABLED' : false;
  }

  get mensajeQRLeido(): string {
    return this.control && this.control.value ? 'Lectura Correcta' : '';
  }

  timer$: Observable<number>;
  timerSuscription$: Subscription;
  contador: number;

  lecturaEnModoAutomatico: boolean;
  segundos: number;
  sufijo: number;
  prefijoPrimerKeycode: number;
  prefijoSegundoKeycode: number;

  validationMessagesQR = {
    required: Resources.Messages.ElCampoXEsRequeridoParaBuscar.format(Resources.Labels.QR)
  };

  constructor(private readonly lecturaQRService: LecturaQRService,
              private readonly popupService: PopupService) {
    this.lecturaQRService.consultarModoLecturaQR()
      .subscribe((lecturaQREnAutomatico: LecturaQREnAutomaticoDataView) => {
        if (!lecturaQREnAutomatico.esAutomatico) {
          this.codigoQR.control.enable();
        }
        this.lecturaEnModoAutomatico = lecturaQREnAutomatico.esAutomatico;
        this.segundos = 84;
        this.sufijo = 9;
        this.prefijoPrimerKeycode = 60;
        this.prefijoSegundoKeycode = 9;
      });
  }

  onLeerQR() {
    if (this.previousValidation) {
      this.previousValidation.subscribe((leerQR: boolean) => {
        if (leerQR) {
          this.leerQR();
        }
      });
    } else {
      this.leerQR();
    }
  }

  private leerQR() {
    this.contador = this.segundos;
    this.modalComponent.open();
    this.timer$ = timer(0, 1000).pipe(take(this.contador), map(() => --this.contador));
    this.timerSuscription$ = this.timer$.subscribe((val: number) => {
      if (val === 0) {
        this.modalComponent.close();
      }
    });
  }

  onQRLeido(qr: string) {
    this.timerSuscription$.unsubscribe();
    this.control.setValue(qr);
    this.qrLeido.emit();
    if (!qr) {
      this.popupService.error(Resources.Messages.QRInvalidoIntenteNuevamente);
    }
  }

  onBlurQR() {
    if (this.control && this.control.value) {
      this.qrLeido.emit();
    }
  }

  setFocus() {
    if (this.lecturaEnModoAutomatico && this.botonLeerQR) {
      this.botonLeerQR.nativeElement.focus();
    } else if (this.codigoQR) {
      this.codigoQR.setFocus();
    }
  }
}
