import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { ModalComponent } from '../../../../core/components/modal/modal.component';

@Component({
  selector: 'yrd-modal-lectura-qr',
  templateUrl: './modal-lectura-qr.component.html',
  styleUrls: ['./modal-lectura-qr.component.css']
})
export class ModalLecturaQRComponent implements OnInit {

  @ViewChild('modalComponent') modalComponent: ModalComponent;
  @ViewChild('foco') foco: ElementRef;
  @Input() contador: number;
  @Input() prefijoPrimerKeycode: number;
  @Input() prefijoSegundoKeycode: number;
  @Input() sufijo: number;
  @Output() qrLeido = new EventEmitter<string>();

  modalAbierto = false;
  qrEscrito: string;
  primerPrefijoLeido: boolean;
  segundoPrefijoLeido: boolean;
  DLE_KEYCODE = 16;
  CAPSLOCK_KEYCODE = 20;

  constructor() { }

  ngOnInit() {
  }

  open() {
    this.modalAbierto = true;
    this.modalComponent.open();
    this.qrEscrito = '';
    this.primerPrefijoLeido = false;
    this.segundoPrefijoLeido = false;
    setTimeout(() => {
      this.foco.nativeElement.focus();
    }, 0);
  }

  close() {
    if (this.modalAbierto) {
      this.modalAbierto = false;
      this.modalComponent.close();
      this.qrLeido.emit(this.qrEscrito);
    }
  }

  @HostListener(':keydown', ['$event']) onkeydown(event: KeyboardEvent) {
    if (this.modalAbierto) {
      // tslint:disable:deprecation
      const keycode = event.keyCode || event.which;

      if (keycode === 13) {
          event.preventDefault();
          event.stopPropagation();
          event.cancelBubble = true;
      } else {
        // Se ignora el Data Link Escape ya que LDC tiene dos DLE antes de cada prefijo
        if (keycode !== this.DLE_KEYCODE) {
          if (keycode === this.sufijo) {
            this.close();
          } else {
            if (keycode !== this.CAPSLOCK_KEYCODE) {
            this.qrEscrito += event.key;
            }
          }
        }
      }
    }
  }
}

